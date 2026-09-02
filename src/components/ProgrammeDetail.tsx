import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Programme } from '../data/programmes';
import { CATEGORY_LABEL, programmePath, PROGRAMME_BY_SLUG } from '../data/programmes';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { Eyebrow, SectionHeading, StatusTag, DomainChip } from './ui/HUD';
import { MediaSlot } from './ui/MediaSlot';
import { LazyModelViewer } from './LazyModelViewer';
import { SpecTable } from './ui/SpecTable';

export function ProgrammeDetail({ programme }: { programme: Programme }) {
  const related = programme.related
    .map((slug) => (slug === 'valley' ? null : PROGRAMME_BY_SLUG[slug]))
    .filter((p): p is Programme => Boolean(p));

  const wantsValley = programme.related.includes('valley');

  return (
    <article className="bg-void">
      <ProgrammeHero programme={programme} />

      {/* ---- Overview ---------------------------------------------------- */}
      <section className="section border-t border-line">
        <div className="container">
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
        </div>
      </section>

      {/* ---- Capabilities ------------------------------------------------ */}
      <section className="section border-t border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What it does"
              lede={`Capability set for ${programme.designation}, stated at the level we are prepared to publish.`}
            />
          </Reveal>

          <Stagger className="mt-14 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {programme.capabilities.map((cap, i) => (
              <StaggerItem key={cap.title} className="bg-void">
                <div className="group relative h-full bg-panel/40 p-8 transition-colors duration-300 hover:bg-panel">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-white">
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
                eyebrow="Configuration"
                title="The family"
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
                      <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors group-hover:text-accent">
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
                eyebrow="Geometry"
                title="The actual assembly"
                lede="The engineering CAD assembly the airframe is built from, tessellated and served to the browser. Drag it."
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
              <SectionHeading eyebrow="Imagery" title="Programme record" />
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

      {/* ---- Specifications ---------------------------------------------- */}
      <section className="section border-t border-line">
        <div className="container">
          <Reveal>
            <Eyebrow>Specification</Eyebrow>
          </Reveal>
          <div className="mt-10">
            <SpecTable specs={programme.specs} />
          </div>
        </div>
      </section>

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
              <SectionHeading eyebrow="Adjacent" title="Related programmes" />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
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
    <header className="relative flex min-h-[78vh] items-end overflow-hidden border-b border-line pt-32 sm:min-h-[88vh]">
      {/* Backdrop: real imagery when supplied, technical placeholder otherwise.
          Cut-out CAD renders float over the plate rather than filling it. */}
      <div className="absolute inset-0">
        {programme.hero.src && programme.hero.fit === 'contain' ? (
          <>
            <HeroPlaceholder designation={programme.designation} />
            <img
              src={programme.hero.src}
              alt={programme.name}
              loading="eager"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
              className="absolute inset-0 h-full w-full object-contain p-8 pb-40 sm:p-16 sm:pb-56 lg:pb-64"
            />
          </>
        ) : programme.hero.src ? (
          <img
            src={programme.hero.src}
            alt={programme.name}
            loading="eager"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            className="h-full w-full object-cover"
          />
        ) : (
          <HeroPlaceholder designation={programme.designation} path={programme.hero.path} />
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            programme.hero.fit === 'contain'
              ? 'from-void via-void/45 to-transparent'
              : 'from-void via-void/70 to-void/30'
          }`}
        />
      </div>

      <div className="container relative z-10 pb-16 sm:pb-20">
        <Reveal direction="none">
          <nav className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link
              to={`/${programme.category}`}
              className="transition-colors hover:text-white"
            >
              {CATEGORY_LABEL[programme.category]}
            </Link>
            <span>/</span>
            <span className="text-accent">{programme.designation}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 font-mono text-xs uppercase tracking-ultra text-accent-soft/80">
            {programme.designation}
          </p>
          <h1 className="display-xl mt-4 max-w-5xl text-white">{programme.name}</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/65 sm:text-xl">{programme.tagline}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusTag status={programme.status} />
            {programme.domain.map((d) => (
              <DomainChip key={d} label={d} />
            ))}
          </div>
        </Reveal>
      </div>
    </header>
  );
}

function HeroPlaceholder({ designation, path }: { designation: string; path?: string }) {
  return (
    <div className="relative h-full w-full bg-abyss">
      <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.18]" />
      <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.2]" />
      {/* Ghosted designation, reads as a plate stamp behind the content. */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="select-none whitespace-nowrap font-display text-[22vw] font-semibold uppercase leading-none tracking-tighter text-white/[0.035]">
          {designation}
        </span>
      </div>
      {path && (
        <div className="absolute right-6 top-28 hidden text-right sm:block">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
            hero imagery pending
          </p>
          <p className="font-mono text-[0.6rem] tracking-wide text-accent/30">{path}</p>
        </div>
      )}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </div>
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
    <Link to={to} className="group block bg-panel/40 p-7 transition-colors hover:bg-panel">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/60">
          {designation}
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide text-white">
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
