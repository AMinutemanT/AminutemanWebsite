import { useEffect } from 'react';

/**
 * Installs the one pointer listener that drives every card spotlight on the
 * page. Mounted once, at the root.
 *
 * Delegating beats a handler per card on both counts that matter here: a grid
 * of twenty cards costs one listener rather than twenty, and any element that
 * takes the `.card` class is lit without having to be rendered through
 * SpotlightCard. Updates are coalesced into a single rAF, and nothing is
 * written unless the pointer is actually over a card, so scrolling a page of
 * them does no work at all.
 */
export function useCardSpotlight() {
  useEffect(() => {
    // No cursor to follow on a touch screen, and no hover state to pair it with.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { card, x, y } = pending;
      pending = null;
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${x - box.left}px`);
      card.style.setProperty('--my', `${y - box.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const card = (e.target as Element | null)?.closest?.('.card');
      if (!card) return;
      pending = { card: card as HTMLElement, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
