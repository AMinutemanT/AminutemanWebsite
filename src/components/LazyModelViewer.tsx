import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import type { ModelViewerProps } from './ModelViewer';


const ModelViewer = lazy(() =>
  import('./ModelViewer').then((m) => ({ default: m.ModelViewer })),
);

/**
 * Defers the three.js bundle until the viewer is actually scrolled near.
 * Pages that never reach a model never pay for the renderer.
 */
export function LazyModelViewer(props: ModelViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const height = props.height ?? 'h-[380px] sm:h-[520px] lg:h-[600px]';

  return (
    <div ref={ref}>
      {near ? (
        <Suspense fallback={<Placeholder label={props.label} height={height} />}>
          <ModelViewer {...props} />
        </Suspense>
      ) : (
        <Placeholder label={props.label} height={height} />
      )}
    </div>
  );
}

function Placeholder({ label, height }: { label: string; height: string }) {
  return (
          <div className={`relative overflow-hidden border border-line bg-abyss ${height}`}>
        <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.14]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
            {label}
          </p>
        </div>
      </div>
  );
}

export default LazyModelViewer;
