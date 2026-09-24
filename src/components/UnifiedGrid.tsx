
/* ---------------------------------------------------------------------------
 * THE UNIFIED GRID
 *
 * What Valley actually does: pull heterogeneous sensing into one custody
 * model, reason over it, and allocate any effector against any track.
 *
 * Previously a radial SVG diagram: a glowing core, perfectly symmetric
 * seven-a-side node columns bezier-curving into it, animated dashes tracing
 * the curves, a dashed halo ring, corner ticks on the core. Every one of
 * those is a well-known generic-AI-network-diagram tell, and this codebase
 * had already reached exactly that verdict once before, about the same
 * component, on a different page (see tasks/todo.md Session 11: "the
 * symmetry was the tell... a diagram that is reads as decoration"). Rebuilt
 * as two plain bordered lists either side of a short statement, matching the
 * Kill Chain and Layers sections elsewhere on this same page, which already
 * carry equivalent information without reading as generated. Nothing here
 * required inventing new content; every label and sub-line is unchanged.
 * ------------------------------------------------------------------------- */

interface Node {
  id: string;
  label: string;
  sub: string;
  /** Marks nodes that are not ours, the point being that the grid does not care. */
  external?: boolean;
}

const SENSORS: Node[] = [
  { id: 'orbital', label: 'PRAHARI', sub: 'Orbital awareness' },
  { id: 'indrastra', label: 'INDRASTRA', sub: 'Low-altitude air picture' },
  { id: 'ankosha-isr', label: 'ANKOSHA', sub: 'Forward ISR in the loiter' },
  { id: 'ground', label: 'GROUND', sub: 'Soldier & vehicle reporting' },
  { id: 'sigint', label: 'RF / SIGINT', sub: 'Emitter geolocation' },
  { id: 'eo', label: 'EO / IR', sub: 'Persistent airborne stare' },
  { id: 'partner-sensor', label: 'THIRD PARTY', sub: 'Legacy & allied sensors', external: true },
];

const EFFECTORS: Node[] = [
  { id: 'ankosha-fx', label: 'ANKOSHA', sub: 'Loitering strike' },
  { id: 'ankosha-s', label: 'ANKOSHA-S', sub: 'Saturation and screening' },
  { id: 'ryder', label: 'RYDER', sub: 'Counter-UAS soft & hard kill' },
  { id: 'talon', label: 'TALON', sub: 'Effector pairing' },
  { id: 'ketu', label: 'KETU', sub: 'Co-orbital effect' },
  { id: 'hgv', label: 'HGV', sub: 'Hypersonic delivery' },
  { id: 'partner-fx', label: 'THIRD PARTY', sub: 'Artillery, allied effectors', external: true },
];

function NodeRow({ node }: { node: Node }) {
  return (
    <li className="border-t border-line py-4">
      <p className="text-sm font-medium text-white">{node.label}</p>
      <p className="mt-1 text-sm text-ink-3">{node.sub}</p>
    </li>
  );
}

export function UnifiedGrid({ className = '' }: { className?: string }) {

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
        <div>
          <p className="data-label mb-4">Sense</p>
          <ul>
            {SENSORS.map((node) => (
              <NodeRow key={node.id} node={node} />
            ))}
          </ul>
        </div>

        <div className="flex justify-center lg:px-2">
          <div className="border border-line bg-panel/60 px-8 py-10 text-center">
            <p className="data-label">Decide</p>
            <p className="mt-4 font-display text-2xl uppercase tracking-wide text-white">
              Valley
            </p>
            <p className="mt-3 max-w-[14rem] font-mono text-[0.6rem] uppercase leading-relaxed tracking-widest text-ink-dim">
              Custody · Pairing · Authority
            </p>
          </div>
        </div>

        <div>
          <p className="data-label mb-4">Effect</p>
          <ul>
            {EFFECTORS.map((node) => (
              <NodeRow key={node.id} node={node} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UnifiedGrid;
