import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export function HAPS() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLineWidth(100), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Aquasat title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl sm:text-7xl md:text-9xl font-bold text-white mb-12"
        >
          Aquasat
        </motion.h1>

        {/* Top accent line */}
        <div className="w-full max-w-md mb-12 flex justify-center">
          <div
            className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-[1.5s] ease-out"
            style={{ width: `${lineWidth}%` }}
          />
        </div>

        {/* COMING SOON text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[0.2em] text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)',
            }}
          >
            COMING SOON
          </h2>
        </motion.div>
        

        {/* Pulsing dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-10"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white/70" />
          </span>
        </motion.div>

        {/* Bottom accent line */}
        <div className="w-full max-w-md mt-12 flex justify-center">
          <div
            className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-[1.5s] ease-out delay-200"
            style={{ width: `${lineWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
}
