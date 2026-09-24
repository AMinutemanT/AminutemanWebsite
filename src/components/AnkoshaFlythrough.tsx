import { Component, Suspense, lazy, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const AnkoshaScene = lazy(() =>
  import('./AnkoshaScene').then((m) => ({ default: m.AnkoshaScene })),
);

export interface AnkoshaFlythroughProps {
  className?: string;
  intensity?: number;
  axisX?: number;
  scale?: number;
}

/**
 * Catches a renderer that dies on us: a lost context, a driver that refuses to
 * create one, a chunk that fails to load. The hero is decoration, so it falls
 * back to the backdrop rather than taking the whole page down.
 */
class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Drop-in for the old canvas flythrough. The renderer is code-split, so the
 * hero paints immediately on the grid backdrop and the formation fades in once
 * three.js and the airframe LOD have arrived.
 */
export function AnkoshaFlythrough(props: AnkoshaFlythroughProps) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: '300px' });
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const backdrop = <Backdrop className="absolute inset-0" />;
  return (
    <div ref={ref} className={props.className}>
      {near ? (
        <SceneBoundary fallback={backdrop}>
          <Suspense fallback={backdrop}>
            <AnkoshaScene {...props} className="absolute inset-0" playing={visible && !paused} />
          </Suspense>
        </SceneBoundary>
      ) : backdrop}
      {near && !reduced && (
        <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}
          className="absolute right-3 top-3 z-10 min-h-11 border border-line-bright bg-void/90 px-3 font-mono text-xs text-ink-2 hover:text-white">
          {paused ? 'Play formation' : 'Pause formation'}
        </button>
      )}
    </div>
  );
}

function Backdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.12]" />
    </div>
  );
}

export default AnkoshaFlythrough;
