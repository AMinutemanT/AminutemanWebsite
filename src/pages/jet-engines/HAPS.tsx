import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export function HAPS() {
  const comingSoonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(comingSoonRef, { once: true, margin: '-100px' });
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLineWidth(100), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            loading="lazy"
            src="/images/HAPS/hero.webp"
            alt="Aquasat Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white">
            Aquasat
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg text-black leading-relaxed font-serif">
            A new generation Earth observation service specialising in the acquisition of very high resolution images and live video from the stratosphere.
          </p>
        </div>
      </div>

      {/* Images Gallery Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hero Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/images/HAPS/hero.webp"
                  alt="Aquasat Hero"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Fin Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/images/HAPS/fin.webp"
                  alt="Aquasat Fin"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Insky Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/images/HAPS/insky.webp"
                  alt="Aquasat Insky"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Solar Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/images/HAPS/solar.txt"
                  alt="Aquasat Solar"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon — Cinematic Trailer Section */}
      <div
        ref={comingSoonRef}
        className="relative overflow-hidden bg-black"
        style={{ minHeight: '70vh' }}
      >
        {/* Animated radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4">
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
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-sm sm:text-base md:text-lg text-white/50 tracking-[0.15em] uppercase font-light text-center max-w-xl"
          >
            The next chapter in stratospheric observation
          </motion.p>

          {/* Pulsing dot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.3 }}
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
    </div>
  );
}
