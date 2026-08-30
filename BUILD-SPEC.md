# Build spec: gruppe4.vercel.app

Handoff document for Claude Code. Read this whole file before writing anything.

This spec is self-contained. A static HTML mockup may be attached alongside it
(`gruppe4-standard-oppsett.html`); if so, treat it as a picture of the intended layout, spacing and
copy tone only. Do **not** port its markup or CSS. Build the real thing with the components already
in the repo. If it is not attached, proceed from this document alone.

**House style for any copy you generate or scaffold:** no em dashes, and no middot separators in
meta lines or eyebrows. Use commas, colons, or full stops. The team reads both as a tell that text
was machine-written, and this site's whole advantage over the other groups is that it does not read
that way.

---

## 0. Read this first: the one rule that matters

**Every piece of text and every image on this site must come from Sanity. Nothing is hardcoded,
and nothing lives in `/public`.**

The team needs to change the group photo, swap the six portraits, fix a typo in a bio, and add a
project, all from the Sanity Studio, without touching the repo, without a commit, and without a
deploy. A webhook is already wired up, so content changes should appear on the live site on their
own.

Concretely, this means:

- No `import photo from "@/public/team.jpg"`. Images are Sanity assets resolved through
  `@sanity/image-url`.
- No copy strings in `.tsx` files. Headings, button labels, the intro paragraph, the three
  "for bedrifter" columns. All of it lives in Sanity.
- Every image field gets `options: { hotspot: true }`, and the frontend must respect the hotspot.
  This is not optional: the group photo is a wide shot of six people, and on mobile it crops to
  a tall aspect ratio. Without hotspot support, someone gets cut out of the frame.
- Every image field gets a required `alt` field.
- If you find yourself hardcoding something "just for now", add it to Sanity instead.

The only strings that may live in code: `aria-label`s, error states, and empty states
(e.g. "Ingen innlegg ennå").

---

## 1. Before you write code: verify the current state

The repo is Magic Portfolio (Once UI) for Next.js, stripped down, with Sanity connected. I have
not seen the actual tree, so confirm these before assuming:

1. **Router.** App Router or Pages Router? Assume App Router; verify `src/app/`.
2. **Sanity client.** Is `next-sanity` installed? Where does the client live
   (`src/sanity/lib/client.ts` or similar)? What are `projectId`, `dataset`, `apiVersion`?
3. **Studio.** Is the Studio embedded at `/studio`, or a separate deployment? Where do schema files
   go: `sanity/schemaTypes/` or `src/sanity/schemas/`?
4. **Existing schemas.** There is at least a `post` type already (the site currently shows a blog
   entry titled "test"). Extend what exists rather than creating a parallel type.
5. **Webhook / revalidation.** Find the existing revalidation route (likely
   `src/app/api/revalidate/route.ts`). Check whether it uses `revalidatePath` or `revalidateTag`,
   and whether the Sanity webhook sends a secret. Match the existing pattern.
6. **Once UI config.** `src/resources/once-ui.config.js` (or `.ts`) holds theme tokens and font
   settings. `src/resources/content.js` holds the template's hardcoded content, and most of it will
   become dead once Sanity drives the pages.

Report anything that contradicts this document before proceeding.

---

## 2. Design tokens

Set these in the Once UI config where possible, and in a global stylesheet where the config
doesn't reach. Do not scatter hex values through components.

### Colour

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F3F5EF` | page background outside cards |
| `--white` | `#FFFFFF` | surface / card background |
| `--ink` | `#14180F` | body text, borders, solid buttons |
| `--muted` | `#6B7364` | secondary text, captions, meta |
| `--olive` | `#3F5D2C` | accent for eyebrows, role labels, links |
| `--olive-soft` | `#E7EDE0` | tinted fills, chip backgrounds |
| `--rule` | `#D2D9CA` | hairlines and card borders |
| `--marker` | `#D8E24B` | active nav underline, one highlight per screen |

Portrait placeholder tints (used only until real photos are uploaded):
`#3F5D2C`, `#5A6E3A`, `#2F4A3D`, `#4A5B49`, `#37503A`, `#6B7A42`.

`--marker` is a signal colour. One use per screen, maximum. It marks the current nav item and
nothing else on most pages.

### Type

Load via `next/font/google`, not a `<link>` tag, and not the Once UI default fonts.

- **Display + body:** Archivo. Weights 400, 500, 600, 700.
- **Utility:** JetBrains Mono. Weights 400, 500, 700. Used for eyebrows, meta lines, roles,
  chips, buttons, captions, anything uppercase and letterspaced.

Scale:

```
h1 (hero)   clamp(28px, 4.2vw, 48px)  /  line-height 1.06  /  letter-spacing -0.028em
h2          clamp(22px, 2.6vw, 30px)  /  line-height 1.15  /  letter-spacing -0.022em
h3          22px  /  600
body        15px  /  line-height 1.55
lede        16px  /  colour --muted  /  max-width 60ch
eyebrow     10px  /  mono  /  uppercase  /  letter-spacing 0.18em  /  colour --muted
role        10.5px / mono  /  uppercase  /  letter-spacing 0.10em  /  colour --olive
```

Prose max-width is 60 to 64ch everywhere. Never let a paragraph run the full page width.

### Spacing

Section padding: `52px 34px` desktop, `30px 18px` below 700px. Sections are separated by a
1px `--rule` hairline, not by shadows or background changes.

---

## 3. Sanity schemas

Create these types. Adapt naming to whatever convention the repo already uses.

```ts
// siteSettings.ts (singleton)
export default {
  name: 'siteSettings',
  title: 'Innstillinger',
  type: 'document',
  fields: [
    { name: 'groupName', title: 'Gruppenavn', type: 'string', validation: R => R.required() },
    { name: 'contactEmail', title: 'E-post', type: 'string' },
    { name: 'responsePromise', title: 'Svarløfte', type: 'string',
      description: 'F.eks. «Vi svarer innen 24 timer»' },
    { name: 'nav', title: 'Meny', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'href', type: 'string' },
        ],
      }],
      description: 'Rekkefølgen her styrer menyen. Standard: Hjem, Prosjekter, Blogg, Om oss.' },
  ],
}
```

```ts
// home.ts (singleton)
export default {
  name: 'home',
  title: 'Forside',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Gruppebilde', type: 'image',
      options: { hotspot: true }, validation: R => R.required(),
      fields: [{ name: 'alt', type: 'string', title: 'Alt-tekst', validation: R => R.required() }] },
    { name: 'heroCaption', title: 'Bildetekst', type: 'string' },
    { name: 'eyebrow', title: 'Overlinje', type: 'string',
      description: 'F.eks. «Gruppe 4, IS-310, Universitetet i Agder»' },
    { name: 'headline', title: 'Overskrift', type: 'string', validation: R => R.required().max(60) },
    { name: 'subline', title: 'Ingress', type: 'text', rows: 2, validation: R => R.max(160) },
    { name: 'ctaPrimary', title: 'Hovedknapp', type: 'object',
      fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] },
    { name: 'ctaSecondary', title: 'Sekundærknapp', type: 'object',
      fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] },
    { name: 'introEyebrow', type: 'string' },
    { name: 'introHeading', type: 'string' },
    { name: 'introBody', title: 'Om gruppa', type: 'array', of: [{ type: 'block' }] },
    { name: 'membersHeading', type: 'string' },
    { name: 'membersLede', type: 'text', rows: 2 },
  ],
}
```

```ts
// member.ts
export default {
  name: 'member',
  title: 'Medlem',
  type: 'document',
  fields: [
    { name: 'name', title: 'Navn', type: 'string', validation: R => R.required() },
    { name: 'order', title: 'Rekkefølge', type: 'number', validation: R => R.required(),
      description: 'Styrer rekkefølgen på forsiden. 1 til 6.' },
    { name: 'role', title: 'Rolle i gruppa', type: 'string', validation: R => R.required(),
      description: 'En ekte rolle, f.eks. «Design og UX». Ikke «Gruppemedlem».' },
    { name: 'portrait', title: 'Portrett', type: 'image',
      options: { hotspot: true }, validation: R => R.required(),
      fields: [{ name: 'alt', type: 'string', validation: R => R.required() }],
      description: 'Stående bilde, 4:5 eller smalere. Minst 1200px på korteste side.' },
    { name: 'bio', title: 'Bio', type: 'text', rows: 6, validation: R => R.required(),
      description: 'Fire til seks setninger. Nevn noe som faktisk har skjedd: en jobb, et verv, en bug.' },
    { name: 'skills', title: 'Kan', type: 'array', of: [{ type: 'string' }],
      options: { layout: 'tags' } },
    { name: 'learning', title: 'Vil lære', type: 'array', of: [{ type: 'string' }],
      options: { layout: 'tags' } },
    { name: 'linkedin', type: 'url' },
    { name: 'github', type: 'url' },
    { name: 'email', type: 'string' },
  ],
  orderings: [{ title: 'Rekkefølge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'portrait' } },
}
```

```ts
// project.ts
export default {
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: R => R.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() },
    { name: 'order', type: 'number' },
    { name: 'meta', title: 'Metalinje', type: 'string',
      description: 'F.eks. «4. semester, ASP.NET Core, 247 commits»' },
    { name: 'categories', title: 'Kategorier', type: 'array',
      of: [{ type: 'string' }],
      options: { list: [
        { title: 'Web', value: 'web' },
        { title: 'Data', value: 'data' },
        { title: 'Sikkerhet', value: 'sikkerhet' },
      ], layout: 'tags' } },
    { name: 'cover', title: 'Skjermbilde', type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }] },
    { name: 'summary', title: 'Kort beskrivelse', type: 'text', rows: 2,
      description: 'Én setning, skrevet for noen som ikke tok faget.' },
    { name: 'stack', title: 'Teknologi', type: 'array', of: [{ type: 'string' }],
      options: { layout: 'tags' } },
    { name: 'githubUrl', type: 'url' },
    { name: 'roleNote', title: 'Merknad om gruppe', type: 'text', rows: 2,
      description: 'Brukes når prosjektet er fra en annen gruppe enn bachelorgruppa.' },
    { name: 'sections', title: 'Avsnitt', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'heading', type: 'string' },
          { name: 'body', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'heading' } },
      }],
      description: 'Foreslått rekkefølge: Problemet, Det vi bygde, Testing, Sikkerhet, Hva vi ville gjort annerledes.' },
  ],
  orderings: [{ title: 'Rekkefølge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}
```

```ts
// forCompanies.ts (singleton)
export default {
  name: 'forCompanies',
  title: 'For bedrifter',
  type: 'document',
  fields: [
    { name: 'eyebrow', type: 'string' },
    { name: 'heading', type: 'string' },
    { name: 'lede', type: 'text', rows: 2 },
    { name: 'columns', title: 'Kolonner', type: 'array',
      validation: R => R.max(3),
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'bullets', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'title' } },
      }] },
    { name: 'ctaLabel', type: 'string' },
  ],
}
```

For `post`, extend whatever already exists. It needs at minimum: `title`, `slug`, `publishedAt`,
`tag` (string), `excerpt` (text), `body` (portable text), and an optional `cover` image.

Register all of these in the schema index, and add singleton handling in `structure.ts` so
`siteSettings`, `home` and `forCompanies` appear as single editable documents rather than
"create new" lists. Getting this wrong is the most common way these setups become confusing for
non-developers.

---

## 4. Data fetching

Use `next-sanity`. One query file, one fetch helper, tagged for revalidation.

```ts
// src/sanity/queries.ts
import { groq } from 'next-sanity'

const imageFields = `asset, hotspot, crop, alt`

export const homeQuery = groq`{
  "home": *[_type == "home"][0]{
    heroImage{${imageFields}}, heroCaption, eyebrow, headline, subline,
    ctaPrimary, ctaSecondary, introEyebrow, introHeading, introBody,
    membersHeading, membersLede
  },
  "members": *[_type == "member"] | order(order asc){
    _id, name, role, bio, skills, learning, linkedin, github, email,
    portrait{${imageFields}}
  },
  "forCompanies": *[_type == "forCompanies"][0]{
    eyebrow, heading, lede, columns[]{title, bullets}, ctaLabel
  },
  "settings": *[_type == "siteSettings"][0]{ groupName, contactEmail, nav[]{label, href} }
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id, title, slug, meta, categories, summary, stack, githubUrl,
  cover{${imageFields}}
}`

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ..., cover{${imageFields}}
}`

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id, title, slug, publishedAt, tag, excerpt
}`

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ..., cover{${imageFields}}
}`
```

Fetch with cache tags so the existing webhook can invalidate precisely:

```ts
export async function sanityFetch<T>(query: string, params = {}, tags: string[] = []): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
  })
}
```

Tag home data `['home','member','forCompanies','siteSettings']`, projects `['project']`,
posts `['post']`. Then confirm the existing revalidate route calls `revalidateTag(body._type)`.
If it currently calls `revalidatePath('/')` only, upgrade it, otherwise editing a member will not
refresh the page.

### Images

```ts
// src/sanity/image.ts
import createImageUrlBuilder from '@sanity/image-url'
export const urlFor = (source) => createImageUrlBuilder(client).image(source)
```

Rules:

- Always chain `.auto('format')` and an explicit `.width()`.
- Always pass `.fit('crop')` so the hotspot is honoured.
- Use `next/image` with `fill` for the hero and portraits, `sizes` set correctly, and
  `placeholder="blur"` using the LQIP from Sanity's `asset->metadata.lqip` if available.
- The hero image is the LCP element: `priority` on it, and nothing else.
- Portraits render at 190px wide on desktop and 180px on mobile, so request 400w and 800w, not
  the original.

---

## 5. Routes and page structure

```
/                  Hjem
/prosjekter        liste
/prosjekter/[slug] ett prosjekt
/blogg             liste
/blogg/[slug]      ett innlegg
/om-oss            om gruppa
```

Detail pages are real routes, not modals. The team wants a site you scroll and read, and real
URLs can be shared and indexed. `generateStaticParams` for both `[slug]` routes.

### Header (replace the existing one)

Delete Magic Portfolio's floating dock header and its `TimeDisplay` component. The live-clock
timezone readout is a personal-portfolio flourish that means nothing for a six-person group.

The replacement is a plain, full-width, non-sticky header:

- Wordmark left. Text, not an image. `groupName` from `siteSettings`, with the numeral in
  `--olive`.
- Nav right. Text links, 26px gap, no icons, no pills, no background.
- Active item: `--ink` text with a 1.5px `--marker` bottom border. Inactive: `--muted`.
- One 1px `--rule` bottom border on the header. No shadow.
- Below 700px: wordmark and nav stack vertically, gap 10px, nav gap 15px. No hamburger, since four
  items fit.
- Drop the theme toggle unless the team asks for it. Dark mode doubles the design surface and
  nobody has designed the dark variant.

### `/` (Hjem)

In order, top to bottom:

1. **Hero.** Full-bleed `heroImage`, `min-height: 78vh` (70vh mobile). A gradient scrim
   (`linear-gradient(to top, rgba(8,12,7,.86), rgba(8,12,7,.15) 52%, transparent 76%)`) as a
   pseudo-element, then a bottom-left content block, max-width 760px: eyebrow, `h1`, subline,
   two buttons. White text.
2. **Intro.** Eyebrow, `h2`, `introBody` as portable text, max-width 60ch.
3. **Medlemmer.** `membersHeading`, `membersLede`, then six `MemberRow`s.
4. **For bedrifter.** Eyebrow, heading, lede, then the three-column grid, then the contact button.

### `/om-oss`

Do **not** repeat the hero image here. Hjem already opens with it, and two pages that open
identically feel like a bug. Lead with `h1` + prose instead, then go deeper than the homepage:
how the group works, how it makes decisions, ambition level, what kind of company it wants. The
member sections can repeat here in full (unclamped), since this is the page for people who
actually want to read.

### `/prosjekter`

Filter chips (Alle / Web / Data / Sikkerhet) derived from `categories`, then a responsive grid,
`minmax(290px, 1fr)`. Filtering is client-side over already-fetched data. Do not refetch.

Card: cover image (158px tall, cropped), meta line, `h3`, summary, stack chips, then two buttons:
"Se på GitHub" (external, `target="_blank" rel="noopener"`) and "Mer info" (links to the detail
route). If `githubUrl` is empty, render the button disabled rather than omitting it, so the cards
stay aligned.

### `/prosjekter/[slug]`

Cover image, meta, title, summary, the `roleNote` in a `--marker` left-bordered callout if
present, stack chips, then `sections` rendered in order as heading + portable text. GitHub link
at the bottom.

### `/blogg` and `/blogg/[slug]`

List: date left (120px column), title + excerpt + tag right. Whole row is the link. Below 700px
the date moves above the title.

**Empty state matters here.** If there are zero posts, render a dashed `--rule` box on
`--olive-soft` reading "Ingen innlegg ennå". Not an empty page, and not fake placeholder posts.

---

## 6. Components

Build these in `src/components/`. Props are data-shaped; none of them should contain literal copy.

| Component | Props | Notes |
|---|---|---|
| `Header` | `groupName`, `nav[]` | active state from `usePathname()` |
| `Hero` | `image`, `eyebrow`, `headline`, `subline`, `ctaPrimary`, `ctaSecondary` | `priority` image, scrim pseudo-element |
| `SectionBlock` | `eyebrow`, `heading`, `lede`, `children` | the standard padded section with hairline |
| `MemberRow` | `member` | see below |
| `ProjectCard` | `project` | |
| `ProjectFilters` | `categories`, `active`, `onChange` | client component |
| `PostRow` | `post` | |
| `Chip` | `label`, `variant: 'default' \| 'want'` | |
| `EmptyState` | `title`, `body` | |
| `PortableText` | standard `@portabletext/react` setup | style `p`, `a`, lists to match tokens |

### `MemberRow` (the one with real behaviour)

Grid, `190px 1fr`, 28px gap, 30px vertical padding, hairline between rows, none after the last.
Below 700px it becomes a single column and the portrait caps at 180px wide.

Left: portrait, `aspect-ratio: 4/5`, object-fit cover, hotspot respected.

Right: name (`h3`), role (mono, uppercase, `--olive`), bio, "Les mer +", skill chips, "Vil lære"
chips (olive variant), then contact links.

The bio is clamped to 3 lines by default using `-webkit-line-clamp`, and "Les mer +" toggles to
"Vis mindre −". This must be a real `<button>` with `aria-expanded`, and the clamp must be a CSS
class toggle rather than conditional rendering, so the full text stays in the DOM so it remains
searchable and available to screen readers.

If a member has no `learning` entries, render nothing rather than an empty chip row.

---

## 7. Quality floor

Not optional, and cheap to get right if done as you go:

- Every interactive element is a real `<button>` or `<a>`. No click handlers on `<div>`s.
- Visible focus rings: 2px `--olive`, 2px offset. Do not remove outlines.
- `prefers-reduced-motion: reduce` disables all transitions.
- Colour contrast: `--muted` on `--white` passes AA at body size; verify before using it smaller
  than 14px. White text over the hero needs the scrim, so check the lightest part of the photo.
- Semantic headings, one `h1` per page, no skipped levels.
- `next/image` everywhere, correct `sizes`, no layout shift.
- Norwegian throughout: `<html lang="no">`, and `toLocaleDateString('nb-NO')` for post dates.
- Metadata per route: title, description, and OG image from the relevant Sanity image.

---

## 8. Acceptance checklist

Done means all of these pass:

- [ ] Changing the group photo in Sanity changes the homepage hero without a deploy.
- [ ] Adding a sixth member in Sanity renders a sixth row, in the right position, with no code change.
- [ ] Deleting all blog posts shows the empty state, not a broken page.
- [ ] Every string on every page traces back to a Sanity field.
- [ ] The floating dock header and `TimeDisplay` are gone from the codebase.
- [ ] Keyboard alone: tab through the whole homepage, expand a bio, reach every link.
- [ ] 390px wide: nothing overflows horizontally, nobody is cropped out of the hero.
- [ ] Lighthouse on `/`: performance ≥ 90, accessibility 100.
- [ ] `/prosjekter/kartverket` renders all sections from Sanity in order.

---

## 9. Decisions left to the humans (do not guess)

Flag these rather than inventing answers:

1. **Dark mode.** Currently specified as removed. If the team wants it, the dark palette needs to
   be designed first; don't derive it automatically.
2. **Blog vs Logg.** The nav label is "Blogg" per the team's decision. It's a Sanity field, so it
   can change without a deploy.
3. **The six portraits do not exist yet.** Until they're uploaded, `MemberRow` should fall back
   to a flat colour block with the member's initial, using the placeholder tints in §2, assigned
   by `order`. Make this fallback obvious enough that nobody ships it by accident.
4. **Two of the three projects are placeholders.** Only the Kartverket project has real content.
   Don't invent copy for the others; leave them out of Sanity until the team writes them.

---

## 10. Suggested order of work

1. Verify §1, report discrepancies.
2. Tokens and fonts (§2). Confirm visually against the mockup before continuing.
3. Schemas + singleton structure (§3). Have a human enter real content in Sanity at this point.
4. Client, queries, image helper, revalidation tags (§4).
5. Header replacement, which is small, self-contained, and immediately visible.
6. Hjem, top to bottom.
7. `MemberRow` with the clamp behaviour.
8. Prosjekter (list + detail).
9. Blogg (list + detail + empty state).
10. Om oss.
11. Run the §8 checklist.

Commit at each numbered step so anything can be reverted independently.
