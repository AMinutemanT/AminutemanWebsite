import React, { useEffect, useRef } from 'react';
import { Plane, Brain, Shield, Target } from 'lucide-react';
import { Carousel } from '../../components/Carousel';

const carouselSlides = [
  {
    title: "Deploy, Dominate, Return",
    description: "Vertical take-off and landing (VTOL) functionality provides INTERCEPTOR with expeditionary forward operating base (FOB) compatibility, enabling rapid deployment from austere locations without established airfield infrastructure. System demonstrates minimal logistics footprint with 2+/2 MOS operator support requirement.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80"
  },
  {
    title: "FLIGHT",
    description: "INTERCEPTOR utilizes dual-redundant MIL-SPEC turbofan propulsion systems delivering sustained high-transonic velocity profiles with multi-axis supermaneuvrability exceeding 9G tactical loading capacity.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80"
  },
  {
    title: "AUTONOMY",
    description: "INTERCEPTOR integrates advanced JADC2-compatible artificial intelligence and multi-tiered autonomous decision matrix systems, allowing single-operator C2 tasking of multiple INTERCEPTOR platforms across distributed battlespace environments.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
  },
  {
    title: "INTEROPERABILITY",
    description: "INTERCEPTOR works easily with current radar systems, sensors, and defense networks that are already being used today. The system plugs into existing equipment right away with no special changes needed.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80"
  }
];

export function InterceptorA() {
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
            src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80"
            alt="Interceptor A"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Interceptor A</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Advanced Air Defense System with Valley Integration
          </p>
        </div>
      </div>

      <Carousel slides={carouselSlides} className="bg-gray-900/50 backdrop-blur-sm" />

      <div 
        ref={sectionRefs.intro}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Valley-Powered Defense System</h2>
              <p className="text-gray-300 text-lg mb-6">
                Interceptor A leverages Valley's advanced command and control systems for superior air defense capabilities. Integrated with Valley Mission Autonomy, it provides automated threat response and tactical decision-making.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80"
              alt="Interceptor A Technology"
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
            Key Capabilities
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "Valley Integration",
                description: "Seamless integration with Valley Command & Control systems."
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Mission Autonomy",
                description: "AI-powered autonomous operation and decision making."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Defensive Capabilities",
                description: "Advanced countermeasures and defensive systems."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Precision Targeting",
                description: "High-accuracy target acquisition and tracking."
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
                <p className="text-gray-400">Range</p>
                <p className="text-2xl font-semibold">+100km</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Response Time</p>
                <p className="text-2xl font-semibold">&lt; 1.5s</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Valley Integration</p>
                <p className="text-2xl font-semibold">Full Suite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}