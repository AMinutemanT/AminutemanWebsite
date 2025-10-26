import React, { useEffect, useRef } from 'react';
import { Award, Target, Users, Shield } from 'lucide-react';

export function About() {
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    values: useRef<HTMLDivElement>(null),
    journey: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
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
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">About Aminuteman</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Pioneering the future of military defense technology through innovation and excellence
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            ref={sectionRefs.intro}
            className="py-20 transform transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-gray-300 text-lg mb-6">
                  At Aminuteman Technologies, we're dedicated to revolutionizing military defense capabilities through cutting-edge technology and innovative solutions. Our mission is to enhance national security and defense preparedness through advanced missile systems, combat vehicles, and AI-powered tactical solutions.
                </p>
                <p className="text-gray-300 text-lg">
                  We envision a future where advanced technology serves as the cornerstone of global security and defense. Through continuous innovation and strategic partnerships, we aim to be at the forefront of military technology development.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                alt="Mission"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          <div
            ref={sectionRefs.values}
            className="py-20 transform transition-all duration-1000 opacity-0 translate-y-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Target className="w-6 h-6 text-white" />,
                  title: "Precision",
                  description: "Delivering accurate and reliable defense systems"
                },
                {
                  icon: <Award className="w-6 h-6 text-white" />,
                  title: "Excellence",
                  description: "Maintaining the highest military standards"
                },
                {
                  icon: <Users className="w-6 h-6 text-white" />,
                  title: "Collaboration",
                  description: "Working with defense forces worldwide"
                },
                {
                  icon: <Shield className="w-6 h-6 text-white" />,
                  title: "Security",
                  description: "Strengthening national defense"
                }
              ].map((value, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={sectionRefs.journey}
            className="py-20 transform transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Journey</h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-white/20">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-0"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">2023</h3>
                  <p className="text-gray-300">Founded with a vision to revolutionize military defense technology</p>
                </div>
                <div className="relative pl-8 border-l border-white/20">
                  <div className="absolute w-4 h-4 bg-blue-500/80 rounded-full -left-2 top-0"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">2024</h3>
                  <p className="text-gray-300">Launched our first AI-powered combat system</p>
                </div>
                <div className="relative pl-8 border-l border-white/20">
                  <div className="absolute w-4 h-4 bg-blue-500/60 rounded-full -left-2 top-0"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">2025</h3>
                  <p className="text-gray-300">Expanded operations with two military technology centers in Pune</p>
                </div>
              </div>
            </div>
          </div>

          {/* ? abckbcka */}
        </div>
      </div>
    </div>
  );
}
