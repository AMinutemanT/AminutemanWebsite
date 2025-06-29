import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Wingmans } from './pages/Wingmans';
import { InterceptorA } from './pages/air-systems/InterceptorA';
import { InterceptorB } from './pages/air-systems/InterceptorB';
import { InterceptorC } from './pages/air-systems/InterceptorC';
import { ValleyCommandControl } from './pages/valley/ValleyCommandControl';
import { ValleyMissionAutonomy } from './pages/valley/ValleyMissionAutonomy';
import { ValleyPartnerProgram } from './pages/valley/ValleyPartnerProgram';
import { TwinTurboEngine } from './pages/jet-engines/TwinTurboEngine';
import { AnkosaA } from './pages/jet-engines/AnkosaA';
import { AnkosaB } from './pages/jet-engines/AnkosaB';

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
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/wingmans" element={<PageTransition><Wingmans /></PageTransition>} />
        <Route path="/air-systems/interceptor-a" element={<PageTransition><InterceptorA /></PageTransition>} />
        <Route path="/air-systems/interceptor-b" element={<PageTransition><InterceptorB /></PageTransition>} />
        <Route path="/air-systems/interceptor-c" element={<PageTransition><InterceptorC /></PageTransition>} />
        <Route path="/valley/command-control" element={<PageTransition><ValleyCommandControl /></PageTransition>} />
        <Route path="/valley/mission-autonomy" element={<PageTransition><ValleyMissionAutonomy /></PageTransition>} />
        <Route path="/valley/partner-program" element={<PageTransition><ValleyPartnerProgram /></PageTransition>} />
        <Route path="/jet-engines/twin-turbo" element={<PageTransition><TwinTurboEngine /></PageTransition>} />
        <Route path="/jet-engines/ankosa-a" element={<PageTransition><AnkosaA /></PageTransition>} />
        <Route path="/jet-engines/ankosa-b" element={<PageTransition><AnkosaB /></PageTransition>} />
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