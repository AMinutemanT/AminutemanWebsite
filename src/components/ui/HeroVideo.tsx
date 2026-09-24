import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface HeroVideoProps {
  sources: { src: string; type: string }[];
  poster: string;
  className?: string;
  paused?: boolean;
}

/** A lightweight film with a still fallback when playback is unavailable. */
export function HeroVideo({ sources, poster, className = '', paused = false }: HeroVideoProps) {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || failed || reduced) return;
    let visible = true;
    const update = () => {
      if (paused || document.hidden || !visible) element.pause();
      else element.play().catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) setFailed(true);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    update();
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [paused, reduced, failed]);

  return (
    <div className={className} aria-hidden="true">
      {reduced || failed ? (
        <img src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        >
          {sources.map((source) => <source key={source.src} {...source} />)}
        </video>
      )}
    </div>
  );
}

export default HeroVideo;
