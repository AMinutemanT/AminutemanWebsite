import React, { useEffect, useRef } from "react";
import { Brain, Target, Compass, Cpu } from "lucide-react";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Decision Making",
    description:
      "Advanced algorithms for autonomous decision-making in complex environments.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Dynamic Planning",
    description: "Real-time mission planning and route optimization.",
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: "Adaptive Navigation",
    description: "Intelligent navigation system with obstacle avoidance.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Multi-Agent Coordination",
    description: "Seamless coordination between multiple autonomous systems.",
  },
];

export function ValleyMissionAutonomy() {
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
        title="Mission Autonomy"
        subtitle="AI-Powered Autonomous Mission Planning and Execution"
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60"
      />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Advanced Mission Intelligence"
        description="Our Mission Autonomy system leverages cutting-edge AI to automate mission planning, execution, and adaptation. It enables unmanned systems to operate independently while maintaining strategic objectives and safety parameters."
        imageUrl="https://images.unsplash.com/photo-1580894732444-8fee7c8c6396?auto=format&fit=crop&q=60"
        imageAlt="Autonomous Systems"
      />

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Core Features"/>
      </div>

      <div
        ref={sectionRefs.capabilities}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">Autonomous Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Mission Planning</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Automated route generation
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">Resource optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Risk assessment and mitigation
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Execution Control
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Real-time mission adaptation
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Environmental awareness
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Emergency response protocols
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
