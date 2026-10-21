// Flags for the language toggle, drawn square so they crop cleanly to a
// circle. Colours are the official ones, written in OKLCH.

export function FlagNorway() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" fill="oklch(50.2% 0.197 20.6)" />
      <rect x="8" width="8" height="32" fill="oklch(100% 0 0)" />
      <rect y="12" width="32" height="8" fill="oklch(100% 0 0)" />
      <rect x="10" width="4" height="32" fill="oklch(26.7% 0.112 260.6)" />
      <rect y="14" width="32" height="4" fill="oklch(26.7% 0.112 260.6)" />
    </svg>
  );
}

const US_STRIPES = Array.from({ length: 7 }, (_, i) => i * (32 / 6.5));
const US_STARS = [
  [3, 3],
  [7, 3],
  [11, 3],
  [5, 6.5],
  [9, 6.5],
  [3, 10],
  [7, 10],
  [11, 10],
  [5, 13.5],
  [9, 13.5],
];

export function FlagUS() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" fill="oklch(100% 0 0)" />
      {US_STRIPES.map((y) => (
        <rect key={y} y={y} width="32" height={32 / 13} fill="oklch(49.9% 0.178 20.7)" />
      ))}
      <rect width="14" height={(32 / 13) * 7} fill="oklch(37.9% 0.086 282.4)" />
      {US_STARS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="oklch(100% 0 0)" />
      ))}
    </svg>
  );
}
