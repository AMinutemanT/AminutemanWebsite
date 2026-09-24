import { ArrowUpRight } from 'lucide-react';
import type { PressStory } from '../../data/company';

/* ---------------------------------------------------------------------------
 * PRESS STRIP
 *
 * One block per story, with the outlets that carried it listed underneath as
 * links.
 *
 * The reference site runs three press cards side by side, one per publication.
 * That shape is not honest here: our coverage to date is a single syndicated
 * piece that six outlets ran on the same day, and splitting it into six cards
 * would present one story as six. The story is the unit; the outlets are its
 * evidence. This mirrors the decision already recorded against PRESS in
 * src/data/company.ts.
 * ------------------------------------------------------------------------- */

export function PressStrip({ stories }: { stories: PressStory[] }) {
  return (
    <div className="grid gap-px bg-line">
      {stories.map((story) => (
        <article key={story.headline} className="bg-panel/30 p-8 sm:p-10">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
            Press · {story.date}
          </p>

          <h3 className="mt-5 max-w-3xl font-display text-2xl uppercase leading-tight tracking-wide text-white sm:text-3xl">
            {story.headline}
          </h3>

          <p className="mt-6 data-label text-ink-dim">
            Carried by {story.outlets.length} outlets
          </p>

          {/* Bordered chips rather than a hairline grid: a wrapping flex row
              cannot fill its last line, and a gap-px grid would show the
              remainder as a stray filled block. */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {story.outlets.map((outlet) => (
              <li key={outlet.href}>
                <a
                  href={outlet.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-line-bright px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-widest text-ink-2 transition-colors hover:border-accent/50 hover:bg-accent/[0.07] hover:text-accent"
                >
                  {outlet.outlet}
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default PressStrip;
