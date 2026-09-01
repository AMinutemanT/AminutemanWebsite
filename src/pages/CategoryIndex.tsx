import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  CATEGORY_LABEL,
  programmePath,
  programmesIn,
  type Category,
} from '../data/programmes';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { Eyebrow, StatusTag, DomainChip } from '../components/ui/HUD';
import { MediaSlot } from '../components/ui/MediaSlot';

const COPY: Record<Category, { title: string; lede: string }> = {
  systems: {
    title: 'Systems',
    lede: 'Hardware programmes across air, air defence and space. Each one is a grid node before it is a platform.',
  },
  ai: {
    title: 'AI',
    lede: 'See, strike, shield, and the intelligence underneath. Deployable products that run on the Valley grid, the sovereign foundation model that reasons for them, and the validated models and secured links that qualify everything we build.',
  },
  platform: {
    title: 'Platform',
    lede: 'Valley.',
  },
};

export function CategoryIndex({ category }: { category: Category }) {
  const programmes = programmesIn(category);
  const copy = COPY[category];

  useEffect(() => {
    const previous = document.title;
    document.title = `${copy.title}, Aminuteman Technologies`;
    return () => {
      document.title = previous;
    };
  }, [copy.title]);

  return (
    <div className="bg-void">
      {/* ---- Header ------------------------------------------------------- */}
      <header className="relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void" />
        <div className="container relative">
          <Reveal direction="none">
            <Eyebrow>{CATEGORY_LABEL[category]} index</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-6 text-white">{copy.title}</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              {copy.lede}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
              {programmes.length} programmes listed · restricted parameters withheld
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- Index -------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <StaggerItem key={programme.slug}>
                <Link
                  to={programmePath(programme.slug)}
                  className="group flex h-full flex-col border border-line bg-panel/30 transition-colors duration-300 hover:border-accent/40 hover:bg-panel/60"
                >
                  <MediaSlot
                    label={programme.designation}
                    path={programme.hero.path}
                    src={programme.hero.src}
                    ratio="3/2"
                  />

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/60">
                        {programme.designation}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>

                    <h2 className="mt-4 font-display text-2xl uppercase leading-none tracking-wide text-white">
                      {programme.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-3">
                      {programme.summary}
                    </p>

                    <div className="mt-auto pt-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusTag status={programme.status} />
                        {programme.domain.slice(0, 2).map((d) => (
                          <DomainChip key={d} label={d} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}

export default CategoryIndex;
