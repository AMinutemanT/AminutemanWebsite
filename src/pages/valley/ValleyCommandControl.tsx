import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-black text-white">
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
        className="py-20 px-4 bg-black transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading="Key Features" />
      </div>

      <div
        ref={sectionRefs.capabilities}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-transparent border border-white/40 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">System Capabilities</h2>
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

      {/* Advanced Military Defense Section */}
      <div className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Advanced Military Defense<br />Technology Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Pioneering the future of defense with autonomous systems, AI-powered tactical solutions, and military-grade technology for strategic operations.
            </p>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Core Defense Platforms
            </h3>
            <p className="text-lg text-gray-300">
              Indigenous technology sovereignty with battle-tested autonomous systems
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Valley AI Operating System */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 platform-card">
              <h4 className="text-2xl font-semibold text-white mb-4">
                Valley AI Operating System
              </h4>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                GPS-denied autonomous navigation, multi-domain sensor fusion, and real-time tactical adaptation for strategic military operations. Combat-proven AI delivering operational superiority.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Autonomous mission planning and battlefield awareness</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Predictive threat analysis and countermeasure deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Swarm coordination for distributed autonomous operations</span>
                </li>
              </ul>
            </div>

            {/* Ankosha A Kamikaze Platform */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 platform-card">
              <h4 className="text-2xl font-semibold text-white mb-4">
                Ankosha A Kamikaze Platform
              </h4>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Deep-strike autonomous loitering munitions with 1,500km operational range. High-value target elimination with 10-hour persistent surveillance capability.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Fire-and-forget mission profiles in contested environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Precision 20kg warhead for infrastructure disruption</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Minimized operator exposure with autonomous engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Applications Section */}
      <div className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Strategic Applications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              One platform, infinite applications across defense and strategic sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Border Surveillance */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 application-card">
              <h4 className="text-xl font-semibold text-white mb-4">
                Border Surveillance
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Autonomous LAC monitoring with continuous intrusion detection and threat assessment
              </p>
            </div>

            {/* Counter-Terrorism */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 application-card">
              <h4 className="text-xl font-semibold text-white mb-4">
                Counter-Terrorism
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Urban navigation, target tracking, and critical infrastructure protection capabilities
              </p>
            </div>

            {/* Enterprise Automation */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 application-card">
              <h4 className="text-xl font-semibold text-white mb-4">
                Enterprise Automation
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Military-grade AI for business process optimization and workflow intelligence
              </p>
            </div>

            {/* Industrial Security */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 application-card">
              <h4 className="text-xl font-semibold text-white mb-4">
                Industrial Security
              </h4>
              <p className="text-gray-300 leading-relaxed">
                24/7 perimeter surveillance for mining, energy, and remote infrastructure operations
              </p>
            </div>

            {/* Smart Cities */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 application-card">
              <h4 className="text-xl font-semibold text-white mb-4">
                Smart Cities
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Public safety monitoring, traffic optimization, and emergency response coordination
              </p>
            </div>

            {/* International Export */}
            <div className="bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 application-card">
              <h4 className="text-xl font-semibold text-white mb-4">
                International Export
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Allied nation defense cooperation with customizable autonomous systems
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Advantages Section */}
      <div className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Strategic Advantages
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Indigenous defense technology establishing technological sovereignty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-1">GPS-Denied Autonomy</h4>
                <p className="text-gray-300 text-sm">Operational superiority in contested environments without external dependencies</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Combat-Proven AI</h4>
                <p className="text-gray-300 text-sm">Real-time tactical adaptation with predictive threat analysis capabilities</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Technology Sovereignty</h4>
                <p className="text-gray-300 text-sm">Indigenous development without dependency on Western defense suppliers</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Multi-Domain Integration</h4>
                <p className="text-gray-300 text-sm">Seamless coordination across land, air, and strategic infrastructure systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Discuss Strategic Cooperation?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Contact our team to explore how Aminuteman Technologies can support your B2B and strategic operational requirements.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-transparent border-2 border-white text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
