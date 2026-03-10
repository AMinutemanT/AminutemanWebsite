import React, { useEffect, useRef } from "react";
import { Users, Award, Briefcase, GraduationCap } from "lucide-react";
import { Features } from "../../components/Features";
import ProductHero from "../../components/ProductHero";
import IntroSection from "../../components/IntroSection";

const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Network Access",
    description: "Connect with industry leaders and decision makers.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Certification",
    description: "Official partner certification and recognition.",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Business Growth",
    description: "Access to new markets and opportunities.",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Training",
    description: "Advanced technical training and support.",
  },
];

export function ValleyPartnerProgram() {
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    benefits: useRef<HTMLDivElement>(null),
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
        title="Partner Program"
        subtitle="Join Our Elite Network of Defense Technology Partners"
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=60"
      />

      <IntroSection
        sectionRef={sectionRefs.intro}
        title="Strategic Partnership Opportunities"
        description="The Valley Partner Program connects industry leaders, innovators, and experts in defense technology. Our partnership network provides exclusive access to resources, training, and collaboration opportunities to drive innovation in military technology."
        imageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=60"
        imageAlt="Partnership Meeting"
      />

      <div
        ref={sectionRefs.features}
        className="py-20 px-4 bg-gray-900/50 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Key Features" />
      </div>

      <div
        ref={sectionRefs.benefits}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">Partnership Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Business Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Priority access to new technologies
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Co-marketing opportunities
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Revenue sharing programs
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Technical Support
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Dedicated technical support
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Early access to beta features
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      Custom integration assistance
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
