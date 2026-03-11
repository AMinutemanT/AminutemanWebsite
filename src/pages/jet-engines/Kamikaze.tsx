import React, { lazy, useEffect, useRef } from "react";
import { Plane, Gauge, Wind, Zap } from "lucide-react";
import { Features } from "../../components/Features";
const ProductHero = lazy(() => import("../../components/ProductHero"));
import video from "../../videos/Kamikaze.mp4";
import TechnicalSpecifications from "../../components/TechnicalSpecifications";

import kamikazeImage from "../../images/kamikaze/kamikaze.jpg";
import IntroSection from "../../components/IntroSection";

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

const specs = [
  { label: "Cruise velocity", value: "154 kmph" },
  { label: "Range", value: "1000+ km" },
  { label: "Endurance", value: "9 hrs +" },
];

export function Kamikaze() {
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
      <ProductHero backgroundType="video" backgroundSrc={video} />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Kamikaze Drone System"
        description="The Kamikaze represents a revolutionary leap in unmanned aerial vehicle technology, combining advanced propulsion systems with intelligent autonomous capabilities. Designed for extended reconnaissance and tactical operations, this cutting-edge platform delivers unparalleled endurance and operational flexibility. With its sophisticated flight control systems and adaptive mission parameters, the Kamikaze sets new standards for military UAV performance in contested environments."
        imageUrl={kamikazeImage}
      />

      <div
        ref={sectionRefs.features}
        className=" bg-black transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features
          features={features}
          heading="Key Features"
        />
      </div>

      <TechnicalSpecifications sectionRef={sectionRefs.specs} specs={specs} />
    </div>
  );
}