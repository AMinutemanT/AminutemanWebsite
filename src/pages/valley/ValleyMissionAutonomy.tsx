import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { GraphicBackdrop } from '../../components/ui/GraphicBackdrop';
import { Eyebrow, SectionHeading, StatusTag } from '../../components/ui/HUD';
import { SpecTable } from '../../components/ui/SpecTable';
import { programmePath } from '../../data/programmes';

/* ---------------------------------------------------------------------------
 * Valley / Mission Autonomy, behaviours that survive disconnection, and the
 * qualification regime that makes them trustworthy forward.
 * ------------------------------------------------------------------------- */

const BEHAVIOURS = [
  {
    title: 'Runs on the airframe',
    body: 'Perception, navigation and mission logic execute on the vehicle. Autonomy is a property of the node, not a service it calls over a link an adversary can take away.',
  },
  {
    title: 'Navigates without GNSS',
    body: 'Terrain-referenced and visual-inertial navigation hold position against the map when satellite navigation is denied, spoofed or simply unavailable.',
  },
  {
    title: 'Re-plans in flight',
    body: 'A changed picture, a lost element or a closed window is resolved on the aircraft. The mission adapts without a round trip to an operator who may be unreachable.',
  },
  {
    title: 'Fails safe, not silent',
    body: 'Loss of link, loss of an element or loss of confidence drives a defined behaviour: hold, return, or abort, declared before launch and never improvised in the air.',
  },
  {
    title: 'Formation before platform',
    body: 'Elements share one track picture over a mesh. Task allocation and lead succession are resolved between aircraft, so losing any single one degrades the formation gracefully.',
  },
  {
    title: 'Bounded by design',
    body: 'Geofences, rules of engagement and authority boundaries are compiled into the mission, not left to a behaviour to respect. The envelope is a constraint, not a suggestion.',
  },
];

const QUALIFICATION = [
  {
    step: 'Specify',
    body: 'A behaviour is written against a stated mission envelope (conditions, boundaries and the failure modes it must handle) before any code is trusted with it.',
  },
  {
    step: 'Simulate',
    body: 'It is exercised against the programme digital twin across the envelope and beyond it, including the degraded and adversarial cases that rarely appear on a range.',
  },
  {
    step: 'Fly',
    body: 'Flight test correlates the twin against the real vehicle. Where they disagree, the model is corrected before the behaviour advances. The round keeps the model honest.',
  },
  {
    step: 'Release',
    body: 'A behaviour is released to a specific airframe, envelope and authority level. Qualification on one platform makes it available to others after re-validation, not by assumption.',
  },
];

const SPECS = [
  { label: 'Execution', value: 'On-airframe', note: 'No rear link required for mission execution' },
  { label: 'Navigation', value: 'GNSS-independent', note: 'Terrain-referenced + visual-inertial' },
  { label: 'Datalink', value: 'Mesh, encrypted', note: 'Frequency-agile, LPI/LPD waveform' },
  { label: 'Formation size', value: 'Up to 24', note: 'Elements under a single operator' },
  { label: 'Commitment authority', value: 'Human, always', note: 'Never delegated to a behaviour' },
  { label: 'Qualification', value: 'Twin-correlated', note: 'Simulation validated against flight test' },
  { label: 'Onboard compute', value: 'ON REQUEST' },
  { label: 'Behaviour library', value: 'ON REQUEST' },
];

export function ValleyMissionAutonomy() {
  useEffect(() => {
    document.title = 'Mission Autonomy, Aminuteman Technologies';
  }, []);

  return (
    <div className="bg-void">
      {/* ---- Header ------------------------------------------------------ */}
      <header className="relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28">
        <GraphicBackdrop seed="Mission Autonomy" />

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
              <span className="text-accent">Autonomy</span>
            </nav>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 font-mono text-xs uppercase tracking-ultra text-accent-soft/80">
              Mission Autonomy
            </p>
            <h1 className="display-xl mt-4 max-w-4xl text-white">
              Autonomy that holds through disconnection
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              The mission behaviours that run on the airframe when the link is gone, and the
              qualification regime that makes a commander willing to launch them.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9">
              <StatusTag status="In trials" />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- Thesis ------------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>The problem</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  An autonomous system that needs its link is a remotely piloted one with extra steps.
                </p>
              </Reveal>
              <div className="mt-10 space-y-6">
                <Reveal delay={0.06}>
                  <p className="body-copy text-base sm:text-lg">
                    Most fielded autonomy degrades to remote control the moment conditions get
                    contested, precisely when it was supposed to earn its place. If the behaviour
                    depends on a datacentre, a satellite fix or a continuous operator, it is not
                    autonomy; it is latency waiting to be exploited.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="body-copy text-base sm:text-lg">
                    We build the opposite case first. The aircraft is assumed to be jammed,
                    without satellite navigation and out of contact, and the mission is expected to
                    continue anyway, within an envelope declared before launch, and with the one
                    decision that matters still reserved for a person.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Behaviours -------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Behaviour" title="What runs on the airframe" />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {BEHAVIOURS.map((item, i) => (
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

      {/* ---- Qualification ----------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Trust"
              title="How a behaviour is qualified"
              lede="Autonomy is only useful if a commander will actually launch it. That is a qualification problem before it is a research one."
            />
          </Reveal>

          <div className="mt-14 border-t border-line">
            {QUALIFICATION.map((item, i) => (
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

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-6">
              <Link
                to={programmePath('aorizon')}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                The sovereign model
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={programmePath('digital-twin')}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
              >
                Digital twins
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Specification ------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <Eyebrow>Specification</Eyebrow>
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
                  <p className="eyebrow">Platform enquiries</p>
                  <h2 className="display-md mt-5 text-white">Discuss an autonomy requirement</h2>
                  <p className="body-copy mt-5 max-w-2xl">
                    Behaviour libraries, envelope documentation and trial results are released to
                    qualified counterparties following end-user certification.
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

export default ValleyMissionAutonomy;
