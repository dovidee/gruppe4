---
name: resonansIT
description: A scroll-paced stage for a UiA student IT group, one thing speaking at a time.
colors:
  marine: "oklch(23.6% 0.066 260.2)"
  royal: "oklch(52.5% 0.204 265.4)"
  sky: "oklch(70.2% 0.13 267.8)"
  mist: "oklch(98.2% 0.006 264.5)"
  white: "oklch(100% 0 0)"
  sky-white: "oklch(96.5% 0.008 265)"
  cta-green: "oklch(86.8% 0.156 144.1)"
  cta-magenta: "oklch(44.7% 0.205 328.4)"
  cta-gold: "oklch(88.2% 0.134 91.7)"
  surface-2: "oklch(95% 0.014 265)"
  ink-soft: "oklch(44% 0.05 262)"
  accent-soft: "oklch(91.5% 0.045 266)"
  rule: "oklch(89.5% 0.02 265)"
  scroll-track: "oklch(93.5% 0.016 265)"
  surface-dark: "oklch(27.5% 0.07 261)"
  surface-2-dark: "oklch(31.5% 0.072 262)"
  ink-soft-dark: "oklch(80% 0.04 265)"
  accent-soft-dark: "oklch(36% 0.09 265)"
  rule-dark: "oklch(35% 0.06 262)"
  scroll-track-dark: "oklch(27% 0.06 261)"
typography:
  display:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 7.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline-lg:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  panel-title:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 2.1vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"ss01\", \"cv11\""
  label:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  lg: "32px"
  inset: "22px"
  md: "20px"
  tile: "18px"
  chip: "14px"
  sm: "12px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(56px, 9vw, 120px)"
  content-max: "1240px"
  header: "84px"
components:
  button-primary:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 36px"
    height: "60px"
  button-cta-green:
    backgroundColor: "{colors.cta-green}"
    textColor: "{colors.marine}"
    rounded: "{rounded.pill}"
    padding: "0 clamp(32px, 4vw, 52px)"
    height: "76px"
  button-cta-magenta:
    backgroundColor: "{colors.cta-magenta}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 clamp(32px, 4vw, 52px)"
    height: "76px"
  button-cta-gold:
    backgroundColor: "{colors.cta-gold}"
    textColor: "{colors.marine}"
    rounded: "{rounded.pill}"
    padding: "0 clamp(32px, 4vw, 52px)"
    height: "76px"
  button-ink:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  nav-pill:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.royal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px"
  nav-pill-link:
    textColor: "{colors.royal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
  nav-pill-indicator:
    backgroundColor: "{colors.accent-soft}"
    rounded: "{rounded.pill}"
  chip-filter:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.royal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  chip-filter-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.marine}"
  chip-filter-active:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.white}"
  skill-chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.chip}"
    size: "48px"
  toggle:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.marine}"
    rounded: "{rounded.pill}"
    size: "36px"
  stage-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.marine}"
    rounded: "{rounded.lg}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.marine}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: resonansIT

## Overview

**Creative North Star: "The Scroll-Paced Stage"**

The site is a stage where one thing speaks at a time. A full-bleed video opens under a floating header, then partners, members, projects and offers each take the whole viewport in turn, either as a single centred statement or as a large rounded panel that stacks over the previous one as you scroll. Type is heavy and big; copy is short. The palette is the group's own blues translated to OKLCH, cool and calm, with three loud CTA colours held back for the moment of decision.

Density is low and deliberate: generous section padding, one idea per panel, ledes capped near 46 characters. Everything that can be pressed is a pill or a soft tile and pops up on hover with a small overshoot (the bounce easing, requested by the user after Jitter); everything static stays still. Depth is soft and Marine-tinted, never hard-edged. Light theme sits on Mist with Royal as the accent; dark theme sits on Marine with Sky as the accent; the theme follows the operating system until the user toggles it, and colours ease across when it switches. The site is bilingual (Norwegian default, English) via a cookie set by the flag toggle.

**Key Characteristics:**
- One thing at a time: centred section intros, sticky stacked panels, a crossfading partner name.
- Inter 800 with tight negative tracking for every heading voice.
- Pills for actions and navigation, generous rounded panels for content.
- Bounce-eased pop-ups on interactive elements only; colour and opacity always ease out.
- Two themes from one semantic token set; OKLCH everywhere.
- An always-visible, wide, accent-coloured scrollbar.

## Colors

A cool, single-hue blue system (hue 260 to 268) with one accent per theme and three warm-to-vivid CTA colours reserved for the offers.

### Primary
- **Royal Signal Blue** (`royal`): the light-theme accent. Nav link text, filter chip text, primary buttons, active filter fill, focus rings, selection, caret, scrollbar thumb, project roles and meta.
- **Sky Night Blue** (`sky`): the dark-theme accent in every role Royal holds in light. Also the hover tint over the video stage and the lower arc of the logo's standing-wave "o".

### Secondary
- **Meadow CTA Green** (`cta-green`, the user's #90EE90): first offer panel's button, with Marine text.
- **Velvet CTA Magenta** (`cta-magenta`, the user's #8B008B): second offer panel's button, with white text.
- **Honey CTA Gold** (`cta-gold`, the user's #F8D568): third offer panel's button, with Marine text.

Each offer panel's ground is its tone mixed 13% into the surface, so the panel and its button read as one door.

### Neutral
- **Marine Ink** (`marine`): light-theme text, the dark-theme ground, the video stage backdrop, ink buttons (GitHub, contributors on hover, menu recall).
- **Mist Paper** (`mist`): light-theme page ground.
- **White** (`white`): light-theme panel and input surface; text on Royal and on magenta.
- **Sky White** (`sky-white`): dark-theme text and logo letters.
- **Pale Wash** (`surface-2` / `surface-2-dark`): resting fill of the nav pill, toggles, filter chips, skill chips, arrows.
- **Slate Ink** (`ink-soft` / `ink-soft-dark`): ledes, meta, summaries, inactive mobile nav links.
- **Accent Haze** (`accent-soft` / `accent-soft-dark`): nav highlight, hovered chips and toggles, tags, image placeholders, notes.
- **Hairline** (`rule` / `rule-dark`): 1px borders on panels, pills, inputs, footer top, section dividers.
- **Night Surfaces** (`surface-dark`): dark-theme panels and inputs.
- **Scroll Track** (`scroll-track` / `scroll-track-dark`): the scrollbar's track.

### Named Rules
**The One Accent Per Theme Rule.** Royal is the only accent in light, Sky the only accent in dark. They swap through the semantic accent token; never hard-code either in a component.

**The Three Doors Rule.** Green, magenta and gold appear only in the offer panels, one tone per panel, on the button and as a 13% wash of the panel ground. Nowhere else.

**The Two Arcs Rule.** The logo's upper and lower arcs always keep different tones (Marine over Sky in light, Sky White over Sky in dark). The logo is never stretched, outlined or shadowed.

## Typography

**Display Font:** Inter (with Helvetica Neue, Helvetica, Arial, sans-serif)
**Body Font:** Inter (same stack)
**Label/Mono Font:** ui-monospace stack for code only

**Character:** One family carries everything. Headings are Inter at 800 with tight negative tracking so they read as blocks of voice; body is Inter at 400 with stylistic set ss01 and cv11 for a cleaner, more geometric texture. Inter stands in for TWK Lausanne at the user's request.

### Hierarchy
- **Display** (800, clamp(2.6rem, 7.2vw, 6rem), 1): section intros, offer titles, the crossfading partner names, the 404 code.
- **Headline Large** (800, clamp(2.4rem, 6vw, 5rem), 1): page titles.
- **Panel Title** (800, clamp(2.4rem, 5vw, 4.5rem), 0.98): member names and project titles inside stacked panels.
- **Headline** (800, clamp(2rem, 4.4vw, 3.75rem), 1.02): section headings on inner pages.
- **Title** (700, clamp(1.35rem, 2.1vw, 1.875rem), 1.12): card titles, offer subtitles, sub-sections.
- **Lede** (400, clamp(1.1rem, 1.5vw, 1.35rem), 1.45): one-line intros under headings in Slate Ink, max 46ch.
- **Body** (400, 17px, 1.55): running text; long-form prose capped at 68ch.
- **Label** (600, 15px, 0.01em): nav links, filter chips, form labels, meta. Tags drop to 13px to 14px at 600.

### Named Rules
**The Heavy Voice Rule.** Every heading is 800 (titles 700) with negative tracking between -0.02em and -0.04em and balanced wrapping. No light or regular display weights.

**The Short Line Rule.** Ledes stop at 46ch, panel taglines at 40ch to 48ch, prose at 68ch. Big type earns its size by saying one line.

## Layout

Content sits in a centred column of 1240px max with a fluid gutter (clamp(16px, 4vw, 48px)); the video stage and the stacked panels run nearly full width inside that gutter. Sections breathe with clamp(56px, 9vw, 120px) vertical padding; section intros are centred, at least 62svh tall on desktop, with the heading capped at 14ch.

The home page's spine is a sticky stack: each member and project panel is at least min(100svh - 120px, 780px) tall, sticks at 20px plus 14px per index so the previous panel peeks above, with 24vh between panels. Inside, panels split media and text on a 5:6 (members) or 7:5 (projects) grid. Below 760px wide or 680px tall the stack becomes a plain column with 20px gaps and panels collapse to one column.

The header is fixed, 84px tall (68px below 760px), on the page ground; it hides on scroll down and a round ink recall button appears top right. Below 900px the pill nav is replaced by a menu button opening a rounded drop-down panel with 2rem 800 links. The blog index is a two-column layout (content plus 280px sticky category aside) that collapses below 960px. Breakpoints in use: 960, 900, 760, 700, 640px.

## Elevation & Depth

Depth is soft and tinted. One Marine-tinted card shadow (two layers: a 1px contact shadow and a long, negatively spread ambient blur) lifts stacked panels, carousel cards, the mobile menu and the recall button at rest, and appears under post rows on hover. Interactive elements gain a coloured glow (their own tone mixed into the shadow) when they pop up. In dark theme the card shadow deepens to near-black. Flat surfaces otherwise rely on Hairline borders and the Pale Wash fill.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px oklch(23.6% 0.066 260.2 / 0.06), 0 18px 48px -18px oklch(23.6% 0.066 260.2 / 0.28)`): stacked panels, carousel cards, menu panel, recall button, post row on hover.
- **Rest Nudge** (`box-shadow: 0 2px 6px oklch(23.6% 0.066 260.2 / 0.12)`): CTA and social buttons at rest.
- **Tone Glow** (`box-shadow: 0 18px 36px -14px color-mix(in oklch, var(--tone) 75%, transparent), 0 4px 10px -4px oklch(23.6% 0.066 260.2 / 0.2)`): CTA and social buttons on hover, in their own colour.

### Named Rules
**The Soft Lift Rule.** Shadows are diffuse and Marine-tinted, never hard offset. A shadow that grows on hover always travels with an upward translate.

## Shapes

Two shape families. Actions and navigation are full pills (999px): buttons, nav, filter chips, toggles, tags, contributor chips, the skip link. Icon tiles are soft squares: skill chips at 14px, social buttons at 18px, the carousel GitHub tile at 14px. Containers use the radius scale: 32px for the video stage, stacked panels and covers (24px below 760px), 20px for post rows, empty states and the blog aside, 12px for inputs and notes. Media nested inside a panel takes the outer radius minus 10px (22px), and covers inside cards drop to 14px. Borders are 1px Hairline; inputs and skill chips use 1.5px. Dashed borders mean "not yet": skills being learned and empty states.

**The Nested Radius Rule.** An inner rounded element uses its container's radius minus its inset (32px panel, 22px media), so corners stay concentric.

## Components

### Buttons
Big, round and eager: they rise on hover with a slight overshoot.
- **Shape:** full pill (999px).
- **Primary:** accent fill, on-accent text, 700 weight, 56px to 60px tall with 28px to 36px side padding (submit, 404 home, project "more").
- **CTA:** the offer panel's own tone, 76px tall (64px and full width below 760px), clamp(1.15rem, 1.6vw, 1.45rem) at 700, Rest Nudge shadow.
- **Ink:** Marine fill (ink token) with ground-coloured text, 48px tall, used for GitHub links.
- **Hover / Focus:** translateY(-4px) scale(1.02) over 380ms on the bounce curve; CTA adds Tone Glow; press settles to translateY(-1px). Trailing arrows slide 4px right on the ease-out curve. Focus is a 3px accent outline at 3px offset.

### Chips
- **Filter chips:** Pale Wash pill, Hairline border, accent text, 44px tall (40px for blog categories). Hover lifts 2px on the bounce curve and fills Accent Haze with ink text. Pressed or current fills with the accent and on-accent text.
- **Skill chips:** 48px icon tiles at 14px radius, Pale Wash fill, Slate Ink brand-agnostic icon. Hover takes the skill's own brand colour for icon, a 16% wash and a 45% border, and raises an ink name tag above. Skills being learned are transparent with a 1.5px dashed border, explained by a small legend.
- **Tags:** Accent Haze pills, 13px to 14px at 600, ink text.
- **Contributor chips:** pill with a 44px round avatar; linked chips turn ink on hover, lift 4px and sweep a light sheen across.

### Cards / Containers
- **Stage panels:** 32px radius, surface fill, Hairline border, Card shadow, 16px to 24px inner padding around media at 22px radius.
- **Carousel cards:** trading-card proportion (5:7), 22px radius, 10px padding, Card shadow; side cards rotate away in 3D and desaturate; only the active card shows its summary and actions.
- **Post rows:** 180px square cover plus text, 20px radius, Hairline border; hover lifts 4px, borders in accent and gains the Card shadow.
- **Offer panels:** full-width, tone-washed ground, clamp(32px, 6vw, 88px) padding, Display-size title capped at 12ch.

### Inputs / Fields
- **Style:** surface fill, 1.5px Hairline border, 12px radius, 14px 16px padding, 600 15px labels above.
- **Hover:** border mixes 45% toward the accent.
- **Focus:** border turns accent with a 3px outline of the accent at 35% strength, zero offset.

### Navigation
- **Desktop:** a Pale Wash pill with Hairline border holding 15px 600 links in the accent. An Accent Haze highlight slides under the hovered link (380ms ease-out) and the hovered link pops up 2px on the bounce curve; the current page reads in ink and steps back to 60% while another link holds the highlight.
- **Toggles:** 36px round Pale Wash buttons stacked to the right of the nav: a round flag for NO/EN and a sun/moon icon that rotates in. Hover lifts and scales to 1.06 on the bounce curve with an Accent Haze fill. 48px on touch layouts.
- **Mobile:** 48px round menu button; the drop-down panel lists links at 2rem 800, current in accent, others in Slate Ink, with the toggles beneath.

### Video Stage (signature)
The first viewport. A 32px rounded frame filling the viewport under the header, the video greyed (grayscale 0.7) under a dark slate tint. The round play button sits faint at rest; on hover the tint turns Sky and bounces up 18px and back over 720ms, and the button brightens, rises 8px and scales to 1.06 on the bounce curve. The tint overhangs the frame by 32px so the bounce never uncovers an edge. No text sits on the video.

### Partner Statement (signature)
Partner names in Display type crossfade one at a time, the incoming name sharpening from blur and 0.82 scale, the outgoing one zooming past to 1.18. A small round pause control sits beneath. With reduced motion both names show stacked and still.

### Scrollbar
Always visible, 16px wide, track in Scroll Track, thumb a pill in the accent with a 5px transparent border that shrinks to 2px under the pointer, so it widens on hover.

## Do's and Don'ts

### Do:
- **Do** express every colour in OKLCH and route theme-dependent colour through the semantic tokens (bg, surface, surface-2, ink, ink-soft, accent, on-accent, accent-soft, rule).
- **Do** use the bounce curve (cubic-bezier(0.34, 1.56, 0.64, 1)) for hover and press pop-ups of interactive elements and the video overlay, and the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)) for colour, opacity, sliding and reveals.
- **Do** make every action a pill or a soft icon tile that lifts on hover; keep static elements still.
- **Do** give each section one heading in Display or Headline weight 800 and at most one lede line.
- **Do** keep content visible without scroll-driven animation support and honour reduced motion by collapsing animations.
- **Do** keep the scrollbar always visible and in the theme's accent.
- **Do** keep NO/EN strings switchable by the flag toggle, stored in the language cookie.

### Don't:
- **Don't** use green, magenta or gold outside the offer panels.
- **Don't** use hard offset shadows or untinted black shadows.
- **Don't** set headings in weights below 700 or with positive tracking.
- **Don't** use bounce easing on colour or opacity changes, or on elements that are not interactive.
- **Don't** use partner logos; partners are named in text only.
- **Don't** stretch, outline or shadow the logo, or give its two arcs the same tone.
