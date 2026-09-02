import { useMemo } from 'react';

/* ---------------------------------------------------------------------------
 * CONTOUR FIELD
 *
 * A relief field drawn as stacked contour lines, used as the masthead backdrop
 * on pages where no honest photograph exists (the software products, the
 * platform, the programme office). It is deterministic: the same designation
 * always produces the same terrain, so a page looks identical on every visit
 * and across every build.
 *
 * The geometry is computed once per seed and rendered as static paths, so this
 * costs a few hundred bytes of DOM and nothing per frame.
 * ------------------------------------------------------------------------- */

const W = 1440;
const H = 900;
const LINES = 30;
const STEP = 30;

/** Deterministic 32-bit hash, so a slug maps to a stable terrain. */
function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Four summed sine waves per line. Enough harmonics to stop reading as a wave
 * and start reading as terrain, few enough to stay smooth at any width.
 */
function buildPaths(seed: string) {
  const rand = mulberry32(seedFrom(seed));
  const waves = Array.from({ length: 4 }, () => ({
    freq: 0.6 + rand() * 2.4,
    phase: rand() * Math.PI * 2,
    amp: 26 + rand() * 72,
    drift: rand() * 0.5,
  }));

  const paths: { d: string; i: number }[] = [];
  for (let i = 0; i < LINES; i += 1) {
    const baseY = -60 + i * STEP;
    // Relief compresses toward the top of the frame and opens out below it.
    const relief = 0.35 + (i / LINES) * 1.15;
    let d = '';
    for (let x = 0; x <= W; x += 20) {
      const t = x / W;
      let y = baseY;
      for (const w of waves) {
        y += Math.sin(t * Math.PI * 2 * w.freq + w.phase + i * w.drift * 0.28) * w.amp * relief;
      }
      d += `${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)} `;
    }
    paths.push({ d, i });
  }
  return paths;
}

export function ContourField({
  seed,
  className = '',
}: {
  /** Any stable string. The same seed always draws the same terrain. */
  seed: string;
  className?: string;
}) {
  const paths = useMemo(() => buildPaths(seed), [seed]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`cf-fade-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="30%" stopColor="#fff" stopOpacity="1" />
          <stop offset="78%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <mask id={`cf-mask-${seed}`}>
          <rect width={W} height={H} fill={`url(#cf-fade-${seed})`} />
        </mask>
      </defs>

      <g mask={`url(#cf-mask-${seed})`} fill="none" strokeLinecap="round">
        {paths.map(({ d, i }) => {
          // Every fifth line is an index contour, as on a real relief map.
          const index = i % 5 === 0;
          return (
            <path
              key={i}
              d={d}
              stroke={index ? '#FF8A00' : '#FFFFFF'}
              strokeOpacity={index ? 0.34 : 0.15}
              strokeWidth={index ? 1.3 : 0.85}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default ContourField;
