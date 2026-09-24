import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/* ---------------------------------------------------------------------------
 * COUNTER
 *
 * Counts a figure up when it scrolls into view.
 *
 * The values on this site are written the way they should read — "1,000",
 * "100%", "TRL 5 / 4 / 3" — so rather than taking a number and a format
 * function, this takes the finished string and animates the first run of digits
 * inside it, preserving the separators, prefix and suffix exactly. Anything
 * with no digits, or several unrelated figures, is left alone: a value like
 * "TRL 5 / 4 / 3" is not a quantity and should not tick.
 * ------------------------------------------------------------------------- */

/** Matches the first number, keeping any thousands separators. */
const FIGURE = /\d[\d,]*/;

export function Counter({
  value,
  className = '',
  duration = 1.4,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);

  const match = value.match(FIGURE);
  // Only animate a single, clean figure. Two numbers in one value means it is a
  // designation rather than a quantity.
  const digitGroups = value.match(/\d[\d,]*/g);
  const animatable = Boolean(match) && digitGroups?.length === 1;
  const target = match ? Number(match[0].replace(/,/g, '')) : 0;
  const grouped = match?.[0].includes(',') ?? false;

  useEffect(() => {
    if (!animatable || reduced || !inView) {
      setShown(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const ms = duration * 1000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      // Ease-out cubic: fast off the mark, settling onto the final figure.
      const eased = 1 - Math.pow(1 - t, 3);
      const n = Math.round(target * eased);
      setShown(value.replace(FIGURE, grouped ? n.toLocaleString('en-IN') : String(n)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animatable, reduced, inView, target, value, duration, grouped]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

export default Counter;
