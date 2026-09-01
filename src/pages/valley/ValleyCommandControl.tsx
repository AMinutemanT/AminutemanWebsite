import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { Eyebrow, SectionHeading, StatusTag } from '../../components/ui/HUD';
import { SpecTable } from '../../components/ui/SpecTable';

/* ---------------------------------------------------------------------------
 * Valley / Command & Control, the operator surface. How the picture is held,
 * and how commitment authority is exercised and recorded.
 * ------------------------------------------------------------------------- */

const SURFACE = [
  {
    title: 'One picture, every echelon',
    body: 'A section commander on a tablet and a corps operations centre read the same track store. Detail and authority differ by role; the underlying picture does not fork.',
  },
  {
    title: 'Tracks carry their evidence',
    body: 'Selecting a track shows which sensors contributed, when, and how confident each was. An operator can see why the system believes something before acting on it.',
  },
  {
    title: 'Disagreement stays visible',
    body: 'When two sensors contradict each other the console shows the contradiction rather than averaging it into a false consensus. Ambiguity is information.',
  },
  {
    title: 'Effector pairing, not platform tasking',
    body: 'The operator works the track and is offered the effectors that can service it inside the window, ours and third-party alike, ordered by what closes the engagement.',
  },
  {
    title: 'Authority is explicit',
    body: 'Every console makes plain what the operator is permitted to commit, under whose delegation, and for how long. Nothing about the authority boundary is implicit.',
  },
  {
    title: 'Works degraded',
    body: 'The console holds the last agreed picture through loss of the rear link and marks every track with its age, so an operator always knows what is live and what is remembered.',
  },
];

const COMMITMENT = [
  {
    step: 'Nominate',
    body: 'The grid proposes a track for engagement with its classification, its evidence and the effectors able to reach it. This is a recommendation and is labelled as one.',
  },
  {
    step: 'Review',
    body: 'The operator inspects the contributing sensor returns, the predicted effect and the rules of engagement that apply at that location and time.',
  },
  {
    step: 'Commit',
    body: 'A human authorises. Identity, authority reference and timestamp are bound into the engagement record before any effector is released.',
  },
  {
    step: 'Reconstruct',
    body: 'The complete decision (what was seen, what was proposed, who committed and what resulted) is replayable afterwards for command review and legal audit.',
  },
];

const SPECS = [
  { label: 'Deployment', value: 'On-premise', note: 'Customer infrastructure and key management' },
  { label: 'Echelons', value: 'Section to command', note: 'One track store, role-scoped views' },
  { label: 'Disconnected operation', value: 'Full mission', note: 'Local picture retained and marked by age' },
  { label: 'Commitment authority', value: 'Human, always', note: 'Enforced in software, not in policy' },
  { label: 'Engagement record', value: 'Immutable', note: 'Replayable end to end' },
  { label: 'Client', value: 'Ruggedised & desktop', note: 'Tablet, vehicle console and operations centre' },
  { label: 'Track capacity', value: 'ON REQUEST' },
  { label: 'Decision latency', value: 'ON REQUEST' },
];

export function ValleyCommandControl() {
  useEffect(() => {
    document.title = 'Command & Control, Aminuteman Technologies';
  }, []);

  return (
    <div className="bg-void">
      {/* ---- Header ------------------------------------------------------ */}
      <header className="relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,rgba(255,138,0,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void" />

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
              <span className="text-accent">C2</span>
            </nav>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 font-mono text-xs uppercase tracking-ultra text-accent-soft/80">
              Command &amp; Control
            </p>
            <h1 className="display-xl mt-4 max-w-4xl text-white">
              Decision at the speed of the fight
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              The operator surface of the Valley grid. It holds one picture across every echelon,
              shows why it believes what it believes, and makes the moment of commitment explicit,
              attributable and reviewable.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9">
              <StatusTag status="Operational" />
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
                  A commander does not need more screens. They need one picture they can defend.
                </p>
              </Reveal>
              <div className="mt-10 space-y-6">
                <Reveal delay={0.06}>
                  <p className="body-copy text-base sm:text-lg">
                    Most command systems add a display per sensor and leave correlation to the
                    operator under time pressure. The result is a room full of screens that
                    disagree, and a commander who has to reconcile them in their head while the
                    engagement window closes.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="body-copy text-base sm:text-lg">
                    Valley C2 inverts that. Correlation happens in the grid before it reaches a
                    person, and what reaches the person is a track with its provenance attached.
                    The operator&rsquo;s job becomes judgement (is this what it appears to be, and should we act) rather than clerical reconciliation of contradictory feeds.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Surface ----------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Operator surface"
              index="02"
              title="What the console does"
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {SURFACE.map((item, i) => (
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

      {/* ---- Commitment chain -------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Authority"
              index="03"
              title="How a commitment is made"
              lede="Four steps, and the third is always a person. This sequence is enforced by the software rather than described in a standing order."
            />
          </Reveal>

          <div className="mt-14 border-t border-line">
            {COMMITMENT.map((item, i) => {
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

      {/* ---- Specification ------------------------------------------------ */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <Eyebrow index="04">Specification</Eyebrow>
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
                  <h2 className="display-md mt-5 text-white">Request a console walkthrough</h2>
                  <p className="body-copy mt-5 max-w-2xl">
                    Operator documentation and a scoped evaluation deployment are released to
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

export default ValleyCommandControl;
