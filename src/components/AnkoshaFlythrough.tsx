import { Component, Suspense, lazy, type ReactNode } from 'react';

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
  const backdrop = <Backdrop className={props.className} />;
  return (
    <SceneBoundary fallback={backdrop}>
      <Suspense fallback={backdrop}>
        <AnkoshaScene {...props} />
      </Suspense>
    </SceneBoundary>
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
