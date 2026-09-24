import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useSeo } from '../utils/seo';
import { HeroVideo } from '../components/ui/HeroVideo';
import { MediaSlot } from '../components/ui/MediaSlot';
import { FleetCard } from '../components/ui/FleetCard';
import { TrustBar } from '../components/ui/TrustBar';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/HUD';
import { PROGRAMME_BY_SLUG, programmePath } from '../data/programmes';
import { DOMESTIC_PARTNERS, INTERNATIONAL_PARTNERS } from '../data/company';

/* ---------------------------------------------------------------------------
 * Editorial in structure (one strong opening, real photography, a handful of
 * unrepeated sections), but built on the site's own primitives rather than a
 * parallel typographic system: uppercase Big Shoulders Display for every
 * heading, the established token colours, and Eyebrow/SectionHeading rather
 * than bespoke CSS. Home should read as the front door of the same building,
 * not a different site with a shared nav.
 * ------------------------------------------------------------------------- */

const SELECTED_PROGRAMMES = ['ankosha', 'counter-uas', 'legacy-systems'];

export function Home() {
  useSeo({
    title: 'Home',
    path: '/',
    description:
      'Aminuteman develops autonomous air systems, counter-UAS and defence integration software in India. Explore the programmes, engineering work and recorded trials.',
  });

  return (
    <div className="bg-void">
      <Hero />
      <TrustBar
        label="Working with"
        items={[...DOMESTIC_PARTNERS, ...INTERNATIONAL_PARTNERS].map((p) => ({
          name: p.name,
          basis: p.basis,
        }))}
      />
      <Intro />
      <Programmes />
      <Platform />
      <FieldRecord />
      <ContactCTA />
    </div>
  );
}

/* -- Hero --------------------------------------------------------------- */

function Hero() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <header className="relative flex min-h-[94svh] flex-col justify-end overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <HeroVideo
          className="absolute inset-0"
          poster="/videos/hero-loop.jpg"
          sources={[
            { src: '/videos/hero-loop.webm', type: 'video/webm' },
            { src: '/videos/hero-loop.mp4', type: 'video/mp4' },
          ]}
          paused={paused}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/20 to-transparent" />
      </div>

      <div className="container relative z-10 pb-16 pt-40 sm:pb-20">
        <Reveal direction="none">
          <p className="eyebrow">Aminuteman Technologies · India</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-5xl text-white">
            Shaping
            <br />
            the deterrence
            <span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl">
              Autonomous air systems and the software that connects them. Designed,
              developed and built in India.
            </p>
            <Link
              to="/systems"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
            >
              Explore our systems
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="absolute right-4 top-28 z-10 border border-white/25 bg-void/70 p-3 text-ink-2 transition-colors hover:text-white sm:right-8"
          aria-label={paused ? 'Play background film' : 'Pause background film'}
          aria-pressed={paused}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      )}
    </header>
  );
}

/* -- Intro ---------------------------------------------------------------- */

function Intro() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>The work</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="display-lg text-white">
                Hardware. Software.
                <br />
                The engineering between.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <Reveal delay={0.06}>
                <p className="body-copy text-base sm:text-lg">
                  We develop airframes, autonomy and systems integration together. Our
                  programmes span autonomous flight, counter-UAS and the integration of
                  existing defence equipment.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="body-copy text-base sm:text-lg">
                  From the engineering bench to range trials, the work brings physical
                  systems and mission software into the same development process.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.18}>
              <Link
                to="/about"
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                Inside Aminuteman
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- Selected programmes ---------------------------------------------------- */

function Programmes() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <Eyebrow>Selected programmes</Eyebrow>
              <h2 className="display-lg mt-5 text-white">Built for the mission.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <Link
              to="/systems"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
            >
              All systems
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SELECTED_PROGRAMMES.map((slug, i) => {
            const programme = PROGRAMME_BY_SLUG[slug];
            if (!programme) return null;
            return (
              <Reveal key={slug} delay={i * 0.06}>
                <FleetCard
                  to={programmePath(slug)}
                  designation={programme.designation}
                  name={programme.name}
                  blurb={programme.tagline}
                  src={programme.hero.src}
                  fit={programme.hero.fit}
                  kicker={programme.status}
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl font-mono text-[0.65rem] leading-relaxed text-ink-dim">
            Programme pages include published specifications, imagery and current
            development status.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -- Platform ----------------------------------------------------------- */

function Platform() {
  const links: [string, string][] = [
    ['Command & control', 'command-control'],
    ['Mission autonomy', 'mission-autonomy'],
    ['Partner integration', 'partner-program'],
  ];

  return (
    <section className="section border-b border-line">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Valley · Integration platform</Eyebrow>
              <h2 className="display-lg mt-5 text-white">
                One picture.
                <br />
                Across systems.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <p className="font-display text-2xl uppercase leading-tight tracking-tight text-white sm:text-3xl">
                The connection between a sensor, an operator and a decision.
              </p>
              <p className="body-copy mt-6 text-base sm:text-lg">
                Valley brings mission autonomy and command software into a shared
                integration layer. Explore the operator surface, the behaviours running
                on the airframe, and the interfaces for partner systems.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 border-t border-line">
                {links.map(([name, path]) => (
                  <Link
                    key={path}
                    to={`/valley/${path}`}
                    className="group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors hover:text-accent"
                  >
                    <span className="font-display text-xl uppercase tracking-wide text-white transition-colors group-hover:text-accent">
                      {name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- Field record ------------------------------------------------------- */

function FieldRecord() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <Eyebrow>From the field</Eyebrow>
              <h2 className="display-lg mt-5 text-white">The work, on record.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-xs text-right text-sm leading-relaxed text-ink-3">
              Recorded trials and evaluation. Original footage and company photography.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal delay={0.08}>
            <article>
              <MediaSlot
                video="/videos/fibre-optic-trial.mp4"
                poster="/videos/fibre-optic-trial.jpg"
                src="/videos/fibre-optic-trial.jpg"
                label="Fibre-optic control trial"
                alt="Onboard view from the fibre-optic control trial"
                ratio="3/2"
              />
              <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
                Range trial · Onboard footage
              </p>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight tracking-wide text-white">
                Fibre-optic control
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                A recorded control run from the airframe camera, using a physical
                fibre-optic command link.
              </p>
              <Link
                to="/systems/ankosha"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                Explore Ankosha
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article>
              <MediaSlot
                video="/videos/payload-release-trial.mp4"
                poster="/videos/payload-release-trial.jpg"
                src="/videos/payload-release-trial.jpg"
                label="Payload release trial"
                alt="Onboard view of a payload release from the airframe camera"
                ratio="3/2"
              />
              <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
                Range trial · Onboard footage
              </p>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight tracking-wide text-white">
                Payload release
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                A release run over the range, flown from the airframe camera. Release,
                separation and the run off target, uncut.
              </p>
              <Link
                to="/systems/ankosha"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                Explore Ankosha
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article>
              <MediaSlot
                src="/images/field/high-altitude.jpg"
                label="High-altitude evaluation"
                alt="Airframe evaluation at Sumdo during Surya Dronathon 2025"
                ratio="3/2"
              />
              <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
                Sumdo · August 2025
              </p>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight tracking-wide text-white">
                High-altitude evaluation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                Evaluation at 10,700 feet under an Indian Army initiative at Surya
                Dronathon 2025.
              </p>
              <Link
                to="/about"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                Company and field record
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -- Closing CTA ---------------------------------------------------------- */

function ContactCTA() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="flex flex-col gap-8 border-t border-line pt-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Start a conversation</Eyebrow>
              <h2 className="display-lg mt-5 text-white">
                Talk to the team
                <br />
                behind the systems.
              </h2>
            </div>
            <div className="sm:text-right">
              <p className="max-w-xs text-sm leading-relaxed text-ink-3 sm:ml-auto">
                Programme enquiries, technical integration and partnerships.
              </p>
              <Link to="/contact" className="btn-primary mt-6 inline-flex">
                Contact Aminuteman
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Home;
