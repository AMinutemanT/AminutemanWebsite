import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../utils/seo';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnkoshaFlythrough } from '../components/AnkoshaFlythrough';
import { UnifiedGrid } from '../components/UnifiedGrid';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { Eyebrow, SectionHeading } from '../components/ui/HUD';
import { MediaSlot } from '../components/ui/MediaSlot';
import { PROGRAMME_BY_SLUG, programmePath } from '../data/programmes';
import {
  ACHIEVEMENTS,
  DOMESTIC_PARTNERS,
  INTERNATIONAL_PARTNERS,
  TAGLINE,
} from '../data/company';

/* -- Content ---------------------------------------------------------------- */

const CAPABILITY_STRIP = [
  'Loitering strike',
  'Counter-UAS',
  'Hypersonics',
  'Quantum-secured links',
  'Orbital systems',
  'Digital twins',
  'Sovereign AI',
];

const DOMAINS: { slug: string; heading: string; blurb: string }[] = [
  {
    slug: 'ankosha',
    heading: 'Loitering strike',
    blurb: 'A cruciform family of loitering munitions flown as a formation, from man-portable to extended-range deep strike.',
  },
  {
    slug: 'counter-uas',
    heading: 'Counter-UAS',
    blurb: 'INDRASTRA holds the low-altitude picture. RYDER is the effector it commands.',
  },
  {
    slug: 'legacy-systems',
    heading: 'Legacy & manned',
    blurb: 'Guns, radars and manned platforms already in service, retrofitted onto the grid rather than replaced.',
  },
  {
    slug: 'hypersonics',
    heading: 'Hypersonics',
    blurb: 'Glide vehicles, and a balloon launch approach that removes the booster from the equation.',
  },
  {
    slug: 'orbital-systems',
    heading: 'Space',
    blurb: 'Bodyguard satellites for national assets, and a co-orbital response held under national authority.',
  },
  {
    slug: 'quantum',
    heading: 'Quantum',
    blurb: 'Links whose interception is detectable, and navigation that holds without a satellite.',
  },
  {
    slug: 'digital-twin',
    heading: 'Digital twins',
    blurb: 'Every round has a model, and the model is kept honest by the round.',
  },
  {
    slug: 'aorizon',
    heading: 'Aorizon',
    blurb: 'The sovereign foundation model, trained wholly on Indian compute, and the fused picture it holds over every source.',
  },
  {
    slug: 'talon',
    heading: 'Talon',
    blurb: 'Effector pairing and engagement management, with the reasoning shown and a human at the decision point.',
  },
  {
    slug: 'sentinel',
    heading: 'Sentinel',
    blurb: 'Installation and force protection, layered from detection through to the effector that answers it.',
  },
];

const POSTURE = [
  { value: '10', label: 'Active programmes', note: 'Air, air defence, space and the intelligence layer' },
  { value: '4', label: 'Domains', note: 'Air · air defence · space · information' },
  { value: '1,000', label: 'km Ankosha-A range', note: '8 hours endurance on a 20 kg warhead' },
  { value: '100%', label: 'Human commitment', note: 'Engagement authority is never delegated' },
];

const PRODUCTS = ['aorizon', 'talon', 'sentinel'];

/* Onboard footage from the range. Both clips are recorded off the airframe,
   telemetry overlay and all. */
const TRIALS = [
  {
    video: '/videos/fibre-optic-trial.mp4',
    poster: '/videos/fibre-optic-trial.jpg',
    label: 'Fibre-optic control',
    caption:
      'Onboard footage from a tethered fibre-optic control run. The spool pays out behind the airframe and the command link is physical, so there is nothing on it to jam.',
  },
  {
    video: '/videos/payload-release-trial.mp4',
    poster: '/videos/payload-release-trial.jpg',
    label: 'Payload release',
    caption:
      'A grenade release over the range, flown from the airframe camera. Release, separation and the run off target, uncut.',
  },
];

/* -- Page ------------------------------------------------------------------- */

export function Home() {
  useSeo({
    title: 'Home',
    path: '/',
    description:
      'Autonomous air systems, counter-UAS and loitering strike, hypersonics and orbital programmes, unified by Valley, our defence integration grid. Designed, developed and manufactured in India.',
  });

  return (
    <div className="bg-void">
      <Hero />
      <Mandate />
      <DomainMatrix />
      <ValleySection />
      <ProductTriad />
      <AnkoshaStrip />
      <Trials />
      <Posture />
      <Vision />
      <Standing />
      <Clientele />
      <ClosingCTA />
    </div>
  );
}

/* -- Hero ------------------------------------------------------------------- */

/**
 * The formation is sized for the frame it flies through. At the desktop scale
 * a phone viewport puts an airframe directly behind the body copy, so narrow
 * screens get a smaller formation pushed further off-axis, and the scrim
 * reaches all the way across instead of clearing at 58%.
 */
function useHeroFraming() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return narrow
    ? { scale: 2.4, axisX: 4.6, scrim: 'linear-gradient(180deg,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0.82) 45%,#000 100%)' }
    : { scale: 4.1, axisX: 3.3, scrim: 'linear-gradient(100deg,#000 10%,rgba(0,0,0,0.55) 34%,transparent 58%)' };
}

function Hero() {
  const framing = useHeroFraming();

  return (
    <header className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* The Ankosha cross flythrough sits behind everything. */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(255,138,0,0.18),transparent_65%)]" />
        <AnkoshaFlythrough
          className="absolute inset-0"
          intensity={1.15}
          axisX={framing.axisX}
          scale={framing.scale}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/45" />
        <div className="absolute inset-0" style={{ background: framing.scrim }} />
      </div>

      <div className="container relative z-10 pb-20 pt-40 sm:pb-24">
        <Reveal direction="none">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-[0.7rem] uppercase tracking-ultra text-accent">
              {TAGLINE}
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
              Pune · Delhi · Bengaluru · Madhya Pradesh
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="display-xl mt-8 max-w-5xl text-white">
            Deterrence is an
            <br />
            engineering problem
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
            We build autonomous air systems, the effectors that finish an engagement, and the
            grid that connects every sensor and shooter into a single picture. Designed,
            developed and manufactured in India.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/valley" className="btn-primary justify-center">
              Enter the grid
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/systems" className="btn-secondary justify-center">
              Systems index
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Capability strip. Real programme names, not simulated telemetry. */}
      <div className="relative z-10 border-y border-line bg-void/80 backdrop-blur-sm">
        <div className="container">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 py-4">
            {CAPABILITY_STRIP.map((item) => (
              <li
                key={item}
                className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

/* -- Mandate ---------------------------------------------------------------- */

function Mandate() {
  return (
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
                  Every capability on this site exists because the alternative was an import
                  licence, a foreign end-use certificate, or a lead time set by somebody else's
                  industrial policy. Autonomy that runs at the edge without a datacentre.
                  Counter-drone effectors priced against what they are shooting at. Loitering
                  munitions a section can carry and launch. None of it is exotic. All of it is
                  what a serious force needs in quantity, and all of it has been unavailable to
                  India on its own terms.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="body-copy text-base sm:text-lg">
                  We work the full stack: airframes, powerplants, effectors, sensing, and the
                  software grid that makes them act as one system instead of a collection of
                  procurement line items. The hardware is what a customer buys. The grid is what
                  gets more out of it.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="body-copy text-base sm:text-lg">
                  One principle sits above all of it, and it is engineered in rather than
                  asserted: a machine may propose, but a human commits. Every engagement on our
                  systems carries an identity, a timestamp and an authority reference, and every
                  one of them can be reviewed afterwards.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- Domain matrix ---------------------------------------------------------- */

function DomainMatrix() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Capability"
            title="What we build"
            lede="Ten programmes across four domains, each designed as a node on the grid before it is designed as a platform."
          />
        </Reveal>

        <Stagger
          step={0.05}
          className="mt-16 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {DOMAINS.map((domain, i) => {
            const programme = PROGRAMME_BY_SLUG[domain.slug];
            if (!programme) return null;
            return (
              <StaggerItem key={domain.slug} className="bg-void">
                <Link
                  to={programmePath(domain.slug)}
                  className="group relative flex h-full flex-col bg-panel/30 p-8 transition-colors duration-300 hover:bg-panel"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[0.6rem] tracking-widest text-ink-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>

                  <h3 className="mt-6 font-display text-2xl uppercase leading-none tracking-wide text-white">
                    {domain.heading}
                  </h3>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
                    {programme.designation}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-ink-3">{domain.blurb}</p>

                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </Link>
              </StaggerItem>
            );
          })}

          {/* Close the grid, and give the two indexes a way in from here. */}
          {[
            { to: '/systems', label: 'All systems' },
            { to: '/ai', label: 'All AI' },
          ].map((tile) => (
            <StaggerItem key={tile.to} className="bg-void">
              <Link
                to={tile.to}
                className="group relative flex h-full flex-col justify-between bg-panel/20 p-8 transition-colors duration-300 hover:bg-panel"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                  Index
                </span>
                <span className="mt-8 inline-flex items-center gap-2 font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors group-hover:text-accent">
                  {tile.label}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -- Valley ----------------------------------------------------------------- */

function ValleySection() {
  return (
    <section className="section relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.15]" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Platform"
                title="Valley"
                lede="An integration layer for the whole force. Every sensor publishes to it, every effector subscribes from it, and the picture it holds is the same picture at a forward position and at command."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-ink-3">
                Most defence software is bought to solve one problem for one service and ends up
                as another silo. Valley is built the other way round: an open grid that assumes
                the force already owns sensors and effectors from a dozen suppliers, and that
                replacing them is neither affordable nor necessary.
              </p>
              <Link
                to="/valley"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                Enter the grid
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.14}>
          <UnifiedGrid className="mt-16" />
        </Reveal>
      </div>
    </section>
  );
}

/* -- Products --------------------------------------------------------------- */

function ProductTriad() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Products"
            title="Aorizon, Talon, Sentinel"
            lede="Three deployable products on the Valley platform. They run on the sensors and effectors a force already owns, and they read and write the same grid state."
          />
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line lg:grid-cols-3">
          {PRODUCTS.map((slug) => {
            const product = PROGRAMME_BY_SLUG[slug];
            if (!product) return null;
            return (
              <StaggerItem key={slug} className="bg-void">
                <Link
                  to={programmePath(slug)}
                  className="group flex h-full flex-col bg-panel/30 transition-colors duration-300 hover:bg-panel"
                >
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-display text-3xl uppercase leading-none tracking-wide text-white">
                      {product.name}
                    </h3>
                    <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
                      {product.tagline}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-ink-3">{product.summary}</p>
                    <span className="mt-auto pt-8 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-3 transition-colors group-hover:text-accent">
                      Open product
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* -- Ankosha ---------------------------------------------------------------- */

function AnkoshaStrip() {
  const ankosha = PROGRAMME_BY_SLUG['ankosha'];
  if (!ankosha) return null;

  return (
    <section className="section relative overflow-hidden border-b border-line">
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Flagship"
                title="The Ankosha cross"
                lede="Five airframes, one autonomy core, flown as a formation. Sensing, decision and effect distributed across the cross. Losing an element degrades the formation, it does not end the mission."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-px border border-line bg-line">
                {ankosha.variants?.map((variant) => (
                  <div
                    key={variant.designation}
                    className="flex items-baseline justify-between gap-4 bg-panel/50 px-5 py-4"
                  >
                    <span className="font-display text-lg uppercase tracking-wide text-white">
                      {variant.designation}
                    </span>
                    <span className="text-right font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
                      {variant.name}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <Link
                to={programmePath('ankosha')}
                className="btn-secondary mt-10 inline-flex"
              >
                Open programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1} direction="left">
              <div className="relative">
                {/* Live formation view, reusing the hero renderer at lower intensity. */}
                <div className="relative aspect-[4/3] overflow-hidden border border-line bg-abyss">
                  <AnkoshaFlythrough className="absolute inset-0" intensity={0.95} scale={3.1} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-line bg-void/70 px-4 py-2.5 backdrop-blur-sm">
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
                      Formation geometry, rendered from the airframe models
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- Trials ----------------------------------------------------------------- */

/**
 * Two clips off the airframe. They sit behind an IntersectionObserver in
 * MediaSlot, so nothing but the poster loads until the section is close.
 */
function Trials() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="From the range"
            title="Trial footage"
            lede="Recorded off the airframe during trials, telemetry overlay and all. No reconstruction and no animation."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {TRIALS.map((clip, i) => (
            <Reveal key={clip.video} delay={i * 0.08}>
              <MediaSlot
                video={clip.video}
                poster={clip.poster}
                src={clip.poster}
                alt={clip.label}
                label={clip.label}
                ratio="3/2"
              />
              <div className="mt-5">
                <h3 className="font-display text-xl uppercase tracking-wide text-white">
                  {clip.label}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-3">{clip.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Posture ---------------------------------------------------------------- */

function Posture() {
  return (
    <section className="border-b border-line bg-panel/20">
      <div className="container py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {POSTURE.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className="bg-void">
              <div className="h-full bg-panel/40 p-7">
                <p className="font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">
                  {item.value}
                </p>
                <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-accent/80">
                  {item.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-dim">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Vision ----------------------------------------------------------------- */

function Vision() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading eyebrow="Leadership" title="Our vision" />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-copy mt-10 text-base leading-relaxed sm:text-lg">
                At <span className="font-medium text-white">Aminuteman Technologies</span>, we are
                building toward defence systems that sense, decide and act with autonomy, under
                human authority. Our goal is to shift defence readiness away from dependence on constant
                maintenance and foreign supply, toward self-sustaining systems built and sustained
                at home. Through <span className="font-medium text-accent">Valley</span>, our
                physical-AI operating system, we are building the connective intelligence for
                autonomous defence hardware, capable of real-time decision-making at the edge.
                This work is aligned with{' '}
                <span className="font-medium text-accent">Atmanirbhar Bharat</span>: engineering
                indigenous, AI-driven systems that reduce risk to our soldiers and ensure the
                burden of danger is carried by technology rather than by people.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
                <div>
                  <p className="font-display text-2xl uppercase tracking-wide text-white">
                    Aniruddha Narayan
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent/80">
                    Founder &amp; Chief Executive
                  </p>
                </div>
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
  );
}

/* -- Standing ---------------------------------------------------------------- */

function Standing() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Standing"
            title="Where we stand"
            lede="Each of these comes from a contract, a submission or a build standard."
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
  );
}

/* -- Clientele -------------------------------------------------------------- */

const LOGOS = [
  { src: '/images/collab/indian-army-logo-hd-49649.png', alt: 'Indian Army' },
  { src: '/images/collab/6febd270f3f6a4cf7951703ba0e925a0.png', alt: 'Partner organisation' },
  { src: '/images/collab/9e6a710497202d266783a4f5ed0f61ea.png', alt: 'Partner organisation' },
  { src: '/images/collab/logo.jpeg', alt: 'Partner organisation' },
  { src: '/images/collab/pngwing.com.png', alt: 'Partner organisation' },
  { src: '/images/collab/CA.png', alt: 'Partner organisation' },
];

function Clientele() {
  const names = [...DOMESTIC_PARTNERS, ...INTERNATIONAL_PARTNERS];

  return (
    <section className="border-b border-line py-16 sm:py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Working with</Eyebrow>
          <p className="mt-5 max-w-2xl text-sm text-ink-3">
            Primes, integrators and end users in India, and the international partners who supply
            and qualify alongside us.
          </p>
        </div>

        <div className="mask-fade-x mt-12 overflow-hidden">
          <div className="flex animate-scroll items-center gap-14 whitespace-nowrap">
            {[...Array(3)].map((_, setIndex) =>
              LOGOS.map((logo, i) => (
                <div
                  key={`${setIndex}-${i}`}
                  className="flex w-28 shrink-0 items-center justify-center sm:w-36"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-12 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0 sm:h-16"
                  />
                </div>
              )),
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4">
          {names.map((p) => (
            <div key={p.name} className="bg-void px-4 py-5 text-center">
              <p className="font-display text-sm uppercase leading-tight tracking-wide text-white/85">
                {p.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.5rem] uppercase tracking-widest text-ink-dim">
                {p.region}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Closing ---------------------------------------------------------------- */

function ClosingCTA() {
  return (
    <section className="section">
      <div className="container">
                  <div className="relative overflow-hidden border border-line bg-panel/40 p-8 sm:p-16">
            <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.14]" />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-8">
                <Eyebrow>Engagement</Eyebrow>
                <h2 className="display-md mt-6 text-white">
                  Start with the operational problem
                </h2>
                <p className="body-copy mt-6 max-w-2xl text-base sm:text-lg">
                  We work best with customers who describe the fight and let the engineering
                  follow. Programme briefings, trial data and integration documentation are
                  released to qualified government and industry counterparties.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link to="/contact" className="btn-primary w-full justify-center lg:w-auto">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/careers" className="btn-secondary w-full justify-center lg:w-auto">
                  We are hiring
                </Link>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

export default Home;
