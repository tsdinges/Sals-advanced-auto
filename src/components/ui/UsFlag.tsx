/**
 * U.S. flag drawn to official proportions (Executive Order 10834):
 * hoist 1 : fly 1.9, 13 stripes, canton 7 stripes tall and 0.76 wide, 50 stars.
 * viewBox is 247 x 130 (hoist = 130). Colors are the flag's own, so they
 * stay fixed in both light and dark themes.
 */
const RED = "#B22234";
const WHITE = "#FFFFFF";
const BLUE = "#3C3B6E";

const STRIPE = 10; // 130 / 13
const CANTON_W = 98.8; // 0.76 * 130
const CANTON_H = STRIPE * 7;
const STAR_DX = 8.233; // 0.0633 * 130
const STAR_DY = 7.02; // 0.054 * 130
const STAR_R = 4; // diameter 0.0616 * 130 ≈ 8

/** Five-point star path centered on 0,0. */
function starPath(r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.382;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(radius * Math.cos(angle)).toFixed(3)},${(radius * Math.sin(angle)).toFixed(3)}`);
  }
  return `M${points.join("L")}Z`;
}

/** 9 rows alternating 6 and 5 stars = 50. */
const STARS: [number, number][] = Array.from({ length: 9 }, (_, row) => {
  const y = STAR_DY * (row + 1);
  const count = row % 2 === 0 ? 6 : 5;
  const offset = row % 2 === 0 ? 1 : 2;
  return Array.from({ length: count }, (_, i) => [STAR_DX * (2 * i + offset), y] as [number, number]);
}).flat();

const STAR_D = starPath(STAR_R);

interface UsFlagProps {
  className?: string;
  /** Leave unset when the flag is decorative (it is hidden from screen readers) */
  title?: string;
}

export function UsFlag({ className, title }: UsFlagProps) {
  return (
    <svg
      viewBox="0 0 247 130"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <rect width="247" height="130" fill={WHITE} />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * STRIPE * 2} width="247" height={STRIPE} fill={RED} />
      ))}
      <rect width={CANTON_W} height={CANTON_H} fill={BLUE} />
      {STARS.map(([x, y]) => (
        <path key={`${x}-${y}`} d={STAR_D} transform={`translate(${x.toFixed(3)} ${y.toFixed(3)})`} fill={WHITE} />
      ))}
    </svg>
  );
}
