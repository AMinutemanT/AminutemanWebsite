import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InterceptorB() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img  loading="lazy" 
            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=60"
            alt="Interceptor B"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-white/10 backdrop-blur-sm">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Coming Soon</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Our next-generation Interceptor B is currently in development. Stay tuned for groundbreaking advancements in military aviation technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/air-systems/interceptor-a"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-white/90 transition-colors rounded-lg inline-flex items-center gap-2 group text-base sm:text-lg"
            >
              View Interceptor A
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-lg inline-flex items-center gap-2 group text-base sm:text-lg"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}