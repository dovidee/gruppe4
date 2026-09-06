# resonansIT - brand assets

TeX Gyre Heros Bold. The `o` in resonans is a standing wave: two half-waves
meeting at the nodes, upper in Marine, lower in Sky.

## Palette

| Name | Hex | Use |
|---|---|---|
| Marine | `#0A1D3D` | Body text, dark sections, "resonans" and the upper arc |
| Royal | `#305CDE` | Primary brand blue: "IT", links, buttons, the icon's upper arc |
| Sky | `#7C9BF0` | The lower arc, hover states, muted accents |
| Mist | `#F7F9FD` | Section backgrounds, cards |
| White | `#FFFFFF` | Page background |

## Typeface

TeX Gyre Heros, a metric-compatible Helvetica. All four styles are in `fonts/`
under the GUST Font License, which permits commercial use, embedding and
redistribution. `resonans` is set at 66% the cap height of `IT`.

```css
@font-face { font-family:"TeX Gyre Heros"; src:url("/fonts/texgyreheros-regular.otf") format("opentype"); font-weight:400; font-display:swap; }
@font-face { font-family:"TeX Gyre Heros"; src:url("/fonts/texgyreheros-bold.otf") format("opentype"); font-weight:700; font-display:swap; }

:root {
  --marine:#0A1D3D; --royal:#305CDE; --sky:#7C9BF0; --mist:#F7F9FD;
  --font:"TeX Gyre Heros", Helvetica, Arial, sans-serif;
}
```

Convert the OTFs to WOFF2 before shipping. Same files, about a third the weight.

## Files

Vector, use these wherever possible:

- `resonansit-logo.svg` for light backgrounds
- `resonansit-logo-white.svg` for Marine backgrounds
- `resonansit-icon.svg`, `resonansit-icon-white.svg`

Real outlines, not embedded fonts. They render identically anywhere.

Raster: `resonansit-logo.png` / `-white` / `-dark`;
`resonansit-icon.png` / `-navy` / `-white` at 1024px;
`resonansit-icon-app-navy.png` / `-app-white.png` at 512px.

Web: `favicon.ico` (16/32/48/64), `favicon-16/32/48/64.png`,
`apple-touch-icon.png` (180), `android-chrome-192.png`, `-512.png`.

The `-white` files are transparent PNGs with white artwork. They look blank in a
file browser. That is correct, drop them on a dark background.

## Rules

- Clear space around the logo: at least the height of the `I` in `IT`.
- Minimum logo width 150px. The standing-wave `o` holds up better than a cut
  letterform would, but below that the two arcs merge.
- Do not give both arcs the same colour. The tonal split is what makes it read
  as an interference pattern rather than a pointed oval.
- Do not close the gap between the arcs at the nodes. They meet, they do not
  overlap.
- Do not stretch, rotate, outline or drop-shadow it.
- On photos use `resonansit-logo-white.png` over a dark overlay.

## HTML

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Discord

Server icon: `resonansit-icon-app-navy.png`. Discord crops to a circle and the
solid Marine background survives that better than transparency.