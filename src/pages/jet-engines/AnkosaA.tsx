import React, { useEffect, useRef } from "react";
import { Plane, Gauge, Wind, Zap } from "lucide-react";
import { Features } from "../../components/Features";

const features = [
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Compact Design",
    description: "Optimized for tactical aircraft integration.",
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: "Rapid Response",
    description: "Quick throttle response and acceleration.",
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Advanced Cooling",
    description: "Innovative cooling system design.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Digital Control",
    description: "Advanced digital engine control system.",
  },
];

export function AnkosaA() {
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
            src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=60"
            alt="Ankosa A Engine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Ankosa A</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            High-Performance Military Jet Engine
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
                Advanced Propulsion System
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                The Ankosa A engine combines cutting-edge technology with
                exceptional reliability. Designed for tactical aircraft, it
                delivers superior performance across all flight envelopes.
              </p>
            </div>
            <img  loading="lazy"
              src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=60"
              alt="Ankosa A Technology"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features  features={features} heading="Key Features" />
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
                <p className="text-gray-400">Thrust Output</p>
                <p className="text-2xl font-semibold">35,000 lbf</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Weight</p>
                <p className="text-2xl font-semibold">2,400 lbs</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Specific Fuel Consumption</p>
                <p className="text-2xl font-semibold">0.8 lb/lbf-hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
