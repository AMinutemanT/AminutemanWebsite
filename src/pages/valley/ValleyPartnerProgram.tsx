import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { GraphicBackdrop } from '../../components/ui/GraphicBackdrop';
import { Eyebrow, SectionHeading, StatusTag } from '../../components/ui/HUD';
import { SpecTable } from '../../components/ui/SpecTable';

/* ---------------------------------------------------------------------------
 * Valley / Partner Program, bringing a third-party sensor or effector onto
 * the grid. Deliberately an engineering document, not a channel programme.
 * ------------------------------------------------------------------------- */

const WHO = [
  {
    title: 'Sensor manufacturers',
    body: 'Radar, RF, electro-optic and acoustic systems that already hold a picture and need it to reach effectors they do not own.',
  },
  {
    title: 'Effector manufacturers',
    body: 'Interceptors, guns, jammers and munitions that can service a track if something reliable tasks them.',
  },
  {
    title: 'Platform integrators',
    body: 'Vehicle, vessel and aircraft integrators fitting mixed payloads that have to behave as one system on delivery.',
  },
  {
    title: 'Government laboratories',
    body: 'DRDO and service establishments evaluating grid architectures against national requirements.',
  },
];

const STAGES = [
  {
    step: 'Scope',
    body: 'We agree what the system contributes (tracks, effects, or both) and the operational envelope it is being onboarded for. Most integrations fail on ambiguity here, not on code.',
  },
  {
    step: 'Interface',
    body: 'You receive the grid interface specification and a conformance harness that runs against your system on your own infrastructure, before any joint work is scheduled.',
  },
  {
    step: 'Conformance',
    body: 'Track publication, tasking, timing and failure behaviour are tested against the harness. Disagreements surface in a lab, not on a range.',
  },
  {
    step: 'Integration trial',
    body: 'The system joins a live grid instance alongside other nodes and is exercised through degraded, jammed and disconnected conditions.',
  },
  {
    step: 'Field release',
    body: 'The system is released onto customer grids as a qualified node, with its envelope and its known limitations documented for the operators who will use it.',
  },
];

const REQUIREMENTS = [
  {
    label: 'Track publication',
    body: 'The ability to emit observations with position, time and an uncertainty estimate. Uncertainty is required, not optional. The grid cannot fuse a claim it cannot weigh.',
  },
  {
    label: 'Time discipline',
    body: 'A disciplined clock and a stated timing accuracy. Correlation across sensors is a timing problem before it is a geometry problem.',
  },
  {
    label: 'Tasking interface',
    body: 'For effectors, an interface that accepts a task, reports feasibility honestly, and reports the outcome, including failure.',
  },
  {
    label: 'Declared failure behaviour',
    body: 'What the system does on loss of link, loss of power or loss of confidence, stated in advance and demonstrated under test.',
  },
  {
    label: 'Deployable on-premise',
    body: 'No dependency on a vendor cloud, a phone-home licence check or telemetry leaving the customer enclave.',
  },
];

const SPECS = [
  { label: 'Interface', value: 'Open specification', note: 'Released under NDA to qualified partners' },
  { label: 'Conformance harness', value: 'Self-service', note: 'Runs on partner infrastructure' },
  { label: 'Typical onboarding', value: 'Weeks', note: 'Scope to conformance, system dependent' },
  { label: 'Deployment', value: 'On-premise', note: 'No vendor cloud dependency permitted' },
  { label: 'Exclusivity', value: 'None required', note: 'Partners retain their own customers' },
  { label: 'Source access', value: 'Not required', note: 'Conformance is behavioural, not inspectional' },
  { label: 'Certification', value: 'ON REQUEST' },
  { label: 'Commercial terms', value: 'ON REQUEST' },
];

export function ValleyPartnerProgram() {
  useEffect(() => {
    document.title = 'Partner Program, Aminuteman Technologies';
  }, []);

  return (
    <div className="bg-void">
      {/* ---- Header ------------------------------------------------------ */}
      <header className="relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28">
        <GraphicBackdrop seed="Partner Program" />

        <div className="container relative">
          <Reveal direction="none">
            <nav className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link to="/valley" className="transition-colors hover:text-white">
                Valley
              </Link>
              <span>/</span>
              <span className="text-accent">Partners</span>
            </nav>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 font-mono text-xs uppercase tracking-ultra text-accent-soft/80">
              Partner Program
            </p>
            <h1 className="display-xl mt-4 max-w-4xl text-white">Bring your system onto the grid</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Valley owns no sensor and no magazine. A third-party system that publishes tracks or
              accepts tasking is a first-class node on the grid, with no privileged status held
              back for our own hardware.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9">
              <StatusTag status="Open" />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- Thesis ------------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Why open</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  A grid that only talks to its owner&rsquo;s hardware is just a bigger silo.
                </p>
              </Reveal>
              <div className="mt-10 space-y-6">
                <Reveal delay={0.06}>
                  <p className="body-copy text-base sm:text-lg">
                    Every force we work with fields equipment from a dozen suppliers across three
                    services, bought across three decades. A platform that requires them to replace
                    that inventory before it delivers value is not an integration layer, it is a
                    procurement programme wearing one.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="body-copy text-base sm:text-lg">
                    So the interface is published and not guarded, conformance is something a
                    partner can run themselves before talking to us, and there is no exclusivity
                    requirement. A partner keeps their customers and their roadmap. What they gain
                    is that their system becomes tasking-reachable by every other node on the grid.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Who --------------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Who this is for" title="Partners" />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {WHO.map((item, i) => (
              <StaggerItem key={item.title} className="bg-void">
                <div className="group relative h-full bg-panel/40 p-8 transition-colors duration-300 hover:bg-panel">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide text-white">
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

      {/* ---- Stages ------------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              title="How onboarding runs"
              lede="Five stages. Most of the effort sits in the first two, which is deliberate. Ambiguity is cheaper to remove before integration than after."
            />
          </Reveal>

          <div className="mt-14 border-t border-line">
            {STAGES.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.05}>
                <div className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs text-ink-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors group-hover:text-accent">
                      {item.step}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
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

      {/* ---- Requirements ------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Interface"
                  title="What your system must do"
                  lede="Short list, strictly enforced. Everything here exists because its absence has broken a real integration."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="border-t border-line">
                {REQUIREMENTS.map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.05}>
                    <div className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                      <div className="sm:col-span-4">
                        <h3 className="font-display text-lg uppercase leading-tight tracking-wide text-white">
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

      {/* ---- Specification ------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <Eyebrow>Programme terms</Eyebrow>
          </Reveal>
          <div className="mt-10">
            <SpecTable specs={SPECS} />
          </div>
        </div>
      </section>

      {/* ---- CTA ---------------------------------------------------------- */}
      <section className="section">
        <div className="container">
                      <div className="border border-line bg-panel/40 p-8 sm:p-14">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-8">
                  <p className="eyebrow">Integration enquiries</p>
                  <h2 className="display-md mt-5 text-white">Request the interface specification</h2>
                  <p className="body-copy mt-5 max-w-2xl">
                    The grid interface specification and conformance harness are released under
                    NDA to qualified partners. Tell us what your system senses or services and we
                    will scope the integration.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <Link to="/contact" className="btn-primary w-full justify-center lg:w-auto">
                    Contact the platform office
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/valley" className="btn-secondary w-full justify-center lg:w-auto">
                    Back to Valley
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default ValleyPartnerProgram;
