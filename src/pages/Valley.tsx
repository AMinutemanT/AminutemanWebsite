import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { UnifiedGrid } from '../components/UnifiedGrid';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { Eyebrow, SectionHeading, StatusTag } from '../components/ui/HUD';
import { SpecTable } from '../components/ui/SpecTable';
import { PROGRAMME_BY_SLUG, programmePath, type Programme } from '../data/programmes';

/* ---------------------------------------------------------------------------
 * VALLEY, the integration platform.
 *
 * This is the page that has to carry the thesis: the force already owns the
 * sensors and the shooters, and what it lacks is a single custody model that
 * lets any one of them act on what any other one saw. Everything else on the
 * site is a node; this is the grid.
 * ------------------------------------------------------------------------- */

const CHAIN = [
  {
    step: 'Sense',
    body: 'Every sensor on the grid publishes what it observes in a common track format the moment it observes it: ours, the customer’s, and the ones bought from somebody else a decade ago.',
  },
  {
    step: 'Fuse',
    body: 'Observations from different sensors, different services and different clocks are correlated into one track with one identity, carrying the evidence that produced it.',
  },
  {
    step: 'Decide',
    body: 'The grid proposes: classification, threat ordering, and the effectors that can physically service the track inside the window available.',
  },
  {
    step: 'Allocate',
    body: 'Pairing is a grid decision, not a platform decision. The cheapest effector that closes the engagement is offered first, regardless of which unit owns it.',
  },
  {
    step: 'Commit',
    body: 'A human commits. The authority, the identity and the timestamp are bound into the engagement record before the effector is released.',
  },
  {
    step: 'Assess',
    body: 'Effect is measured against the track that justified it, the result is published back to the grid, and the picture updates for everyone at once.',
  },
];

const LAYERS = [
  {
    name: 'Custody',
    body: 'One track, one identity, one chain of evidence. The grid records which sensor contributed what and when, so a track can be defended after the fact rather than merely asserted during the fight.',
  },
  {
    name: 'Fusion',
    body: 'Correlation across radar, RF, electro-optic, orbital and human reporting. Disagreement between sensors is surfaced as disagreement, not averaged away into a false consensus.',
  },
  {
    name: 'Autonomy',
    body: 'Mission behaviours that run on the airframe, at the edge, and keep running when the link to headquarters is gone. Autonomy is a property of the node, not a service it calls.',
  },
  {
    name: 'Effects',
    body: 'A common tasking interface for every effector on the grid: loitering munitions, interceptors, and third-party systems the grid does not own.',
  },
  {
    name: 'Assurance',
    body: 'Rules of engagement, geofences and authority boundaries enforced in the software rather than in the briefing. Every engagement is reconstructable end to end.',
  },
];

const EDGE = [
  {
    title: 'Degrades, does not fail',
    body: 'Nodes hold the last agreed picture and keep prosecuting the mission through jamming, GNSS denial and loss of the rear link. Reconnection reconciles state; it does not restart it.',
  },
  {
    title: 'No datacentre in the loop',
    body: 'Fusion and allocation run on the compute already deployed forward. A grid that needs a cloud connection to close a kill chain is not a grid a force can fight on.',
  },
  {
    title: 'Sovereign by construction',
    body: 'Deployed on customer infrastructure, on customer soil, under customer key management. No telemetry leaves the enclave and no vendor holds a switch over it.',
  },
  {
    title: 'Open to what exists',
    body: 'The grid assumes a mixed fleet from a dozen suppliers across three services. Onboarding a platform is an integration task measured in weeks, not a replacement programme.',
  },
];

const SUBPAGES = [
  {
    to: '/valley/command-control',
    designation: 'C2',
    name: 'Command & Control',
    body: 'The operator surface: how the picture is held, and how commitment authority is exercised and recorded.',
  },
  {
    to: '/valley/mission-autonomy',
    designation: 'AUTONOMY',
    name: 'Mission Autonomy',
    body: 'Behaviours that survive disconnection, and the qualification regime that lets them be trusted forward.',
  },
  {
    to: '/valley/partner-program',
    designation: 'PARTNERS',
    name: 'Partner Program',
    body: 'Bringing a third-party sensor or effector onto the grid, and what the interface actually requires.',
  },
];

const PLATFORM_SPECS = [
  { label: 'Deployment', value: 'On-premise', note: 'Customer infrastructure, customer key management' },
  { label: 'Disconnected operation', value: 'Full mission', note: 'No rear link required to close an engagement' },
  { label: 'Sensor onboarding', value: 'Open interface', note: 'Third-party and legacy systems supported' },
  { label: 'Commitment authority', value: 'Human, always', note: 'Enforced in software, not in policy' },
  { label: 'Engagement record', value: 'Immutable', note: 'Identity, authority and timestamp bound at release' },
  { label: 'Track custody', value: 'Evidence-carrying', note: 'Contributing sensors retained per track' },
  { label: 'Classification level', value: 'ON REQUEST' },
  { label: 'Throughput at scale', value: 'ON REQUEST' },
];

export function Valley() {
  useEffect(() => {
    document.title = 'Valley, Aminuteman Technologies';
  }, []);

  const products = ['aorizon', 'talon', 'sentinel']
    .map((slug) => PROGRAMME_BY_SLUG[slug])
    .filter((p): p is Programme => Boolean(p));

  return (
    <div className="bg-void">
      {/* ---- Hero -------------------------------------------------------- */}
      <header className="relative flex min-h-[90vh] items-end overflow-hidden border-b border-line pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.16]" />
          <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.2]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(255,138,0,0.16),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="select-none whitespace-nowrap font-display text-[26vw] font-semibold uppercase leading-none tracking-tighter text-white/[0.035]">
              Valley
            </span>
          </div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        </div>

        <div className="container relative z-10 pb-20 sm:pb-24">
          <Reveal direction="none">
            <nav className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-accent">Platform</span>
            </nav>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 font-mono text-xs uppercase tracking-ultra text-accent-soft/80">
              Valley
            </p>
            <h1 className="display-xl mt-4 max-w-5xl text-white">
              Every sensor.
              <br />
              Every effector.
              <br />
              One picture.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
              Valley is the grid the rest of this site plugs into. It takes what a force can
              already see and what it can already shoot, and makes the two act as one system, across services, across suppliers, and through the loss of every link back to
              headquarters.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <StatusTag status="Operational" />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                Deployed on customer infrastructure
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- Thesis ------------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow index="01">The problem</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  The sensor that saw it is almost never the shooter that can reach it.
                </p>
              </Reveal>
              <div className="mt-10 space-y-6">
                <Reveal delay={0.06}>
                  <p className="body-copy text-base sm:text-lg">
                    A force does not lose an engagement because it lacked a sensor. It loses
                    because the radar that held the track, the battery that could have serviced
                    it and the commander who could have authorised the shot were on three
                    different systems, procured in three different decades, speaking three
                    different formats. The track existed. The magazine existed. The path between
                    them did not.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="body-copy text-base sm:text-lg">
                    Most defence software is sold to close one of those gaps for one service, and
                    becomes another silo the next programme has to integrate around. Valley is
                    built on the opposite assumption: the customer already owns the hardware, the
                    hardware is heterogeneous, replacing it is neither affordable nor necessary,
                    and the useful thing to sell is the connective tissue.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p className="body-copy text-base sm:text-lg">
                    So Valley owns no sensor and no magazine. It holds custody of tracks, and it
                    allocates effects. Our own systems are nodes on it with no privileged status. An Ankosha section and a third-party gun battery appear to the grid as two
                    entries in the same effector list, ranked by which one closes the engagement.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- The grid ---------------------------------------------------- */}
      <section className="section relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.15]" />
        <div className="container relative">
          <Reveal>
            <SectionHeading
              eyebrow="Architecture"
              index="02"
              title="The unified grid"
              lede="Sensing on the left, effects on the right, one custody model in the middle. Any node on either side can be ours, the customer’s, or a third party’s. The grid is indifferent to which."
            />
          </Reveal>

          <Reveal delay={0.12} className="mt-16">
                          <div className="border border-line bg-abyss/70 p-5 sm:p-8">
                <UnifiedGrid />
              </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Kill chain -------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Sequence"
              index="03"
              title="How an engagement closes"
              lede="Six steps, and a human at the fifth. The grid compresses the four either side of it."
            />
          </Reveal>

          <div className="mt-16 border-t border-line">
            {CHAIN.map((item, i) => {
              const isCommit = item.step === 'Commit';
              return (
                <Reveal key={item.step} delay={i * 0.05}>
                  <div className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-1">
                      <span className="font-mono text-xs text-ink-dim">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <h3
                        className={`font-display text-2xl uppercase leading-none tracking-wide transition-colors ${
                          isCommit ? 'text-signal' : 'text-white group-hover:text-accent'
                        }`}
                      >
                        {item.step}
                      </h3>
                      {isCommit && (
                        <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-signal/70">
                          Human authority
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-sm leading-relaxed text-ink-2 sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Layers ------------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Composition"
              index="04"
              title="What the platform is made of"
              lede="Five layers. A customer can adopt the lower ones without the upper ones, which is usually how a first deployment starts."
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map((layer, i) => (
              <StaggerItem key={layer.name} className="bg-void">
                <div className="group relative h-full bg-panel/40 p-8 transition-colors duration-300 hover:bg-panel">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-white">
                    {layer.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{layer.body}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Edge -------------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Posture"
                  index="05"
                  title="Built for the link going down"
                  lede="Contested electromagnetic conditions are the design case, not the exception handled in a later release."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Stagger className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
                {EDGE.map((item) => (
                  <StaggerItem key={item.title} className="bg-void">
                    <div className="h-full bg-panel/40 p-7">
                      <h3 className="font-display text-lg uppercase tracking-wide text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Products on the grid ---------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Delivered as"
              index="06"
              title="Three products, one grid"
              lede="Valley reaches a customer as one of three deployable products. They read and write the same grid state, so a force can start with one and add the others without a second integration."
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line lg:grid-cols-3">
            {products.map((product, i) => (
              <StaggerItem key={product.slug} className="bg-void">
                <Link
                  to={programmePath(product.slug)}
                  className="group flex h-full flex-col bg-panel/30 p-8 transition-colors duration-300 hover:bg-panel"
                >
                  <span className="font-display text-6xl uppercase leading-none tracking-tight text-white/[0.08]">
                    {['See', 'Strike', 'Shield'][i]}
                  </span>
                  <h3 className="-mt-6 font-display text-3xl uppercase leading-none tracking-wide text-white">
                    {product.name}
                  </h3>
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-widest text-accent/60">
                    {product.tagline}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-ink-3">{product.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[0.65rem] uppercase tracking-widest text-ink-3 transition-colors group-hover:text-accent">
                    Open product
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Specification ------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <Eyebrow index="07">Platform specification</Eyebrow>
          </Reveal>
          <div className="mt-10">
            <SpecTable specs={PLATFORM_SPECS} />
          </div>
        </div>
      </section>

      {/* ---- Sub-pages ---------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Go deeper" index="08" title="The platform in detail" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {SUBPAGES.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="group block bg-panel/40 p-8 transition-colors hover:bg-panel"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/60">
                    {page.designation}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-wide text-white">
                  {page.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{page.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---------------------------------------------------------- */}
      <section className="border-t border-line">
        <div className="container py-20 sm:py-28">
                      <div className="border border-line bg-panel/40 p-8 sm:p-14">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-8">
                  <p className="eyebrow">Platform enquiries</p>
                  <h2 className="display-md mt-5 text-white">Put your force on the grid</h2>
                  <p className="body-copy mt-5 max-w-2xl">
                    Architecture documentation, integration interfaces and a scoped evaluation
                    deployment are released to qualified government and industry counterparties
                    following end-user certification.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <Link to="/contact" className="btn-primary w-full justify-center lg:w-auto">
                    Contact the platform office
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/valley/partner-program"
                    className="btn-secondary w-full justify-center lg:w-auto"
                  >
                    Partner integration
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Valley;
