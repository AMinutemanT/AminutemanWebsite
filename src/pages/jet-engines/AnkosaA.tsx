import React, { useEffect, useRef } from "react";
import { Plane, Gauge, Wind, Zap } from "lucide-react";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";
import TechnicalSpecifications from "../../components/TechnicalSpecifications";

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

const specs = [
  { label: "Thrust Output", value: "35,000 lbf" },
  { label: "Weight", value: "2,400 lbs" },
  { label: "Specific Fuel Consumption", value: "0.8 lb/lbf-hr" },
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
    <div className="min-h-screen bg-black text-white">
      <ProductHero
        title="Ankosa A"
        subtitle="High-Performance Military Jet Engine"
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1920"
      />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Advanced Propulsion System"
        description="The Ankosa A engine combines cutting-edge technology with exceptional reliability. Designed for tactical aircraft, it delivers superior performance across all flight envelopes."
        imageUrl="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1024"
        imageAlt="Ankosa A Technology"
      />

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-black transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features  features={features} heading="Key Features" />
      </div>

      <TechnicalSpecifications sectionRef={sectionRefs.specs} specs={specs} />
    </div>
  );
}
