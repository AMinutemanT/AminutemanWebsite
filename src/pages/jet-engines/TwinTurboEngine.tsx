import React, { useEffect, useRef } from "react";
import { Plane, Gauge, Wind, Zap } from "lucide-react";
import { Features } from "../../components/Features";

const features = [
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Advanced Design",
    description: "Optimized aerodynamics and thermal efficiency.",
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: "High Performance",
    description: "Superior thrust-to-weight ratio and acceleration.",
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Efficient Cooling",
    description: "Advanced thermal management system.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Smart Controls",
    description: "Intelligent engine management system.",
  },
];

export function TwinTurboEngine() {
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    specs: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img  loading="lazy"
            src="https://images.unsplash.com/photo-1599171571332-c99754452072?auto=format&fit=crop&q=60"
            alt="Twin Turbo Engine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Twin Turbo Engine
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Advanced Propulsion System for Military Aircraft
          </p>
        </div>
      </div>

      <div
        ref={sectionRefs.intro}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Next-Generation Engine Technology
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Our Twin Turbo Engine represents the pinnacle of military
                propulsion technology, delivering exceptional thrust-to-weight
                ratio and fuel efficiency. Designed for high-performance
                military aircraft, it sets new standards in reliability and
                performance.
              </p>
            </div>
            <img  loading="lazy"
              src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=60"
              alt="Engine Technology"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Key Features" />
      </div>

      <div
        ref={sectionRefs.specs}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8">
              Technical Specifications
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-gray-400">Thrust Rating</p>
                <p className="text-2xl font-semibold">40,000+ lbf</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Bypass Ratio</p>
                <p className="text-2xl font-semibold">0.8:1</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Service Ceiling</p>
                <p className="text-2xl font-semibold">65,000 ft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
