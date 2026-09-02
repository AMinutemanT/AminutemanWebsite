import { ReactNode } from 'react';

/* ---------------------------------------------------------------------------
 * Small, shared chrome. These are the pieces that give every page the same
 * instrument-panel language: monospaced labels, corner brackets, rules.
 * ------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-6 bg-accent/70" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className={centered ? 'flex justify-center' : ''}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className={`display-lg text-white mt-5 ${centered ? 'mx-auto max-w-4xl' : 'max-w-4xl'}`}>
        {title}
      </h2>
      {lede && (
        <p
          className={`body-copy mt-5 text-base sm:text-lg ${
            centered ? 'mx-auto max-w-3xl' : 'max-w-2xl'
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function Rule({ className = '' }: { className?: string }) {
  return <div className={`hairline ${className}`} />;
}

/** Status pill. "OPERATIONAL", "IN TRIALS", "IN DEVELOPMENT". */
export function StatusTag({
  status,
  className = '',
}: {
  status: string;
  className?: string;
}) {
  const normalized = status.toUpperCase();
  const tone = normalized.includes('DEVELOP') || normalized.includes('CONCEPT')
    ? 'text-signal border-signal/40 bg-signal/[0.07]'
    : normalized.includes('TRIAL') || normalized.includes('QUALIF')
      ? 'text-accent-soft border-accent/40 bg-accent/[0.07]'
      : 'text-nominal border-nominal/40 bg-nominal/[0.07]';

  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest ${tone} ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {normalized}
    </span>
  );
}

/** Domain chip used on cards and in the systems index. */
export function DomainChip({ label }: { label: string }) {
  return (
    <span className="border border-line-bright px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
      {label}
    </span>
  );
}
