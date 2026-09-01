import { Reveal } from './Reveal';

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

export function SpecTable({
  specs,
  title = 'Performance envelope',
  footnote = 'Figures are indicative of the current configuration. Release of restricted parameters is subject to end-user certification.',
  columns = 3,
}: {
  specs: Spec[];
  title?: string;
  footnote?: string;
  columns?: 2 | 3 | 4;
}) {
  const gridCols =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
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
    </div>
  );
}

export default SpecTable;
