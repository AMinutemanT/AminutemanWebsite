import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';


export type MediaRatio = '16/9' | '4/3' | '3/2' | '1/1' | '4/5' | '21/9' | '9/16';

export interface MediaSlotProps {
  /** Drop a real asset in here and the placeholder disappears. */
  src?: string;
  /** Video source. Takes precedence over `src` when present. */
  video?: string;
  poster?: string;
  alt?: string;
  /** Short caption shown under the frame. */
  caption?: string;
  /** Designation used for the alt text, and shown while an asset is missing. */
  label?: string;
  ratio?: MediaRatio;
  className?: string;
  priority?: boolean;
  /**
   * Layout hint for the browser's srcset pick. The default assumes the
   * three-up card grids most of the site uses.
   */
  sizes?: string;
  /**
   * `contain` is for cut-out CAD renders, which carry their own transparency and
   * must not be cropped. `cover` stays the default for photography.
   */
  fit?: 'cover' | 'contain';
}

/**
 * Every photograph is built out as webp at 500w, 1000w and full width, at
 * roughly half the bytes of the original. Serve the set and keep the original
 * as the fallback for anything that cannot decode webp.
 *
 * A card renders around 440px wide, so without the srcset a grid of them pulls
 * full-width photographs it will never show at full width.
 */
const RASTER = /\.(jpe?g|png)$/i;

function webpSet(src: string): { srcSet: string; full: string } | null {
  if (!RASTER.test(src)) return null;
  const stem = src.replace(RASTER, '');
  return {
    srcSet: `${stem}-500.webp 500w, ${stem}-1000.webp 1000w, ${stem}.webp 1400w`,
    full: `${stem}.webp`,
  };
}

const ratioClass: Record<MediaRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '4/5': 'aspect-[4/5]',
  '21/9': 'aspect-[21/9]',
  '9/16': 'aspect-[9/16]',
};

/**
 * Every image and clip on the site goes through this component, so ratios and
 * loading behaviour stay consistent between grids.
 *
 * With no `src`/`video` it holds the frame with a quiet panel carrying the
 * designation, which is also what a supplied asset falls back to if it fails
 * to load.
 */
export function MediaSlot({
  src,
  video,
  poster,
  alt = '',
  caption,
  label = 'Imagery pending',
  ratio = '16/9',
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  fit = 'cover',
}: MediaSlotProps) {
  const [failed, setFailed] = useState(false);
  const hasAsset = Boolean(video || src) && !failed;
  const contain = fit === 'contain';
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const [videoNear, setVideoNear] = useState(false);

  // Trial footage runs to a couple of megabytes a clip, and an autoplaying
  // <video> fetches the moment it mounts. Hold the source back until the frame
  // is actually approaching the viewport, so the poster is all that loads above
  // the fold.
  useEffect(() => {
    if (!video) return;
    const el = frame.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVideoNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVideoNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  const posterSrc = poster ?? src;
  // Reduced-motion viewers still get the clip, they just get it paused with
  // controls instead of looping at them.
  const loadVideo = Boolean(video) && videoNear;

  return (
    <figure className={className}>
      <div
        ref={frame}
        className={`relative overflow-hidden border border-line bg-abyss ${ratioClass[ratio]}`}
      >
        {video && !failed ? (
          <>
            {/* Poster stays painted underneath so the frame is never empty
                while the clip is still arriving. */}
            {posterSrc && (
              <picture>
                {webpSet(posterSrc) && (
                  <source srcSet={webpSet(posterSrc)!.srcSet} sizes={sizes} type="image/webp" />
                )}
                <img
                  src={posterSrc}
                  alt={alt || label}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            )}
            {loadVideo && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={video}
                autoPlay={!reduced}
                controls={reduced === true}
                muted
                loop
                playsInline
                preload="auto"
                poster={posterSrc}
                onError={() => setFailed(true)}
              />
            )}
          </>
        ) : src && !failed ? (
          <picture>
            {webpSet(src) && (
              <source srcSet={webpSet(src)!.srcSet} sizes={sizes} type="image/webp" />
            )}
            <img
              src={src}
              alt={alt || label}
              loading={priority ? 'eager' : 'lazy'}
              decoding={priority ? 'sync' : 'async'}
              // React 18 forwards only the lowercase DOM attribute; the camelCase
              // prop is React 19 and warns here.
              {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
              className={
                contain
                  ? 'absolute inset-0 h-full w-full object-contain p-6 sm:p-8'
                  : 'absolute inset-0 h-full w-full object-cover'
              }
              onError={() => setFailed(true)}
            />
          </picture>
        ) : (
          <Placeholder label={label} />
        )}

        {/* A single soft foot on photography, so captions and card text below
            the frame keep their contrast. Cut-out renders are left alone. */}
        {hasAsset && !contain && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/60 to-transparent" />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-ink-dim">{caption}</figcaption>
      )}
    </figure>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-end bg-panel/40 p-5">
      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">{label}</p>
    </div>
  );
}

export default MediaSlot;
