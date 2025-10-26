import React, { useEffect, useRef } from "react";
import { Plane, Brain, Shield, Target } from "lucide-react";
import { Carousel } from "../../components/Carousel";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";
import TechnicalSpecifications from "../../components/TechnicalSpecifications";

const features = [
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Valley Integration",
    description: "Seamless integration with Valley Command & Control systems.",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Mission Autonomy",
    description: "AI-powered autonomous operation and decision making.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Defensive Capabilities",
    description: "Advanced countermeasures and defensive systems.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Precision Targeting",
    description: "High-accuracy target acquisition and tracking.",
  },
];

const specs = [
  { label: "Range", value: "+100km" },
  { label: "Response Time", value: "< 1.5s" },
  { label: "Valley Integration", value: "Full Suite" },
];

const carouselSlides = [
  {
    title: "Deploy, Dominate, Return",
    description:
      "Vertical take-off and landing (VTOL) functionality provides INTERCEPTOR with expeditionary forward operating base (FOB) compatibility, enabling rapid deployment from austere locations without established airfield infrastructure. System demonstrates minimal logistics footprint with 2+/2 MOS operator support requirement.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=60",
  },
  {
    title: "FLIGHT",
    description:
      "INTERCEPTOR utilizes dual-redundant MIL-SPEC turbofan propulsion systems delivering sustained high-transonic velocity profiles with multi-axis supermaneuvrability exceeding 9G tactical loading capacity.",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=60",
  },
  {
    title: "AUTONOMY",
    description:
      "INTERCEPTOR integrates advanced JADC2-compatible artificial intelligence and multi-tiered autonomous decision matrix systems, allowing single-operator C2 tasking of multiple INTERCEPTOR platforms across distributed battlespace environments.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60",
  },
  {
    title: "INTEROPERABILITY",
    description:
      "INTERCEPTOR works easily with current radar systems, sensors, and defense networks that are already being used today. The system plugs into existing equipment right away with no special changes needed.",
    image:
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=60",
  },
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
        title="Interceptor A"
        subtitle="Advanced Air Defense System with Valley Integration"
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=60"
      />

      <Carousel
        slides={carouselSlides}
        className="bg-gray-900/50 backdrop-blur-sm"
      />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Valley-Powered Defense System"
        description="Interceptor A leverages Valley's advanced command and control systems for superior air defense capabilities. Integrated with Valley Mission Autonomy, it provides automated threat response and tactical decision-making."
        imageUrl="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=60"
        imageAlt="Interceptor A Technology"
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
