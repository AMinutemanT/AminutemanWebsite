import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MediaSlot, type MediaRatio } from './MediaSlot';
import { SpotlightCard } from './SpotlightCard';

/* ---------------------------------------------------------------------------
 * FLEET CARD
 *
 * The card used wherever a programme is shown with its hardware: the fleet grid
 * on the home page, and the systems and AI indexes.
 *
 * The frame is a MediaSlot, so ratios, the webp srcset and the missing-asset
 * placeholder behave the same as everywhere else on the site. The shared
 * spotlight shell provides the same interaction feedback as other linked cards.
 * ------------------------------------------------------------------------- */

export interface FleetCardProps {
  to: string;
  /** Programme code, shown small above the name. */
  designation: string;
  name: string;
  blurb: string;
  src?: string;
  video?: string;
  poster?: string;
  ratio?: MediaRatio;
  /** `contain` for cut-out CAD renders, which must not be cropped. */
  fit?: 'cover' | 'contain';
  /** Trailing label, e.g. "In trials". Defaults to the designation. */
  kicker?: string;
  cta?: string;
  /** Replaces the trailing kicker line — status tags, domain chips and the like. */
  meta?: ReactNode;
  className?: string;
  sizes?: string;
}

export function FleetCard({
  to,
  designation,
  name,
  blurb,
  src,
  video,
  poster,
  ratio = '3/2',
  fit = 'cover',
  kicker,
  cta = 'Explore',
  meta,
  className = '',
  sizes,
}: FleetCardProps) {
  return (
    <SpotlightCard to={to} className={className}>
      <div className="relative overflow-hidden">
        {/* The zoom is put on the image rather than the figure: MediaSlot's
            frame carries the hairline border and its own overflow clip, so
            scaling the figure would crop the border with the photograph. */}
        <div className="[&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-out group-hover:[&_img]:scale-[1.06]">
          <MediaSlot
            label={designation}
            src={src}
            video={video}
            poster={poster}
            alt={name}
            ratio={ratio}
            fit={fit}
            sizes={sizes}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
            {designation}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <h3 className="mt-4 font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors duration-300 group-hover:text-accent-soft">
          {name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-3">{blurb}</p>

        {meta ? (
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">{meta}</div>
        ) : (
          <span className="mt-auto pt-7 font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim transition-colors duration-300 group-hover:text-accent">
            {kicker ?? designation} · {cta} →
          </span>
        )}
      </div>
    </SpotlightCard>
  );
}

export default FleetCard;
