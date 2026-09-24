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
import { FleetCard } from '../components/ui/FleetCard';

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
        eyebrow={`${CATEGORY_LABEL[category]} · Index`}
        title={copy.title}
        stop
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
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <StaggerItem key={programme.slug}>
                <FleetCard
                  to={programmePath(programme.slug)}
                  designation={programme.designation}
                  name={programme.name}
                  blurb={programme.summary}
                  src={programme.hero.src}
                  fit={programme.hero.fit}
                  meta={
                    <>
                      <StatusTag status={programme.status} />
                      {programme.domain.slice(0, 2).map((d) => (
                        <DomainChip key={d} label={d} />
                      ))}
                    </>
                  }
                />
              </StaggerItem>
            ))}

            {/* Squares off the last row, and gives the index somewhere to go. */}
            <StaggerItem>
              <Link
                to="/contact"
                className="card group justify-between p-7"
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
