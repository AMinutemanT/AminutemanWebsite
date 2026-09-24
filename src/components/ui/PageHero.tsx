import { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Eyebrow } from './HUD';

/** Shared masthead, with documentary photography only when supplied. */

const LQIP: Record<string, string> = {
  battery:
    'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwAwCdASoUAA0APu1mqk4ppaOiMAgBMB2JZACdMoABX4NPrKUfgACmryZ087ZcyQZgvdY2g3hH+63K7uPCzTdLiRIDYTTIdljiP+MWnSRh/uFukHO/KgXMBWktzARortSIPfAyLlgAAA==',
  trial:
    'data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAABwBQCdASoUABsAPu1orE+ppaQiMBgIATAdiUAYmwG7Z6KKeOdmmR4CLt5OK8U9dtc3FAIgAP1uY42Ndw2HxfBb2PjJ67oWHpV+axBq2dO4/kLbhoQGS6WY/I6/N9QDaWTGgtTkkkJ4aMYMkqzOycp7ynsZeDwolpW21dn5xncM5eVReGZZZFqus24yC34z8XlBWQ2fLQgntQgLHy2szWDacYgI9KfX+VwAAA==',
  gunline:
    'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwBACdASoUAA0APu1iqU2ppaQiMAgBMB2JaACsH8ADA4MMkLTg6Eag/GAA/q72zxiS1Mltea/oV5s+VYfST/nNPo3vg/HO0m9nggffQvebCRvXcJYlKVygAAA=',
  altitude:
    'data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAACwBACdASoUABsAPu1iqE2ppaOiMAgBMB2JZwC7ACHGkoUZaPZoNDIM5y3xA2AAAP7nF2O8np00PdnFnNq6x2x6fp9tW6pGe89kmjsKm+Kgn2pfZjXG8yhskk84BBFDC27apTaq2LQvnpH7Pwlai8cKqAs4FBmVQXLu7WX4p/lO5AAA'
};

export type HeroImage = keyof typeof LQIP;

interface PageHeroProps {
  eyebrow?: string;
  /** Lighter upper line, matching the two-tone headings the sections use. */
  lead?: ReactNode;
  title: ReactNode;
  /** Terminating full stop in the accent colour. */
  stop?: boolean;
  lede?: ReactNode;
  meta?: ReactNode;
  /** Omit for the graphic treatment used where no honest photograph exists. */
  image?: HeroImage;
  /** Legacy content key; retained for existing page call sites. */
  seed?: string;
  /** object-position for the photograph. */
  focus?: string;
  /**
   * How much of the photograph to let through, 0-1. Bright, high-contrast
   * frames (a muzzle flash at dusk) want less; flat, overcast ones want more.
   */
  intensity?: number;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  lead,
  title,
  stop = false,
  lede,
  meta,
  image,
  focus = 'center',
  intensity = 0.62,
  children,
}: PageHeroProps) {
  // The diagonal scrim has to clear the display type; a brighter photograph
  // needs it to reach further across the frame.
  const reach = Math.round(46 + intensity * 42);
  return (
    <header className="page-masthead relative flex flex-col justify-end overflow-hidden border-b border-line pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="absolute inset-0">
        {image ? (
          <>
            {/* Blurred placeholder holds the frame so the masthead never
                flashes black while the photograph decodes. */}
            <img
              src={LQIP[image]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
              style={{ objectPosition: focus }}
            />
            <img
              src={`/images/hero/${image}.webp`}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
              className="absolute inset-0 h-full w-full object-cover saturate-[0.85] contrast-[1.08]"
              style={{ objectPosition: focus, opacity: intensity }}
            />
            {/* Scrim, weighted to the lower left where the type sits. */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/20" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(102deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.6) ${Math.round(reach * 0.45)}%, transparent ${reach}%)`,
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-abyss" />
        )}
      </div>

      <div className="container relative">
        {eyebrow && (
          <Reveal direction="none">
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-5xl">
            {lead && (
              <span className="display-lead-xl">
                {lead}
              </span>
            )}
            {/* Big Shoulders sits low in its line box, so at the masthead size
                the two lines read further apart than their boxes are. The pull
                closes that optically; the boxes themselves are already flush. */}
            <span className={`display-xl block text-white ${lead ? 'mt-2' : ''}`}>
              {title}
              {stop && <span className="text-accent">.</span>}
            </span>
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">{lede}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={0.2}>
            <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
              {meta}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}

export default PageHero;
