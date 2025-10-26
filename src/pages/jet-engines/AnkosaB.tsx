import React, { useEffect, useRef } from "react";
import { Plane, Gauge, Wind, Zap } from "lucide-react";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";
import TechnicalSpecifications from "../../components/TechnicalSpecifications";

const features = [
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Enhanced Design",
    description: "Improved aerodynamics and efficiency.",
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: "Superior Performance",
    description: "Increased thrust and better fuel economy.",
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Advanced Thermal",
    description: "Next-gen thermal management system.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Smart Integration",
    description: "Enhanced digital control interface.",
  },
];

const specs = [
  { label: "Maximum Thrust", value: "38,000 lbf" },
  { label: "Weight", value: "2,300 lbs" },
  { label: "Specific Fuel Consumption", value: "0.7 lb/lbf-hr" },
];

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
      <ProductHero
        title="Ankosa B"
        subtitle="Enhanced Military Jet Engine Platform"
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=60"
      />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Advanced Engine Technology"
        description="Building on the success of Ankosa A, the Ankosa B introduces enhanced performance capabilities and improved fuel efficiency. Engineered for next-generation military aircraft."
        imageUrl="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=60"
        imageAlt="Ankosa B Technology"
      />

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Key Features" />
      </div>

      <TechnicalSpecifications sectionRef={sectionRefs.specs} specs={specs} />
    </div>
  );
}
