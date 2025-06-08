import React, { useEffect, useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useFBX,
} from "@react-three/drei";
import { Radar, Layers, DollarSign, Plane } from "lucide-react";
import { Loader } from "../components/Loader";
import Model from "../model/Drone_With_cloth.fbx"

function Aircraft() {
  // Using a reliable public GLTF model from Google's Model-Viewer samples
  const scene = useFBX(Model);
  return <primitive object={scene} scale={0.03} position={[0, 0, 0]} />;
}

export function Wingmans() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRefs = {
    model: useRef<HTMLDivElement>(null),
    specs: useRef<HTMLDivElement>(null),
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Wingman Aircraft
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <div
          ref={sectionRefs.model}
          className="w-[80%] mx-auto h-[80vh] relative mb-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Suspense fallback={<Loader />}>
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Aircraft />
              <Environment preset="city" />
              <OrbitControls
                enablePan={true}
                minDistance={2}
                maxDistance={10}
                enableDamping
                dampingFactor={0.05}
                enabled={isHovered}
              />
            </Canvas>
          </Suspense>
        </div>
      </div>

      <div
        ref={sectionRefs.specs}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Wingman Unmanned Aircraft, India
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Manufacturer",
                description: "Aminuteman, India",
              },
              {
                title: "First Flight",
                description: "2026",
              },
              {
                title: "Range",
                description: "1500 km",
              },
              {
                title: "Project Type",
                description: "Unmanned Aircraft",
              },
            ].map((spec, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {spec.title}
                </h3>
                <p className="text-gray-400">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={sectionRefs.intro}
        className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Force Multiplication Doctrine
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                This operational imperative represents a paramount tactical
                challenge. How does one amplify and enhance the combat
                effectiveness of our premier airpower platforms? Through force
                multiplication principles—dramatically expanding battlespace
                dominance capabilities and combat power projection.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                The Wingman functions as an autonomous collaborative combat
                system leveraging advanced CONOPS-integrated human-machine
                teaming architecture to achieve decisive force multiplication
                effects.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                This platform is purpose-engineered for seamless integration
                with fielded air superiority assets, delivering enhanced
                operational persistence, battlespace survivability, and mission
                effectiveness across highly contested A2/AD environments.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80"
              alt="Wingmans Aircraft"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Advanced Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Radar className="w-6 h-6 text-white" />,
                title: "Mission Extension",
                description:
                  "Fuses multi-platform ISR for enhanced battlespace awareness, I&W, and distributed targeting across domains.",
              },
              {
                icon: <Layers className="w-6 h-6 text-white" />,
                title: "Rapid Deployment",
                description:
                  "Open architecture enables quick reconfiguration, software updates, and mission-specific payloads to counter emerging threats.",
              },
              {
                icon: <DollarSign className="w-6 h-6 text-white" />,
                title: "COST-EFFICIENT",
                description:
                  "Delivers 3x combat value at 1/3 cost, with minimal logistics.",
              },
              {
                icon: <Plane className="w-6 h-6 text-white" />,
                title: "Tactical Performance",
                description:
                  "11.7m platform with 2,000+ NM range, 7G maneuverability, and support for autonomous/crewed ops across CENTCOM / INDOPACOM.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
