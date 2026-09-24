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
          <h3 className="font-sans font-medium text-xl tracking-tight text-white sm:text-2xl">
            {title}
          </h3>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
            {specs.length} parameters
          </span>
        </div>
      )}

      <dl className={`grid grid-cols-1 gap-x-8 ${gridCols}`}>
        {specs.map((spec) => {
          const restricted = isRestricted(spec.value);
          return (
            <div key={spec.label} className="border-t border-line">
              {/* A spec cell is data, not a card: it keeps the hairline grid
                  and stays out of the .card treatment, which would double the
                  borders and put corner ticks on every figure in a table. */}
              <div className="h-full py-5 pr-3">
                <dt className="data-label">{spec.label}</dt>
                <dd
                  className={`mt-2 font-sans text-lg font-medium tabular-nums ${
                    restricted ? 'text-ink-3' : 'text-white'
                  }`}
                >
                  {spec.value}
                </dd>
                {spec.note && (
                  <dd className="mt-2 text-xs leading-relaxed text-ink-dim">
                    {spec.note}
                  </dd>
                )}
              </div>
            </div>
          );
        })}
      </dl>

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
