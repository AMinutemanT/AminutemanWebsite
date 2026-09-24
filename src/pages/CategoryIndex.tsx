import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  CATEGORY_LABEL,
  programmePath,
  programmesIn,
  type Category,
} from '../data/programmes';
import { StatusTag } from '../components/ui/HUD';
import { PageHero, type HeroImage } from '../components/ui/PageHero';
import { useSeo } from '../utils/seo';
import { MediaSlot } from '../components/ui/MediaSlot';

const COPY: Record<
  Category,
  { title: string; lede: string; image?: HeroImage; focus?: string; intensity?: number }
> = {
  systems: {
    title: 'Systems',
    lede: 'Air systems, counter-UAS, existing-platform integration and space programmes. Explore their current development status and published specifications.',
    image: 'battery',
    focus: '50% 46%',
    intensity: 0.72,
  },
  ai: {
    title: 'AI',
    lede: 'Autonomy, mission software, digital twins and quantum technologies. Explore each programme and its current development status.',
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
          <div className="border-t border-line">
            {programmes.map((programme) => (
              <article key={programme.slug} className={`grid gap-6 border-b border-line py-8 sm:py-10 ${programme.hero.src ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]' : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'} md:gap-12`}>
                {programme.hero.src ? (
                  <Link to={programmePath(programme.slug)} aria-label={`Explore ${programme.name}`}>
                    <MediaSlot src={programme.hero.src} alt={programme.name} fit={programme.hero.fit} ratio="3/2" sizes="(min-width: 769px) 30vw, 100vw" />
                  </Link>
                ) : (
                  <div><p className="eyebrow">{programme.designation}</p><div className="mt-4"><StatusTag status={programme.status} /></div></div>
                )}
                <div className="self-center">
                  {programme.hero.src && <StatusTag status={programme.status} />}
                  <h2 className="mt-4 font-sans text-2xl font-medium tracking-tight sm:text-3xl">
                    <Link to={programmePath(programme.slug)} className="hover:text-accent">{programme.name}</Link>
                  </h2>
                  <p className="body-copy mt-4 max-w-2xl text-base">{programme.summary}</p>
                  <Link to={programmePath(programme.slug)} className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm text-accent hover:text-white">Programme details <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-3">For technical information or an integration enquiry.</p>
            <Link to="/contact" className="inline-flex min-h-11 items-center gap-3 text-sm text-accent hover:text-white">Contact the team <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CategoryIndex;
