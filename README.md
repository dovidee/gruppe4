<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/dovidee/gruppe4/main/resonansIT/resonansit-logo-dark.png">
    <img alt="resonansIT" src="https://raw.githubusercontent.com/dovidee/gruppe4/main/resonansIT/resonansit-logo.svg" width="600">
  </picture>
</p>

## Om prosjektet

resonansIT er en bachelorgruppe ved Universitetet i Agder.

Nettsiden viser hvem vi er, hva vi har gjort, og lar bedrifter ta kontakt. Alt
innholdet ligger i Sanity, ikke i koden. Gruppa fyller ut tekst og bilder i
Sanity Studio, og Next.js bygger sidene. Repoet er delt i `web/` og `studio/`.

[gruppe4.vercel.app](https://gruppe4.vercel.app)

## Avhengigheter

### `web/`

| Pakke | Versjon |
|-------|---------|
| `next` | `^16.0.10` |
| `react` | `^19.2.4` |
| `react-dom` | `^19.2.3` |
| `next-sanity` | `^13.3.3` |
| `@sanity/image-url` | `^2.1.1` |
| `sass` | `^1.86.3` |
| `classnames` | `^2.5.1` |
| `react-icons` | `^5.5.0` |
| `cookie` | `^1.0.2` |
| `transliteration` | `^2.3.5` |
| `lint-staged` | `^16.1.5` |

Utvikling: `typescript`, `@biomejs/biome`, `eslint`, `tzdata`.

### `studio/`

| Pakke | Versjon |
|-------|---------|
| `sanity` | `^6.10.1` |
| `@sanity/vision` | `^6.10.1` |
| `styled-components` | `^6.1.18` |
| `react` / `react-dom` | `^19.2.4` |

Utvikling: `typescript`, `eslint`, `prettier`.

## Kjøre siden lokalt

Krever Node 20.9 eller nyere.

```bash
git clone https://github.com/dovidee/gruppe4.git
cd gruppe4/web
npm install
cp .env.example .env.local
npm run dev
```

Siden kjører på <http://localhost:3000>. Verdiene til `.env.local` er beskrevet i
`.env.example`.

Sanity Studio ligger i `studio/` og startes for seg:

```bash
cd studio
npm install
npm run dev
```

## Teknisk stack

| Komponent | Versjon | Beskrivelse |
|-----------|---------|-------------|
| Next.js | `^16.0.10` | Rammeverket siden er bygget i |
| React | `^19.2.4` | UI-bibliotek |
| TypeScript | `^5.8.3` | Typing i `web/` |
| Sanity Studio | `^6.10.1` | CMS-et gruppa fyller ut tekst, bilder og medlemmer i |
| next-sanity | `^13.3.3` | Henter innholdet fra Sanity |
| @sanity/image-url | `^2.1.1` | Bilde-URL-er i riktig størrelse |
| Sass (CSS Modules) | `^1.86.3` | Styling, egen stilfil per komponent |
| Biome | `^1.9.4` | Formatering og linting |
| Vercel | | Hosting og bygg |
| Web3Forms | | Sender kontaktskjemaet som e-post |
| Discord Webhook | | Varsler gruppa om nye meldinger |
| TeX Gyre Heros | | Husfonten, selvhostet |

### Kontaktskjema

Bedrifter som vil ta kontakt fyller ut skjemaet på `/om-oss#kontakt`. Meldinga
sendes to steder: som e-post gjennom Web3Forms, og som en melding i
Discord-kanalen gruppa bruker til daglig.

Skjemaet har et ekstra felt som er skjult for folk, men som bots fyller ut.
Meldinger der det feltet er utfylt går ikke videre, så det er bare ekte
henvendelser som blir behandlet.

I tillegg er det en grense på fem meldinger fra samme IP per ti minutter, som
bremser opp innsendinger som kommer for tett. IP-en leses fra `X-Forwarded-For`.
Den headeren kan vanligvis settes av avsenderen selv, men Vercel overskriver den
i sitt eget nettverk, så verdien vi ser kan ikke forfalskes: https://vercel.com/docs/headers/request-headers#x-forwarded-for

## Sidestruktur

| Rute | Komponent |
|------|-----------|
| `/` | `app/page.tsx` |
| `/om-oss` | `app/om-oss/page.tsx` |
| `/prosjekter` | `app/prosjekter/page.tsx` |
| `/prosjekter/[slug]` | `app/prosjekter/[slug]/page.tsx` |
| `/blogg` | `app/blogg/page.tsx` |
| `/blogg/[slug]` | `app/blogg/[slug]/page.tsx` |
| `/takk` | `app/takk/page.tsx` |
| `/api/contact` | `app/api/contact/route.ts` |
| `/api/revalidate` | `app/api/revalidate/route.ts` |

## Gruppemedlemmer

| Navn | Rolle | LinkedIn |
|------|-------|----------|
| Alex Skar | Prosjektleder | [linkedin.com/in/alex-skar](https://www.linkedin.com/in/alex-skar-54a978433/) |
| Andre' Abrahamsen | QA- og testansvarlig | [linkedin.com/in/andre-abrahamsen](https://www.linkedin.com/in/andre-abrahamsen-139603432/) |
| Kevin Bakke | UX / UI-designer | [linkedin.com/in/kevin-bakke](https://www.linkedin.com/in/kevin-bakke-872597306/) |
| Benjamin Stedal | Frontend-utvikler | [linkedin.com/in/benjamin-stedal](https://www.linkedin.com/in/benjamin-stedal-482975405/) |
| Paulius Dovidonis | Security Champion | [linkedin.com/in/pauldovid](https://www.linkedin.com/in/pauldovid/) |
| Per Rai Braatø | Produkteier | |
