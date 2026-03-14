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
        <img  loading="eager"
          fetchPriority="high"
          src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1920"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32">
        <div className={`max-w-4xl transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}>
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
            Advanced Physical AI Technology Solutions
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Pioneering the future of defense tech and civilian applications with advanced algorithm systems and AI-powered tactical solutions with high-grade simulation and analytical technologies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-lg inline-flex items-center justify-center gap-2 group text-base sm:text-lg font-medium"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-lg inline-flex items-center justify-center gap-2 group text-base sm:text-lg font-medium"
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
