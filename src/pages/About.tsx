import { Link } from 'react-router-dom';
import { useSeo } from '../utils/seo';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { Eyebrow, SectionHeading } from '../components/ui/HUD';
import { MediaSlot } from '../components/ui/MediaSlot';
import { PageHero } from '../components/ui/PageHero';
import { PROGRAMMES, programmePath } from '../data/programmes';
import {
  DOMESTIC_PARTNERS,
  EXHIBITIONS,
  PRESS,
  FACILITY,
  FIELD,
  INTERNATIONAL_PARTNERS,
  OFFICES,
} from '../data/company';

/* ---------------------------------------------------------------------------
 * Company page. Mandate first, record second, people last, which is the order
 * a programme office reads in.
 *
 * NOTE: a leadership section beyond the founder is deliberately not rendered.
 * The photographs currently in src/images are informal snapshots with no
 * recorded names or titles. Add proper headshots plus names here when they
 * exist rather than shipping placeholders.
 * ------------------------------------------------------------------------- */

const PRINCIPLES = [
  {
    title: 'Build it here',
    body: 'Nothing here was chosen because it was novel. It was chosen because the alternative arrived with a licence attached, or did not arrive at all. Sovereignty is decided in a supply chain long before it is debated as policy.',
  },
  {
    title: 'A human commits',
    body: 'A machine may propose; a human commits. Engagement authority is enforced in the software rather than asserted in a briefing, and every engagement carries an identity, a timestamp and an authority reference.',
  },
  {
    title: 'Cost exchange decides',
    body: 'A defence that spends more per engagement than the attack costs loses on arithmetic alone. We price effectors against what they are shooting at, and we hold that line even when a peacetime specification asks for more.',
  },
  {
    title: 'Grid before platform',
    body: 'Every system is designed as a node before it is designed as a platform. Hardware is what a customer buys; the grid is what gets more out of it.',
  },
  {
    title: 'Degrade, do not fail',
    body: 'Jamming, GNSS denial and loss of the rear link are the design case, worked in the first release. A system that needs a datacentre to close a kill chain is not one a force can fight on.',
  },
  {
    title: 'Publish what we can defend',
    body: 'Figures on this site are either releasable or marked as withheld. Where a number cannot be stood behind in a trial, it is not printed.',
  },
];

const CAPABILITY_SPINE = [
  { label: 'Airframes', body: 'Loitering munitions, interceptors and hypersonic glide vehicles.' },
  { label: 'Effectors', body: 'Hard kill and soft kill, priced against what they engage.' },
  { label: 'Avionics', body: 'Flight control, datalink and sensing that hold through denial and jamming.' },
  { label: 'Autonomy', body: 'Edge autonomy that holds through disconnection, under human authority.' },
  { label: 'Space', body: 'Bodyguard satellites and co-orbital effects held under national authority.' },
  { label: 'Modelling', body: 'Validated digital twins and quantum-secured links underneath every programme.' },
];

/** The places we work from. Pune carries two sites, so it is listed once. */
const SITES = Array.from(new Set(OFFICES.map((office) => office.city)));

export function About() {
  useSeo({
    title: 'About',
    path: '/about',
    description:
      'Aminuteman Technologies develops autonomous air systems, counter-UAS and defence integration software.',
  });

  const counts = {
    total: PROGRAMMES.length,
    systems: PROGRAMMES.filter((p) => p.category === 'systems').length,
    ai: PROGRAMMES.filter((p) => p.category === 'ai').length,
  };

  return (
    <div className="bg-void">
      <PageHero
        eyebrow="Company · The mandate"
        title="About Aminuteman"
        stop
        image="altitude"
        focus="50% 34%"
        intensity={0.9}
        lede="Aminuteman Technologies develops autonomous air systems, counter-UAS and defence integration software. Designed, developed and manufactured in India."
        meta={`Founded 2023 · Pune, Delhi, Bengaluru, Madhya Pradesh · ${counts.total} programmes`}
      />

      {/* ---- Mandate ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Mandate</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-sans text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
                  We develop air systems and their autonomy software together.
                </p>
              </Reveal>
              <div className="mt-10 space-y-6">
                <Reveal delay={0.06}>
                  <p className="body-copy text-base sm:text-lg">
                    Autonomy that runs at the edge without a datacentre. Counter-drone effectors
                    priced against what they are shooting at. Loitering munitions a section can
                    carry and launch. None of these are exotic technologies. They are the things a serious force needs in quantity,
                    and they have been unavailable to India on its own terms: available for
                    purchase, certainly, but not on a timeline or under a licence India controls.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="body-copy text-base sm:text-lg">
                    So we work the full stack: airframes, powerplants, effectors, sensing, and the
                    software grid that makes them act as one system instead of a collection of
                    procurement line items. That vertical span is not ambition for its own sake. It
                    is the only way to hold the cost, the schedule and the export position of a
                    programme at the same time.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p className="body-copy text-base sm:text-lg">
                    This work is aligned with{' '}
                    <span className="font-medium text-accent">Atmanirbhar Bharat</span>:
                    indigenous, AI-driven systems that reduce risk to soldiers and ensure the
                    burden of danger is carried by technology rather than by people.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Partners ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Alongside · The ecosystem"
              lead="Who we"
              title="work with"
              stop
            />
          </Reveal>

          {/* One list, split evenly into two columns. Names only: no region, no
              relationship type, no ordering that separates Indian from
              international partners. */}
          <div className="mt-16 grid gap-x-16 gap-y-0 sm:grid-cols-2">
            {(() => {
              const partners = [...DOMESTIC_PARTNERS, ...INTERNATIONAL_PARTNERS];
              const half = Math.ceil(partners.length / 2);
              return [partners.slice(0, half), partners.slice(half)].map((column, c) => (
                <div key={c} className="border-t border-line">
                  {column.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.04}>
                      <PartnerRow name={p.name} />
                    </Reveal>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ---- Capability spine -------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  index="02"
                  eyebrow="In-house · Held capability"
                  lead="What we hold"
                  title="ourselves"
                  stop
                  lede="The disciplines we refuse to outsource, because outsourcing any one of them puts a programme on somebody else’s schedule."
                />
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-10 flex flex-wrap gap-6 border-t border-line pt-8">
                  <Stat value={String(counts.systems)} label="Systems" />
                  <Stat value={String(counts.ai)} label="AI" />
                  <Stat value={String(counts.total)} label="Programmes" />
                  <Stat value={String(SITES.length)} label="Sites" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-line">
                {CAPABILITY_SPINE.map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.05}>
                    <div className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                      <div className="sm:col-span-4">
                        <h3 className="font-sans font-medium text-xl tracking-tight text-white">
                          {item.label}
                        </h3>
                      </div>
                      <div className="sm:col-span-8">
                        <p className="text-sm leading-relaxed text-ink-2">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Principles -------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="How we work · Commitments"
              lead="Six"
              title="commitments"
              stop
              lede="Six engineering constraints. Each one changes what gets built."
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="h-full border-t border-line py-6 pr-4">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-sans font-medium text-xl tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>

                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Sites -------------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Footprint · The sites"
              lead="Where we"
              title="build"
              stop
            />
          </Reveal>

          {/* Places only. What each site does is deliberately not published here. */}
          <div className="mt-16 grid grid-cols-1 gap-x-16 sm:grid-cols-2 lg:grid-cols-4">
            {SITES.map((place, i) => (
              <Reveal key={place} delay={i * 0.06}>
                <p className="border-t border-line py-6 font-sans font-medium text-2xl leading-snug tracking-tight text-white">
                  {place}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Field and liaison -------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="In the field · Trials"
              lead="On the"
              title="ground"
              stop
              lede="Our systems are evaluated by the people who would use them, on the ground they would use them on. In August 2025 that meant Sumdo at 10,700 feet, under an Indian Army initiative. Between evaluations we fly our own trials, and the onboard footage is the record."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FIELD.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.06}>
                <MediaSlot
                  src={shot.src}
                  video={shot.video}
                  label={shot.label}
                  caption={shot.caption}
                  alt={shot.caption}
                  ratio={shot.ratio}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Standing in the ecosystem ------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="06"
              eyebrow="Alongside · Exhibitions"
              lead="In the"
              title="room"
              stop
              lede="Defence exhibitions, the Aeronautical Society of India, and the industry forums where national technology policy gets argued out."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXHIBITIONS.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.06}>
                <MediaSlot
                  src={shot.src}
                  label={shot.label}
                  caption={shot.caption}
                  alt={shot.caption}
                  ratio="3/2"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Press -------------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="07"
              eyebrow="In the press · Coverage"
              lead="Written"
              title="about"
              stop
              lede="Coverage of the company and the programmes. Each entry links to the article."
            />
          </Reveal>

          <div className="mt-14 space-y-px border border-line bg-line">
            {PRESS.map((story) => (
              <Reveal key={story.headline}>
                <article className="bg-panel/40 p-7 sm:p-9">
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                    {story.date}
                  </p>
                  <h3 className="mt-4 max-w-3xl font-sans font-medium text-2xl leading-tight tracking-tight text-white sm:text-3xl">
                    {story.headline}
                  </h3>
                  <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
                    <span className="mr-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                      Carried by
                    </span>
                    {story.outlets.map((o) => (
                      <a
                        key={o.href}
                        href={o.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-line-bright px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {o.outlet}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Facility ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="08"
              eyebrow="Our office"
              title="Bengaluru office"
              stop
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FACILITY.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.06}>
                <MediaSlot src={shot.src} alt="Bengaluru office interior" ratio={shot.ratio} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Founder ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Leadership</Eyebrow>
                <p className="mt-8 font-sans text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  Our goal is to shift defence readiness away from dependence on constant
                  maintenance and foreign supply, toward self-sustaining systems built and
                  sustained at home.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="body-copy mt-8 text-base sm:text-lg">
                  Through <span className="font-medium text-accent">Valley</span>, our physical-AI
                  operating system, we are building the connective intelligence for autonomous
                  defence hardware, capable of real-time decision-making at the edge, and designed
                  so that the systems a force already owns become more capable and not
                  obsolete.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-10 border-t border-line pt-8">
                  <p className="font-display text-2xl uppercase tracking-wide text-white">
                    Aniruddha Narayan
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent/80">
                    Founder &amp; Chief Executive
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1} direction="left">
                <MediaSlot
                  src="/images/vision.jpg"
                  alt="Press coverage of Aminuteman Technologies"
                  label="Press coverage"
                  caption="Reported in the national and trade press, September 2025"
                  ratio="4/5"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA ---------------------------------------------------------- */}
      <section className="section">
        <div className="container">
                      <div className="border border-line bg-panel/40 p-8 sm:p-14">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-8">
                  <p className="eyebrow">Engagement</p>
                  <h2 className="display-md mt-5 text-white">
                    Bring us a problem, not a specification
                  </h2>
                  <p className="body-copy mt-5 max-w-2xl">
                    We work best with customers who describe the fight and not the part
                    number. Programme briefings and trials are arranged through the programme
                    office.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <Link to="/contact" className="btn-primary w-full justify-center lg:w-auto">
                    Contact programme office
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={programmePath('ankosha')}
                    className="btn-secondary w-full justify-center lg:w-auto"
                  >
                    See the systems
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}

/** Public names only; engagement details are not displayed. */
function PartnerRow({ name }: { name: string }) {
  return (
    <div className="border-b border-line py-5">
      <h3 className="font-sans font-medium text-lg leading-tight tracking-tight text-white">
        {name}
      </h3>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl uppercase leading-none tracking-tight text-white">
        {value}
      </p>
      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
        {label}
      </p>
    </div>
  );
}

export default About;
