import React, { useEffect, useRef } from 'react';
import { Plane, Gauge, Wind, Zap } from 'lucide-react';

export function AnkosaB() {
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
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
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
          <img 
            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80"
            alt="Ankosa B Engine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Ankosa B</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Enhanced Military Jet Engine Platform
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Advanced Engine Technology</h2>
              <p className="text-gray-300 text-lg mb-6">
                Building on the success of Ankosa A, the Ankosa B introduces enhanced performance capabilities and improved fuel efficiency. Engineered for next-generation military aircraft.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80"
              alt="Ankosa B Technology"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div 
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Key Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "Enhanced Design",
                description: "Improved aerodynamics and efficiency."
              },
              {
                icon: <Gauge className="w-8 h-8" />,
                title: "Superior Performance",
                description: "Increased thrust and better fuel economy."
              },
              {
                icon: <Wind className="w-8 h-8" />,
                title: "Advanced Thermal",
                description: "Next-gen thermal management system."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Smart Integration",
                description: "Enhanced digital control interface."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div 
        ref={sectionRefs.specs}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-gray-400">Maximum Thrust</p>
                <p className="text-2xl font-semibold">38,000 lbf</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Weight</p>
                <p className="text-2xl font-semibold">2,300 lbs</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Specific Fuel Consumption</p>
                <p className="text-2xl font-semibold">0.7 lb/lbf-hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}