import { ContourField } from './ContourField';

/**
 * The masthead backdrop for pages with no honest photograph behind them: a
 * relief field seeded off the page, over a low accent wash. Matches the
 * treatment PageHero uses in graphic mode, so every such page reads the same.
 */
export function GraphicBackdrop({ seed }: { seed: string }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,rgba(255,138,0,0.15),transparent_62%)]" />
      <ContourField seed={seed} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.07]" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
    </div>
  );
}

export default GraphicBackdrop;
