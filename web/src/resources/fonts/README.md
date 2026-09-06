# TeX Gyre Heros

The brand typeface. Self-hosted via `next/font/local` (see `../fonts.ts`).

Source: [TeX Gyre](https://www.gust.org.pl/projects/e-foundry/tex-gyre) by GUST
e-foundry, downloaded as OpenType from CTAN
(`mirrors.ctan.org/fonts/tex-gyre/opentype/`).

The `.woff2` files here are subsets of the upstream OTFs, limited to the
codepoints the site needs (Basic Latin, Latin-1 Supplement, Latin Extended-A,
general punctuation) — roughly 30 kB per face instead of 52 kB.

The family ships Regular and Bold only, so CSS weights 500 and 600 resolve to
400 and 700 respectively.

Licensed under the GUST Font License (`GUST-FONT-LICENSE.txt`), an LPPL-style
licence that permits redistribution and web use.
