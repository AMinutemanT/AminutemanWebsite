import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img  loading="lazy" 
          src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=60"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-32">
        <div className={`max-w-4xl transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}>
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-2 [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
            Advanced Military Defense Technology Solutions
          </h1>
          <p className="text-center text-sm sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12">
            Pioneering the future of defense with advanced missile systems, AI-powered tactical solutions, and military-grade simulation technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-white/90 transition-colors rounded-lg inline-flex items-center gap-2 group text-base sm:text-lg"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-lg inline-flex items-center gap-2 group text-base sm:text-lg"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}