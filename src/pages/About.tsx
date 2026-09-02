import { Link } from 'react-router-dom';
import { useSeo } from '../utils/seo';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { Eyebrow, SectionHeading } from '../components/ui/HUD';
import { MediaSlot } from '../components/ui/MediaSlot';
import { PageHero } from '../components/ui/PageHero';
import { PROGRAMMES, programmePath } from '../data/programmes';
import {
  ACHIEVEMENTS,
  DOMESTIC_PARTNERS,
  EXHIBITIONS,
  FACILITY,
  FIELD,
  INTERNATIONAL_PARTNERS,
  OFFICES,
  RECORD,
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
    body: 'Every capability on this site exists because the alternative was an import licence, a foreign end-use certificate, or a lead time set by somebody else. Sovereignty is decided in a supply chain long before it is debated as policy.',
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

export function About() {
  useSeo({
    title: 'About',
    path: '/about',
    description:
      'Aminuteman Technologies is a defence engineering company building autonomous air systems, the effectors that finish an engagement, and the grid that connects every sensor and shooter into a single picture.',
  });

  const counts = {
    total: PROGRAMMES.length,
    systems: PROGRAMMES.filter((p) => p.category === 'systems').length,
    ai: PROGRAMMES.filter((p) => p.category === 'ai').length,
  };

  return (
    <div className="bg-void">
      <PageHero
        eyebrow="Company"
        title="We build what could not be bought"
        image="altitude"
        focus="50% 34%"
        intensity={0.9}
        lede="Aminuteman Technologies is a defence engineering company building autonomous air systems, the effectors that finish an engagement, and the grid that connects every sensor and shooter into a single picture. Designed, developed and manufactured in India."
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
                <p className="font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  A country that cannot build its own weapons does not decide when to use them.
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

      {/* ---- Record / achievements --------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Standing"
              title="Where we actually are"
              lede="Each of these is drawn from a contract, a submission or a build standard."
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((item) => (
              <StaggerItem key={item.label} className="bg-void">
                <div className="group relative h-full bg-panel/40 p-8 transition-colors duration-300 hover:bg-panel">
                  <p className="data-label">{item.label}</p>
                  <p className="mt-4 font-display text-3xl uppercase leading-none tracking-tight text-white">
                    {item.value}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-2">{item.note}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Partners ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Alongside"
              title="Who we work with"
              lede="Primes, integrators and end users in India, and the international partners who supply and qualify alongside us."
            />
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="data-label text-white/70">India</p>
              <div className="mt-6 border-t border-line">
                {DOMESTIC_PARTNERS.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.04}>
                    <PartnerRow {...p} />
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="data-label text-white/70">International</p>
              <div className="mt-6 border-t border-line">
                {INTERNATIONAL_PARTNERS.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.04}>
                    <PartnerRow {...p} />
                  </Reveal>
                ))}
              </div>
            </div>
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
                  eyebrow="In-house"
                  title="What we hold ourselves"
                  lede="The disciplines we refuse to outsource, because outsourcing any one of them puts a programme on somebody else’s schedule."
                />
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-10 flex flex-wrap gap-6 border-t border-line pt-8">
                  <Stat value={String(counts.systems)} label="Systems" />
                  <Stat value={String(counts.ai)} label="AI" />
                  <Stat value={String(counts.total)} label="Programmes" />
                  <Stat value={String(OFFICES.length)} label="Sites" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-line">
                {CAPABILITY_SPINE.map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.05}>
                    <div className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                      <div className="sm:col-span-4">
                        <h3 className="font-display text-xl uppercase tracking-wide text-white">
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
              eyebrow="How we work"
              title="Six commitments"
              lede="Six engineering constraints. Each one changes what gets built."
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <StaggerItem key={item.title} className="bg-void">
                <div className="group relative h-full bg-panel/40 p-8 transition-colors duration-300 hover:bg-panel">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
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
              eyebrow="Footprint"
              title="Where we build"
              lede="Design and works in Pune, the programme office in Delhi, avionics and autonomy in Bengaluru, and test and integration in Madhya Pradesh."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((office, i) => (
              <Reveal key={office.city + office.role} delay={i * 0.06}>
                <div className="flex h-full flex-col border border-line bg-panel/30">
                  <MediaSlot
                    label={`${office.city.toUpperCase()} / ${office.role.toUpperCase()}`}
                    src={office.image}
                    alt={`${office.city}, ${office.role}`}
                    ratio="3/2"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-white">
                        {office.city}
                      </h3>
                      {office.primary && (
                        <span className="font-mono text-[0.55rem] uppercase tracking-widest text-accent/80">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
                      {office.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-3">{office.note}</p>
                    {office.lines && (
                      <div className="mt-auto pt-6">
                        {office.lines.map((line) => (
                          <p
                            key={line}
                            className="font-mono text-[0.6rem] leading-relaxed text-ink-dim"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
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
              eyebrow="In the field"
              title="On the ground"
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
              eyebrow="Alongside"
              title="In the room"
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

      {/* ---- Facility ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="The floor"
              title="Where the hardware sits"
              lede="Photographed on the engineering floor. Rotary and fixed-wing development airframes, integration positions, and the secure area behind them."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITY.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.06}>
                <MediaSlot
                  src={shot.src}
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

      {/* ---- Founder ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Leadership</Eyebrow>
                <p className="mt-8 font-display text-2xl uppercase leading-tight tracking-tight text-white sm:text-3xl">
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

      {/* ---- Record ------------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Record" title="How we got here" />
          </Reveal>

          <div className="mt-14 border-t border-line">
            {RECORD.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <div className="group grid grid-cols-1 gap-3 border-b border-line py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2">
                    <span className="font-display text-3xl uppercase leading-none tracking-tight text-accent/80">
                      {item.year}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-display text-xl uppercase leading-tight tracking-wide text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm leading-relaxed text-ink-2 sm:text-base">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
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

function PartnerRow({
  name,
  region,
  basis,
  note,
}: {
  name: string;
  region: string;
  basis: string;
  note: string;
}) {
  return (
    <div className="group border-b border-line py-5 transition-colors duration-300 hover:bg-white/[0.02]">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-accent">
          {name}
        </h3>
        <span className="shrink-0 font-mono text-[0.55rem] uppercase tracking-widest text-ink-dim">
          {region}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-widest text-accent/80">
        {basis}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-3">{note}</p>
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
