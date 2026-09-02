import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  CATEGORY_LABEL,
  programmePath,
  programmesIn,
  type Category,
} from '../data/programmes';
import { Stagger, StaggerItem } from '../components/ui/Reveal';
import { StatusTag, DomainChip } from '../components/ui/HUD';
import { PageHero, type HeroImage } from '../components/ui/PageHero';
import { useSeo } from '../utils/seo';
import { MediaSlot } from '../components/ui/MediaSlot';

const COPY: Record<
  Category,
  { title: string; lede: string; image?: HeroImage; focus?: string; intensity?: number }
> = {
  systems: {
    title: 'Systems',
    lede: 'Hardware programmes across air, air defence and space. Each one is a grid node before it is a platform.',
    image: 'battery',
    focus: '50% 46%',
    intensity: 0.72,
  },
  ai: {
    title: 'AI',
    lede: 'Deployable products that run on the Valley grid, the sovereign foundation model that reasons for them, and the validated models and secured links that qualify everything we build.',
  },
  platform: {
    title: 'Platform',
    lede: 'Valley.',
  },
};

export function CategoryIndex({ category }: { category: Category }) {
  const programmes = programmesIn(category);
  const copy = COPY[category];

  useSeo({
    title: copy.title,
    path: `/${category}`,
    description: copy.lede,
    image: copy.image ? `/images/hero/${copy.image}.webp` : undefined,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: CATEGORY_LABEL[category], path: `/${category}` },
    ],
  });

  return (
    <div className="bg-void">
      <PageHero
        eyebrow={`${CATEGORY_LABEL[category]} index`}
        title={copy.title}
        lede={copy.lede}
        meta={`${programmes.length} programmes`}
        image={copy.image}
        focus={copy.focus}
        intensity={copy.intensity}
        seed={copy.title}
      />

      {/* ---- Index -------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <Stagger className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <StaggerItem key={programme.slug} className="bg-void">
                <Link
                  to={programmePath(programme.slug)}
                  className="group flex h-full flex-col bg-panel/30 transition-colors duration-300 hover:bg-panel"
                >
                  {programme.hero.src && (
                    <MediaSlot
                      label={programme.designation}
                      src={programme.hero.src}
                      alt={programme.name}
                      ratio="3/2"
                    />
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
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

            {/* Squares off the last row, and gives the index somewhere to go. */}
            <StaggerItem className="bg-void">
              <Link
                to="/contact"
                className="group flex h-full flex-col justify-between bg-panel/20 p-7 transition-colors duration-300 hover:bg-panel"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                  Enquiries
                </span>
                <span className="mt-10 inline-flex items-center gap-2 font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors group-hover:text-accent">
                  Talk to us
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </div>
  );
}

export default CategoryIndex;
