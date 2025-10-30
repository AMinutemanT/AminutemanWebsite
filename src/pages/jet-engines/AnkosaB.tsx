import { useEffect, useRef } from "react";
import { Plane, Gauge, Wind, Zap } from "lucide-react";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Designed for Accelerated Fielding",
    description: "Leverages advanced rapid prototyping, digital engineering, and an open and modular system design to accelerate the speed from prototyping to production.",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "High-Performance, Multi-Mission Platform",
    description: "Designed to deliver next-generation flight performance with the flexibility to integrate a variety of first or third-party sensors and payloads to support the mission requirements.",
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: "Model-Driven, Field-Tested",
    description: "The digital design is rapidly tested, validated, and iterated by leveraging synthetic pilots and intelligent flight simulation onboard actual aircraft.",
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Affordable Mass Production",
    description: "Commercial off the shelf subsystems and all digital workflow from concept through manufacture, validation, and verification provides rapid and scalable production at a fraction of the cost of a crewed fighter.",
  },
];

export function AnkosaB() {
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
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
        title="Advanced AAV"
        description="Open system architecture is platform agnostic and enables rapid capability insertion and third-party payloads. Modular, missionized nose enables payloads to be quickly swapped out. Trusted autonomy – executes mission elements with minimal increase in workload for crewed platforms. Designed to be 1/10th of the cost of a crewed platform. Purpose-built system leverages advanced manufacturing and digital production capabilities. Leverages Valley OS for mission autocracy."
        videoUrl="/videos/Kamikaze.mp4"
        imageAlt="Ankosa B Technology"
      />

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Key Features" />
      </div>
    </div>
  );
}
