import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-8">
          Advancing Military Defense Technology
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Partner with us to revolutionize military capabilities with our advanced missile systems, combat vehicles, and AI-powered tactical solutions.
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
    </section>
  );
}