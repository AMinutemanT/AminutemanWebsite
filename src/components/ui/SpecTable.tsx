import { Reveal } from './Reveal';
import { Link } from 'react-router-dom';

export interface Spec {
  label: string;
  /**
   * Use "CLASSIFIED" or "ON REQUEST" where a figure is not releasable. Those render
   * with distinct treatment rather than an invented number.
   */
  value: string;
  note?: string;
}

const RESTRICTED = ['CLASSIFIED', 'ON REQUEST', 'RESTRICTED', 'WITHHELD', 'TBD'];

function isRestricted(value: string) {
  return RESTRICTED.some((token) => value.toUpperCase().includes(token));
}

/**
 * Picks the widest column count that closes the grid exactly, so the last
 * row never leaves a bare empty cell. Tried in order 4, 3, 2 (2 always
 * closes for the even spec counts every programme currently carries); a
 * caller can still force a specific count via the `columns` prop.
 */
function bestFitColumns(count: number): 2 | 3 | 4 {
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;
  return 2;
}

export function SpecTable({
  specs,
  title = 'Performance envelope',
  footnote = 'Figures are indicative of the current configuration. Release of restricted parameters is subject to end-user certification.',
  columns,
}: {
  specs: Spec[];
  title?: string;
  footnote?: string;
  columns?: 2 | 3 | 4;
}) {
  const resolvedColumns = columns ?? bestFitColumns(specs.length);
  const gridCols =
    resolvedColumns === 2
      ? 'sm:grid-cols-2'
      : resolvedColumns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div>
      {title && (
        <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-line pb-4">
          <h3 className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
            {title}
          </h3>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
            {specs.length} parameters
          </span>
        </div>
      )}

      <div className={`grid grid-cols-1 gap-px bg-line ${gridCols}`}>
        {specs.map((spec, i) => {
          const restricted = isRestricted(spec.value);
          return (
            <Reveal key={spec.label} delay={i * 0.04} className="bg-void">
              {/* A spec cell is data, not a card: it keeps the hairline grid
                  and stays out of the .card treatment, which would double the
                  borders and put corner ticks on every figure in a table. */}
              <div className="group h-full bg-panel/40 p-6 transition-colors duration-300 hover:bg-panel">
                <p className="data-label">{spec.label}</p>
                <p
                  className={`mt-3 font-display text-2xl uppercase tracking-wide sm:text-3xl ${
                    restricted ? 'text-signal/70' : 'text-white'
                  }`}
                >
                  {spec.value}
                </p>
                {spec.note && (
                  <p className="mt-2 font-mono text-[0.65rem] leading-relaxed text-ink-dim">
                    {spec.note}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {footnote && (
        <p className="mt-6 max-w-3xl font-mono text-[0.65rem] leading-relaxed text-ink-dim">
          {footnote}
        </p>
      )}
      {specs.some((spec) => isRestricted(spec.value)) && (
        <Link to="/contact" className="mt-4 inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-accent hover:text-white">
          Request programme information →
        </Link>
      )}
    </div>
  );
}

export default SpecTable;
