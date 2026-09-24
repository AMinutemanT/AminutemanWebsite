import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Programme } from '../data/programmes';
import { CATEGORY_LABEL, programmePath, PROGRAMME_BY_SLUG } from '../data/programmes';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { Eyebrow, SectionHeading, StatusTag } from './ui/HUD';
import { MediaSlot } from './ui/MediaSlot';
import { LazyModelViewer } from './LazyModelViewer';
import { SpecTable } from './ui/SpecTable';

export function ProgrammeDetail({ programme }: { programme: Programme }) {
  const related = programme.related
    .map((slug) => (slug === 'valley' ? null : PROGRAMME_BY_SLUG[slug]))
    .filter((p): p is Programme => Boolean(p));

  const wantsValley = programme.related.includes('valley');

  // Variants, the model and the gallery are optional per programme, so the
  // ordinal each numbered section carries has to follow what actually
  // renders, not a fixed per-section number. A hardcoded "01".."05" jumps
  // straight from "01" to "04" whenever a programme lacks the sections in
  // between, which reads as a broken counter rather than restraint.
  const hasVariants = Boolean(programme.variants && programme.variants.length > 0);
  const hasModel = Boolean(programme.model);
  const hasGallery = Boolean(programme.gallery && programme.gallery.length > 0);
  const hasRelated = related.length > 0 || wantsValley;

  let ordinal = 0;
  const nextIndex = () => String(++ordinal).padStart(2, '0');
  const capabilitiesIndex = nextIndex();
  const variantsIndex = hasVariants ? nextIndex() : undefined;
  const modelIndex = hasModel ? nextIndex() : undefined;
  const galleryIndex = hasGallery ? nextIndex() : undefined;
  const relatedIndex = hasRelated ? nextIndex() : undefined;

  return (
    <article className="bg-void">
      <ProgrammeHero programme={programme} />

      {/* ---- Overview ---------------------------------------------------- */}
      <section className="section border-t border-line">
        <div className="container">
          {/* The designation, category, status and domain already appear in the
              masthead. On the software programmes that repeat read as filler, so
              those pages drop the panel and set the overview to a single measure
              instead, the way the specification section does. */}
          {programme.category === 'ai' ? (
            <>
              <Reveal>
                <Eyebrow>Overview</Eyebrow>
              </Reveal>
              <Reveal>
                <h2 className="display-md mt-8 max-w-4xl text-white">
                  {programme.overview.heading}
                </h2>
              </Reveal>
              <div className="mt-8 max-w-3xl space-y-6">
                {programme.overview.body.map((para, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="body-copy text-base sm:text-lg">{para}</p>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow>Overview</Eyebrow>
                  <dl className="mt-8 space-y-px border border-line bg-line">
                    <Detail term="Designation" value={programme.designation} />
                    <Detail term="Category" value={CATEGORY_LABEL[programme.category]} />
                    <Detail term="Status" value={programme.status} />
                    <Detail term="Domain" value={programme.domain.join(' · ')} />
                  </dl>
                </div>
              </div>

              <div className="lg:col-span-8">
                <Reveal>
                  <h2 className="display-md text-white">{programme.overview.heading}</h2>
                </Reveal>
                <div className="mt-8 space-y-6">
                  {programme.overview.body.map((para, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <p className="body-copy text-base sm:text-lg">{para}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---- Specifications ---------------------------------------------- */}
      <section id="specifications" className="section border-t border-line">
        <div className="container">
          <Reveal>
            <Eyebrow>Specification</Eyebrow>
          </Reveal>
          <div className="mt-10">
            <SpecTable specs={programme.specs} />
          </div>
        </div>
      </section>


      {/* ---- Capabilities ------------------------------------------------ */}
      <section className="section border-t border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index={capabilitiesIndex}
              eyebrow="Capabilities · The role"
              lead="What it"
              title="does"
              stop
              lede={`Published capabilities for ${programme.designation}.`}
            />
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {programme.capabilities.map((cap, i) => (
              <StaggerItem key={cap.title}>
                <div className="border-t border-line py-6 pr-4">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-sans font-medium text-xl tracking-tight text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{cap.body}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Variants ---------------------------------------------------- */}
      {programme.variants && programme.variants.length > 0 && (
        <section className="section border-t border-line">
          <div className="container">
            <Reveal>
              <SectionHeading
                index={variantsIndex}
                eyebrow="Configuration · Variants"
                lead="The"
                title="family"
                stop
                lede="Common architecture, differentiated by the fight each element is sized for."
              />
            </Reveal>

            <div className="mt-14 border-t border-line">
              {programme.variants.map((variant, i) => (
                <Reveal key={variant.designation} delay={i * 0.05}>
                  <div className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-1">
                      <span className="font-mono text-xs text-ink-dim">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-sans font-medium text-2xl leading-snug tracking-tight text-white transition-colors group-hover:text-accent">
                        {variant.designation}
                      </h3>
                      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
                        {variant.name}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-sm text-white/70">{variant.role}</p>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-sm leading-relaxed text-ink-3">{variant.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Live CAD ----------------------------------------------------- */}
      {programme.model && (
        <section className="section border-t border-line">
          <div className="container">
            <Reveal>
              <SectionHeading
                index={modelIndex}
                eyebrow="Geometry · Live model"
                lead="The actual"
                title="assembly"
                stop
                lede="Explore the programme CAD model. Drag to rotate, or use the controls below."
              />
            </Reveal>
            <Reveal delay={0.1} className="mt-14">
              <LazyModelViewer
                src={programme.model.src}
                label={programme.model.label}
                caption={programme.model.caption}
                readouts={programme.model.readouts}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- Gallery ----------------------------------------------------- */}
      {programme.gallery && programme.gallery.length > 0 && (
        <section className="section border-t border-line">
          <div className="container">
            <Reveal>
              <SectionHeading
                index={galleryIndex}
                eyebrow="Imagery · The record"
                lead="Programme"
                title="record"
                stop
              />
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programme.gallery.map((item, i) => (
                <Reveal key={item.path} delay={i * 0.07}>
                  <MediaSlot
                    label={item.label}
                    caption={item.caption}
                    src={item.src}
                    video={item.video}
                    ratio={item.ratio ?? '4/5'}
                    fit={item.fit}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Valley integration ------------------------------------------ */}
      {programme.integration && (
        <section className="border-y border-line bg-panel/30">
          <div className="container py-20 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Eyebrow>On the grid</Eyebrow>
                <p className="mt-6 font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">
                  Valley
                </p>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                  {programme.integration}
                </p>
                <Link
                  to="/valley"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
                >
                  Understand the platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---- Related ------------------------------------------------------ */}
      {(related.length > 0 || wantsValley) && (
        <section className="section">
          <div className="container">
            <Reveal>
              <SectionHeading
                eyebrow="Adjacent · Nearby work"
                index={relatedIndex}
                lead="Related"
                title="programmes"
                stop
              />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {wantsValley && (
                <RelatedCard
                  to="/valley"
                  designation="VALLEY"
                  name="The Unified Grid"
                  tagline="Every sensor, every effector, one picture"
                />
              )}
              {related.map((item) => (
                <RelatedCard
                  key={item.slug}
                  to={programmePath(item.slug)}
                  designation={item.designation}
                  name={item.name}
                  tagline={item.tagline}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <ProgrammeCTA designation={programme.designation} />
    </article>
  );
}

/* -- Hero ------------------------------------------------------------------ */

function ProgrammeHero({ programme }: { programme: Programme }) {
  return (
    <header className="border-b border-line bg-abyss pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="container">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
          <Link to="/" className="hover:text-white">Home</Link><span>/</span>
          <Link to={`/${programme.category}`} className="hover:text-white">{CATEGORY_LABEL[programme.category]}</Link><span>/</span>
          <span className="text-ink-1">{programme.designation}</span>
        </nav>
        <div className={`mt-10 grid items-center gap-10 ${programme.hero.src ? 'lg:grid-cols-2 lg:gap-16' : ''}`}>
          <div>
            <p className="eyebrow">{programme.designation}</p>
            <h1 className="display-xl mt-4 max-w-4xl text-white">{programme.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{programme.tagline}</p>
            <a href="#specifications" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:text-white">View specifications <ArrowRight className="h-4 w-4" /></a>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <StatusTag status={programme.status} />
              <span className="text-xs text-ink-3">{programme.domain.join(' / ')}</span>
            </div>
          </div>
          {programme.hero.src && <MediaSlot src={programme.hero.src} alt={programme.name} label={programme.designation} fit={programme.hero.fit} ratio="4/3" priority sizes="(min-width: 1025px) 45vw, 100vw" />}
        </div>
      </div>
    </header>
  );
}

/* -- Pieces ---------------------------------------------------------------- */

function Detail({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 bg-panel/50 px-4 py-3">
      <dt className="data-label">{term}</dt>
      <dd className="text-right font-mono text-xs uppercase tracking-wider text-white/80">
        {value}
      </dd>
    </div>
  );
}

function RelatedCard({
  to,
  designation,
  name,
  tagline,
}: {
  to: string;
  designation: string;
  name: string;
  tagline: string;
}) {
  return (
    <Link to={to} className="card group p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
          {designation}
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="mt-4 font-sans font-medium text-xl leading-tight tracking-tight text-white">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-3">{tagline}</p>
    </Link>
  );
}

function ProgrammeCTA({ designation }: { designation: string }) {
  return (
    <section className="border-t border-line">
      <div className="container py-20 sm:py-28">
                  <div className="border border-line bg-panel/40 p-8 sm:p-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-8">
                <p className="eyebrow">Programme enquiries</p>
                <h2 className="display-md mt-5 text-white">
                  Request a briefing on {designation}
                </h2>
                <p className="body-copy mt-5 max-w-2xl">
                  Detailed performance data, integration documentation and trial results are
                  released to qualified government and industry counterparties following end-user
                  certification.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link to="/contact" className="btn-primary w-full justify-center lg:w-auto">
                  Contact programme office
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/valley/partner-program" className="btn-secondary w-full justify-center lg:w-auto">
                  Partner integration
                </Link>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

export default ProgrammeDetail;
