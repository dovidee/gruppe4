import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // delay slightly so the CDN has caught up before we refetch
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Bad Request: missing _type", { status: 400 });
    }

    revalidateTag(body._type, { expire: 60 });
    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (err) {
    // Details go to the server log only; the response stays generic.
    console.error("Revalidate:", err);
    return new Response("Internal error", { status: 500 });
  }
}
