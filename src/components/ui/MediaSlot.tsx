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
  /** Designation printed inside the placeholder, e.g. "ANKOSHA-C / FLIGHT TEST". */
  label?: string;
  ratio?: MediaRatio;
  className?: string;
  /** Suggested drop path, printed in the placeholder so assets land in the right slot. */
  path?: string;
  priority?: boolean;
  /**
   * `contain` is for cut-out CAD renders, which carry their own transparency and
   * must not be cropped. `cover` stays the default for photography.
   */
  fit?: 'cover' | 'contain';
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
 * Every image on the site goes through this component.
 *
 * With no `src`/`video` it renders a labelled technical placeholder, a reticle,
 * the designation, the target aspect ratio and the file path the asset belongs at. * so the marketing team can see exactly what imagery is still outstanding and drop
 * files in without touching layout. It also covers the case where a supplied asset
 * fails to load.
 */
export function MediaSlot({
  src,
  video,
  poster,
  alt = '',
  caption,
  label = 'IMAGERY PENDING',
  ratio = '16/9',
  className = '',
  path,
  priority = false,
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
  // is actually approaching the viewport.
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
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  return (
    <figure className={className}>
              <div
          ref={frame}
          className={`relative overflow-hidden border border-line bg-abyss ${ratioClass[ratio]}`}
        >
          {/* Cut-out renders sit on the tactical grid rather than on flat black. */}
          {contain && hasAsset && (
            <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.14]" />
          )}
          {video && !failed ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={videoNear && !reduced ? video : undefined}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload={priority ? 'auto' : 'metadata'}
              poster={poster ?? src}
              onError={() => setFailed(true)}
            />
          ) : src && !failed ? (
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
          ) : (
            <Placeholder label={label} ratio={ratio} path={path} />
          )}

          {/* Constant HUD overlay, kept subtle so it reads on real photography too. */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                contain ? 'from-void/30' : 'from-void/70'
              } via-transparent to-transparent`}
            />
            {hasAsset && (
              <span className="absolute left-3 top-3 font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
                {label}
              </span>
            )}
          </div>
        </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Placeholder({
  label,
  ratio,
  path,
}: {
  label: string;
  ratio: MediaRatio;
  path?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-grid-fine bg-grid-fine">
      {/* Diagonal survey lines */}
      <svg
        className="absolute inset-0 h-full w-full text-white/[0.06]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.25" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.25" />
      </svg>

      {/* Reticle */}
      <svg
        className="relative h-14 w-14 text-accent/40"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <path d="M50 6v16M50 78v16M6 50h16M78 50h16" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative mt-4 px-4 text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-3">{label}</p>
        <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-white/20">
          asset slot · {ratio.replace('/', ':')}
        </p>
        {path && (
          <p className="mt-1 font-mono text-[0.6rem] tracking-wide text-accent/35">{path}</p>
        )}
      </div>
    </div>
  );
}

export default MediaSlot;
