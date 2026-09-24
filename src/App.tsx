import { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Valley } from './pages/Valley';
import { CategoryIndex } from './pages/CategoryIndex';
import { ProgrammePage } from './pages/ProgrammePage';
import { ValleyCommandControl } from './pages/valley/ValleyCommandControl';
import { ValleyMissionAutonomy } from './pages/valley/ValleyMissionAutonomy';
import { ValleyPartnerProgram } from './pages/valley/ValleyPartnerProgram';
import { NotFound } from './pages/NotFound';
import { PROGRAMME_BY_SLUG, programmePath } from './data/programmes';

/**
 * Routes the site off one content model:
 *
 *   /systems | /ai              category indexes
 *   /<category>/<slug>          templated programme detail
 *   /valley (+ children)        the platform
 *
 * Older URLs from the previous site are kept alive as redirects so external
 * links and anything already indexed still land somewhere sensible.
 */

/** Legacy path -> current path. */
const REDIRECTS: Record<string, string> = {
  '/air-systems/interceptor-a': '/systems/counter-uas',
  '/air-systems/interceptor-b': '/systems/counter-uas',
  '/air-systems/interceptor-c': '/systems/counter-uas',
  '/kamikaze': '/systems/ankosha',
  '/wingmans': '/systems/ankosha',
  '/air-systems': '/systems',
  '/technologies': '/ai',
  '/products': '/ai',
  '/ai/sovereign-model': '/ai/aorizon',
};

/**
 * The technologies and products indexes were merged into /ai. Their detail URLs
 * carry the slug straight across, so redirect on the slug rather than listing
 * every programme in REDIRECTS.
 */
/**
 * Old /technologies/:slug and /products/:slug URLs. The slug comes straight
 * off the address bar, so it is resolved against the programme list rather
 * than interpolated into a path: an unknown slug lands on the right index
 * instead of putting arbitrary input into a redirect target.
 */
function LegacySlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const programme = slug ? PROGRAMME_BY_SLUG[slug] : undefined;
  if (!programme) return <Navigate to="/ai" replace />;
  return <Navigate to={programmePath(programme.slug)} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      const frame = requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />

        {/* Platform */}
        <Route path="/valley" element={<PageTransition><Valley /></PageTransition>} />
        <Route
          path="/valley/command-control"
          element={<PageTransition><ValleyCommandControl /></PageTransition>}
        />
        <Route
          path="/valley/mission-autonomy"
          element={<PageTransition><ValleyMissionAutonomy /></PageTransition>}
        />
        <Route
          path="/valley/partner-program"
          element={<PageTransition><ValleyPartnerProgram /></PageTransition>}
        />

        {/* Category indexes + templated detail pages */}
        <Route path="/systems" element={<PageTransition><CategoryIndex category="systems" /></PageTransition>} />
        <Route path="/systems/:slug" element={<PageTransition><ProgrammePage category="systems" /></PageTransition>} />
        <Route path="/ai" element={<PageTransition><CategoryIndex category="ai" /></PageTransition>} />
        <Route path="/ai/:slug" element={<PageTransition><ProgrammePage category="ai" /></PageTransition>} />

        {/* Company */}
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

        {/* Legacy URLs */}
        <Route path="/technologies/:slug" element={<LegacySlugRedirect />} />
        <Route path="/products/:slug" element={<LegacySlugRedirect />} />
        {Object.entries(REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        {/* A real not-found page rather than a silent redirect to the home
            page, which search engines treat as a soft 404. */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
  );
}

function App() {
  // One delegated pointer listener drives the spotlight on every card.

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
