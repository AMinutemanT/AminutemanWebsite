import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
};

/**
 * The technologies and products indexes were merged into /ai. Their detail URLs
 * carry the slug straight across, so redirect on the slug rather than listing
 * every programme in REDIRECTS.
 */
function LegacySlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/ai/${slug}` : '/ai'} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
