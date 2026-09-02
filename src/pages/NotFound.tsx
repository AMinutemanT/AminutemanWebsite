import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GraphicBackdrop } from '../components/ui/GraphicBackdrop';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/HUD';

const ROUTES = [
  { to: '/systems', label: 'Systems', note: 'Air, air defence and space programmes' },
  { to: '/ai', label: 'AI', note: 'The products and the models underneath them' },
  { to: '/valley', label: 'Valley', note: 'The integration grid' },
  { to: '/contact', label: 'Contact', note: 'Programme office' },
];

/**
 * A real not-found page.
 *
 * Unknown URLs used to be redirected to the home page, which is a soft 404:
 * a search engine sees a working page where it asked for one that does not
 * exist, and a person following a stale link is dropped on the home page with
 * no explanation. This says what happened and offers the way back.
 *
 * A static host cannot return a 404 status for a client-routed path, so the
 * page carries noindex instead, which is what keeps it out of the index.
 */
export function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Page not found, Aminuteman Technologies';

    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, follow';
    document.head.appendChild(robots);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    canonical?.remove();

    return () => {
      robots.remove();
      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
        document.head.appendChild(canonical);
      }
    };
  }, []);

  return (
    <div className="bg-void">
      <header className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden border-b border-line pt-40 pb-16 sm:pt-48 sm:pb-20">
        <GraphicBackdrop seed="not-found" />

        <div className="container relative">
          <Reveal direction="none">
            <Eyebrow>Not found</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-6 max-w-4xl text-white">No route to that page</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Nothing is published at{' '}
              <span className="break-all font-mono text-base text-accent">{pathname}</span>. It may
              have moved, or the link may be out of date.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ROUTES.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group flex h-full flex-col justify-between bg-panel/30 p-8 transition-colors duration-300 hover:bg-panel"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                  {r.note}
                </span>
                <span className="mt-10 inline-flex items-center gap-2 font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors group-hover:text-accent">
                  {r.label}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
