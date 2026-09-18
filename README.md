<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/dovidee/gruppe4/main/resonansIT/resonansit-logo-dark.png">
    <img alt="resonansIT" src="https://raw.githubusercontent.com/dovidee/gruppe4/main/resonansIT/resonansit-logo.svg" width="600">
  </picture>
</p>

## About the project

resonansIT is a bachelor group at the University of Agder.

The site shows who we are, what we have done, and lets companies get in touch. All
the content lives in Sanity, not in the code. The group fills in text and images in
Sanity Studio, and Next.js builds the pages. The repo is split into `web/` and `studio/`.

[gruppe4.vercel.app](https://gruppe4.vercel.app)

## Running the site locally

Requires Node 20.9 or newer.

```bash
git clone https://github.com/dovidee/gruppe4.git
cd gruppe4/web
npm install
cp .env.example .env.local
npm run dev
```

The site runs on <http://localhost:3000>. The values for `.env.local` are described in
`.env.example`.

Sanity Studio lives in `studio/` and is started separately:

```bash
cd studio
npm install
npm run dev
```

## Tech stack

| Component | Description |
|-----------|-------------|
| Next.js | The framework the site is built in |
| React | UI library |
| TypeScript | Typing in `web/` |
| Sanity Studio | The CMS the group fills in with text, images and members |
| next-sanity | Fetches the content from Sanity |
| Sass (CSS Modules) | Styling, one style file per component |
| Biome | Formatting and linting |
| Vercel | Hosting and builds |
| Web3Forms | Sends the contact form as email |
| Discord Webhook | Notifies the group about new messages |
| TeX Gyre Heros | The house font, self hosted |

A full list of dependencies is in `web/package.json` and
`studio/package.json`.

### Contact form

Companies that want to get in touch fill in the form at `/om-oss#kontakt`. The message
is sent to two places: as an email through Web3Forms, and as a message in the
Discord channel the group uses day to day.

The form has an extra field that is hidden from people but that bots fill in.
Messages where that field has been filled in do not go any further, so only genuine
enquiries are processed.

There is also a limit of five messages from the same IP per ten minutes, which
slows down submissions arriving too close together. The IP is read from `X-Forwarded-For`.
That header can normally be set by the sender, but Vercel overwrites it
inside its own network, so the value we see cannot be forged: https://vercel.com/docs/headers/request-headers#x-forwarded-for

## Site structure

| Route | Component |
|-------|-----------|
| `/` | `app/page.tsx` |
| `/om-oss` | `app/om-oss/page.tsx` |
| `/prosjekter` | `app/prosjekter/page.tsx` |
| `/prosjekter/[slug]` | `app/prosjekter/[slug]/page.tsx` |
| `/blogg` | `app/blogg/page.tsx` |
| `/blogg/[slug]` | `app/blogg/[slug]/page.tsx` |
| `/takk` | `app/takk/page.tsx` |
| `/api/contact` | `app/api/contact/route.ts` |
| `/api/revalidate` | `app/api/revalidate/route.ts` |

## Group members

| Name | Role | LinkedIn |
|------|------|----------|
| Alex Skar | Project manager | [linkedin.com/in/alex-skar](https://www.linkedin.com/in/alex-skar-54a978433/) |
| Andre' Abrahamsen | QA and test lead | [linkedin.com/in/andre-abrahamsen](https://www.linkedin.com/in/andre-abrahamsen-139603432/) |
| Kevin Bakke | UX / UI designer | [linkedin.com/in/kevin-bakke](https://www.linkedin.com/in/kevin-bakke-872597306/) |
| Benjamin Stedal | Frontend developer | [linkedin.com/in/benjamin-stedal](https://www.linkedin.com/in/benjamin-stedal-482975405/) |
| Paulius Dovidonis | Security Champion | [linkedin.com/in/pauldovid](https://www.linkedin.com/in/pauldovid/) |
| Per Rai Braatø | Product owner | [linkedin.com/in/per-rai-braatø](https://www.linkedin.com/in/per-rai-braat%C3%B8-404a71435/) |
