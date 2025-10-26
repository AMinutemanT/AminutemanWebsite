import React, { useEffect, useRef } from "react";
import { Command, Shield, Cpu, Radio } from "lucide-react";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";

const features = [
  {
    icon: <Command className="w-8 h-8" />,
    title: "Unified Control",
    description:
      "Single interface for managing all military assets and operations.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Communications",
    description: "Military-grade encryption for all data transmission.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI-Powered Analysis",
    description: "Real-time threat assessment and tactical recommendations.",
  },
  {
    icon: <Radio className="w-8 h-8" />,
    title: "Multi-Domain Integration",
    description: "Seamless coordination across air, land, and sea forces.",
  },
];

export function ValleyCommandControl() {
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    capabilities: useRef<HTMLDivElement>(null),
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
        title="Command & Control"
        subtitle="Advanced Command Center Solutions for Military Operations"
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&q=60"
      />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Centralized Control System"
        description="Our Command & Control system provides military commanders with real-time situational awareness and decision-making capabilities. Integrated with AI-powered analytics, it enables rapid response to evolving tactical situations."
        imageUrl="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=60"
        imageAlt="Command Center Interface"
      />

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Key Features" />
      </div>

      <div
        ref={sectionRefs.capabilities}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">System Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Real-Time Operations
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Live tactical mapping and visualization
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Automated threat detection and response
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Multi-sensor data fusion
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Command Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Secure voice and data communications
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Mission planning and execution tools
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      After-action review and analysis
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
