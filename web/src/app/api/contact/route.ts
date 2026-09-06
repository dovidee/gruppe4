import { type NextRequest, NextResponse } from "next/server";
import { contactSuccessPath } from "@/resources";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Public by design — Web3Forms puts this key in client-side markup in their own
// docs. It lives here rather than in the form so the browser posts to us, not to
// them, which is what lets one submission fan out to both destinations.
const WEB3FORMS_ACCESS_KEY = "fecdf813-0c3e-4fe2-80ec-e172176f835b";

// Discord rejects an embed whose field value is empty or over 1024 characters.
const DISCORD_FIELD_LIMIT = 1024;
const DISCORD_EMBED_COLOR = 0x305cde;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// In-memory and per-instance: it resets on redeploy and is not shared between
// serverless instances, so treat it as a brake on floods rather than a quota.
const recentPosts = new Map<string, number[]>();

// NextRequest.ip was removed in Next 15. On Vercel x-forwarded-for is set by the
// proxy; anywhere it is missing, callers share one bucket rather than none.
function clientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? "ukjent";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;

  // Sweeping the whole map keeps memory bounded; it stays small at contact-form
  // traffic levels.
  for (const [key, times] of recentPosts) {
    const live = times.filter((time) => time > cutoff);
    if (live.length === 0) {
      recentPosts.delete(key);
    } else {
      recentPosts.set(key, live);
    }
  }

  const seen = recentPosts.get(ip) ?? [];
  if (seen.length >= RATE_LIMIT) {
    return true;
  }
  recentPosts.set(ip, [...seen, now]);
  return false;
}

type Outcome = "ok" | "feil" | "vent";

type Submission = {
  name: string;
  email: string;
  message: string;
  isBot: boolean;
};

function readField(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

function toSubmission(source: Record<string, unknown>): Submission {
  return {
    name: readField(source, "name"),
    email: readField(source, "email"),
    message: readField(source, "message"),
    isBot: Boolean(source.botcheck),
  };
}

function truncate(value: string) {
  return value.length > DISCORD_FIELD_LIMIT
    ? `${value.slice(0, DISCORD_FIELD_LIMIT - 1)}…`
    : value;
}

async function sendToWeb3Forms(submission: Submission) {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: submission.name,
      email: submission.email,
      message: submission.message,
    }),
  });
  if (!res.ok) {
    throw new Error(`Web3Forms svarte ${res.status}`);
  }
}

async function sendToDiscord(submission: Submission) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    throw new Error("DISCORD_WEBHOOK_URL mangler");
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "Noen har sendt en melding",
          color: DISCORD_EMBED_COLOR,
          fields: [
            { name: "Navn", value: truncate(submission.name), inline: true },
            { name: "E-post", value: truncate(submission.email), inline: true },
            { name: "Melding", value: truncate(submission.message) },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`Discord svarte ${res.status}`);
  }
}

// A browser posting the form gets sent on to a page; anything posting JSON —
// the shape in the Web3Forms and Discord docs — gets JSON back.
function respond(req: NextRequest, wantsJson: boolean, outcome: Outcome) {
  if (wantsJson) {
    const status = outcome === "ok" ? 200 : outcome === "vent" ? 429 : 502;
    return NextResponse.json({ success: outcome === "ok" }, { status });
  }
  const target = new URL(contactSuccessPath, req.url);
  if (outcome !== "ok") {
    target.searchParams.set("status", outcome);
  }
  // 303 so the browser follows up with a GET instead of re-posting.
  return NextResponse.redirect(target, 303);
}

export async function POST(req: NextRequest) {
  const wantsJson = (req.headers.get("content-type") ?? "").includes("application/json");

  // Checked before anything else so a flood costs us no parsing or outbound
  // requests. Every POST counts, including ones the honeypot catches.
  if (isRateLimited(clientIp(req))) {
    return respond(req, wantsJson, "vent");
  }

  let submission: Submission;
  try {
    submission = toSubmission(
      wantsJson
        ? await req.json()
        : Object.fromEntries(await req.formData()),
    );
  } catch {
    return respond(req, wantsJson, "feil");
  }

  // The honeypot is invisible to people, so anything that filled it is a bot.
  // Answer exactly as if it had worked, and deliver nothing.
  if (submission.isBot) {
    return respond(req, wantsJson, "ok");
  }

  if (!submission.name || !submission.email || !submission.message) {
    return respond(req, wantsJson, "feil");
  }

  // Both destinations are attempted even if one is down; the message is only
  // lost if neither took it.
  const results = await Promise.allSettled([
    sendToWeb3Forms(submission),
    sendToDiscord(submission),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Kontaktskjema:", result.reason);
    }
  }

  const delivered = results.some((result) => result.status === "fulfilled");
  return respond(req, wantsJson, delivered ? "ok" : "feil");
}
