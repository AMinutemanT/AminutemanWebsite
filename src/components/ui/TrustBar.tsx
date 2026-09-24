/** Named relationships retain their basis rather than implying endorsement through logos. */
export interface TrustBarProps {
  label: string;
  items: { name: string; basis: string }[];
}

export function TrustBar({ label, items }: TrustBarProps) {
  return (
    <section className="border-y border-line bg-void py-8 sm:py-10" aria-label={label}>
      <div className="container">
        <p className="data-label">{label}</p>
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.name}>
              <p className="font-display text-xl uppercase tracking-wide text-ink-1">{item.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-3">{item.basis}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustBar;
