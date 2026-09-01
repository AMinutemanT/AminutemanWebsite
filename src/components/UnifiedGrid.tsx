import { useState } from 'react';

/* ---------------------------------------------------------------------------
 * THE UNIFIED GRID
 *
 * An interactive schematic of what Valley actually does: pull heterogeneous
 * sensing into one custody model, reason over it, and allocate any effector
 * against any track. Hovering a node lights its path through the core.
 * ------------------------------------------------------------------------- */

interface Node {
  id: string;
  label: string;
  sub: string;
  y: number;
  side: 'sense' | 'effect';
  /** Marks nodes that are not ours, the point being that the grid does not care. */
  external?: boolean;
}

const SENSORS: Node[] = [
  { id: 'orbital', label: 'PRAHARI', sub: 'Orbital awareness', y: 74, side: 'sense' },
  { id: 'indrastra', label: 'INDRASTRA', sub: 'Low-altitude air picture', y: 154, side: 'sense' },
  { id: 'ankosha-isr', label: 'ANKOSHA', sub: 'Forward ISR in the loiter', y: 234, side: 'sense' },
  { id: 'ground', label: 'GROUND', sub: 'Soldier & vehicle reporting', y: 314, side: 'sense' },
  { id: 'sigint', label: 'RF / SIGINT', sub: 'Emitter geolocation', y: 394, side: 'sense' },
  { id: 'eo', label: 'EO / IR', sub: 'Persistent airborne stare', y: 474, side: 'sense' },
  { id: 'partner-sensor', label: 'THIRD PARTY', sub: 'Legacy & allied sensors', y: 554, side: 'sense', external: true },
];

const EFFECTORS: Node[] = [
  { id: 'ankosha-fx', label: 'ANKOSHA', sub: 'Loitering strike', y: 74, side: 'effect' },
  { id: 'ankosha-s', label: 'ANKOSHA-S', sub: 'Saturation and screening', y: 154, side: 'effect' },
  { id: 'ryder', label: 'RYDER', sub: 'Counter-UAS soft & hard kill', y: 234, side: 'effect' },
  { id: 'talon', label: 'TALON', sub: 'Effector pairing', y: 314, side: 'effect' },
  { id: 'ketu', label: 'KETU', sub: 'Co-orbital effect', y: 394, side: 'effect' },
  { id: 'hgv', label: 'HGV', sub: 'Hypersonic delivery', y: 474, side: 'effect' },
  { id: 'partner-fx', label: 'THIRD PARTY', sub: 'Artillery, allied effectors', y: 554, side: 'effect', external: true },
];

const CORE = { x: 600, y: 314 };
const SENSE_X = 148;
const EFFECT_X = 1052;

function path(node: Node) {
  const x = node.side === 'sense' ? SENSE_X : EFFECT_X;
  const cx = node.side === 'sense' ? (x + CORE.x) / 2 : (x + CORE.x) / 2;
  const from = node.side === 'sense' ? `${x + 78} ${node.y}` : `${CORE.x + 78} ${CORE.y}`;
  const to = node.side === 'sense' ? `${CORE.x - 78} ${CORE.y}` : `${x - 78} ${node.y}`;
  const c1 = node.side === 'sense' ? `${cx} ${node.y}` : `${cx} ${CORE.y}`;
  const c2 = node.side === 'sense' ? `${cx} ${CORE.y}` : `${cx} ${node.y}`;
  return `M ${from} C ${c1}, ${c2}, ${to}`;
}

export function UnifiedGrid({ className = '' }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const all = [...SENSORS, ...EFFECTORS];
  const activeNode = all.find((n) => n.id === active) ?? null;

  return (
    <div className={className}>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <svg
          viewBox="0 0 1200 628"
          className="min-w-[860px] w-full"
          role="img"
          aria-label="Schematic of the Valley unified grid: sensors on the left feed a central core which allocates effectors on the right."
        >
          <defs>
            <linearGradient id="grid-flow-in" x1="0" x2="1">
              <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="grid-flow-out" x1="0" x2="1">
              <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id="core-glow">
              <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF8A00" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Column headers */}
          <text x={SENSE_X} y="30" className="fill-white/30" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="4" textAnchor="middle">
            SENSE
          </text>
          <text x={CORE.x} y="30" className="fill-white/30" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="4" textAnchor="middle">
            DECIDE
          </text>
          <text x={EFFECT_X} y="30" className="fill-white/30" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="4" textAnchor="middle">
            EFFECT
          </text>

          {/* Connections */}
          {all.map((node) => {
            const dim = active !== null && active !== node.id;
            return (
              <g key={`path-${node.id}`}>
                <path
                  d={path(node)}
                  fill="none"
                  stroke={node.side === 'sense' ? 'url(#grid-flow-in)' : 'url(#grid-flow-out)'}
                  strokeWidth={active === node.id ? 2 : 1}
                  opacity={dim ? 0.12 : 1}
                  style={{ transition: 'opacity 200ms, stroke-width 200ms' }}
                />
                {/* Travelling packet, the track moving through the grid. */}
                <path
                  d={path(node)}
                  fill="none"
                  stroke={node.side === 'sense' ? '#FFAE42' : '#5AB6FF'}
                  strokeWidth={active === node.id ? 2.5 : 1.5}
                  strokeLinecap="round"
                  strokeDasharray="3 240"
                  opacity={dim ? 0.1 : 0.9}
                  className="animate-trace-dash"
                  style={{ animationDelay: `${node.y * 4}ms`, transition: 'opacity 200ms' }}
                />
              </g>
            );
          })}

          {/* Core */}
          <circle cx={CORE.x} cy={CORE.y} r="150" fill="url(#core-glow)" />
          <g>
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r="104"
              fill="none"
              stroke="#FF8A00"
              strokeOpacity="0.18"
              strokeDasharray="2 10"
            />
            <rect
              x={CORE.x - 78}
              y={CORE.y - 52}
              width="156"
              height="104"
              fill="#0B0F16"
              stroke="#FF8A00"
              strokeOpacity="0.6"
            />
            {/* Corner ticks */}
            {[
              [-78, -52, 14, 0],
              [-78, -52, 0, 14],
              [78, -52, -14, 0],
              [78, -52, 0, 14],
              [-78, 52, 14, 0],
              [-78, 52, 0, -14],
              [78, 52, -14, 0],
              [78, 52, 0, -14],
            ].map(([px, py, ex, ey], i) => (
              <line
                key={i}
                x1={CORE.x + px}
                y1={CORE.y + py}
                x2={CORE.x + px + ex}
                y2={CORE.y + py + ey}
                stroke="#FF8A00"
                strokeWidth="1.5"
              />
            ))}
            <text
              x={CORE.x}
              y={CORE.y - 8}
              textAnchor="middle"
              className="fill-white"
              fontSize="26"
              fontFamily="Barlow Condensed, sans-serif"
              letterSpacing="4"
            >
              VALLEY
            </text>
            <text
              x={CORE.x}
              y={CORE.y + 14}
              textAnchor="middle"
              className="fill-white/40"
              fontSize="9.5"
              fontFamily="IBM Plex Mono, monospace"
              letterSpacing="1.6"
            >
              CUSTODY · PAIRING · AUTHORITY
            </text>
            <text
              x={CORE.x}
              y={CORE.y + 32}
              textAnchor="middle"
              className="fill-nominal/70"
              fontSize="9"
              fontFamily="IBM Plex Mono, monospace"
              letterSpacing="1.6"
            >
              ● GRID NOMINAL
            </text>
          </g>

          {/* Nodes */}
          {all.map((node) => {
            const x = node.side === 'sense' ? SENSE_X : EFFECT_X;
            const dim = active !== null && active !== node.id;
            const accent = node.side === 'sense' ? '#FF8A00' : '#FF8A00';
            return (
              <g
                key={node.id}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                className="cursor-pointer focus:outline-none"
                opacity={dim ? 0.35 : 1}
                style={{ transition: 'opacity 200ms' }}
              >
                <rect
                  x={x - 78}
                  y={node.y - 24}
                  width="156"
                  height="48"
                  fill="#0B0F16"
                  stroke={active === node.id ? accent : 'rgba(255,255,255,0.16)'}
                  strokeDasharray={node.external ? '4 3' : undefined}
                  style={{ transition: 'stroke 200ms' }}
                />
                <text
                  x={x}
                  y={node.y - 3}
                  textAnchor="middle"
                  className="fill-white"
                  fontSize="14"
                  fontFamily="Barlow Condensed, sans-serif"
                  letterSpacing="2"
                >
                  {node.label}
                </text>
                <text
                  x={x}
                  y={node.y + 13}
                  textAnchor="middle"
                  className="fill-white/35"
                  fontSize="8.5"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {node.sub.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Read-out strip. Mirrors what an operator would see when interrogating a node. */}
      <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
        <div className="bg-panel/60 p-4">
          <p className="data-label">Selected node</p>
          <p className="mt-1 font-display text-xl uppercase tracking-wide text-white">
            {activeNode ? activeNode.label : '···'}
          </p>
        </div>
        <div className="bg-panel/60 p-4">
          <p className="data-label">Function</p>
          <p className="mt-1 font-mono text-xs text-white/70">
            {activeNode ? activeNode.sub : 'Hover or focus a node to interrogate it'}
          </p>
        </div>
        <div className="bg-panel/60 p-4">
          <p className="data-label">Ownership</p>
          <p className="mt-1 font-mono text-xs text-white/70">
            {activeNode
              ? activeNode.external
                ? 'Third party · integrated, not replaced'
                : 'Aminuteman programme' : '···'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnifiedGrid;
