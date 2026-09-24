import { ReactNode } from 'react';

/** Shared section labels and document headings. */
export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/** Optional section index and label above a natural-language heading. */
export function SectionHeading({
  index,
  eyebrow,
  lead,
  title,
  stop = false,
  lede,
  align = 'left',
  className = '',
}: {
  /** Section ordinal, e.g. "02". */
  index?: string;
  eyebrow?: string;
  /** Optional opening words of the heading. */
  lead?: ReactNode;
  title: ReactNode;
  /** Appends a full stop. */
  stop?: boolean;
  lede?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  const width = centered ? 'mx-auto max-w-4xl' : 'max-w-4xl';

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {(index || eyebrow) && (
        <div className={`flex items-baseline gap-4 ${centered ? 'justify-center' : ''}`}>
          {index && <span className="section-index !mb-0">{index}</span>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
      )}
      <h2 className={`display-lg mt-5 text-white ${width}`}>
        {lead && <>{lead}{' '}</>}{title}{stop && '.'}
      </h2>
      {lede && <p className={`body-copy mt-5 text-base ${centered ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>{lede}</p>}
    </div>
  );
}

export function Rule({ className = '' }: { className?: string }) {
  return <div className={`hairline ${className}`} />;
}

/** Programme maturity label. "OPERATIONAL", "IN TRIALS", "IN DEVELOPMENT". */
export function StatusTag({
  status,
  className = '',
}: {
  status: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 font-sans text-xs text-ink-2 ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
      {status}
    </span>
  );
}

/** Domain chip used on cards and in the systems index. */
export function DomainChip({ label }: { label: string }) {
  return (
    <span className="font-sans text-xs text-ink-3">
      {label}
    </span>
  );
}
