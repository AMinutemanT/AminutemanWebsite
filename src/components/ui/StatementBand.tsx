import { ReactNode } from 'react';
import { Reveal } from './Reveal';

/* ---------------------------------------------------------------------------
 * STATEMENT BAND
 *
 * A full-bleed photograph carrying a single line. It breaks a long page of
 * dark sections and puts real hardware in front of the reader between blocks
 * of argument.
 *
 * The photograph is always a real one from a range or a gun line. The scrim is
 * heavier than the mastheads' because the line sits centred over the middle of
 * the frame rather than off to one side.
 * ------------------------------------------------------------------------- */

export function StatementBand({
  image,
  statement,
  attribution,
  focus = 'center',
  intensity = 0.55,
}: {
  /** File in /images/hero, without extension. */
  image: string;
  statement: ReactNode;
  /** Small line under the statement, for context or a credit. */
  attribution?: string;
  focus?: string;
  intensity?: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <img
          src={`/images/hero/${image}.webp`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover saturate-[0.8] contrast-[1.06]"
          style={{ objectPosition: focus, opacity: intensity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/20 to-void" />
        {/* A soft pad directly behind the line, so the type holds its contrast
            without flattening the whole photograph. */}
        <div className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(0,0,0,0.72),transparent_75%)]" />
      </div>

      <div className="container relative py-24 sm:py-32 lg:py-40">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {statement}
          </p>
        </Reveal>
        {attribution && (
          <Reveal delay={0.08}>
            <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-[0.65rem] uppercase tracking-widest text-ink-3">
              {attribution}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default StatementBand;
