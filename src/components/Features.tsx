import React from 'react';
import { Rocket, Brain, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "Advanced Propulsion",
    description: "State-of-the-art rocket motors and propulsion systems for enhanced performance and reliability."
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: "AI-Powered Systems",
    description: "Cutting-edge artificial intelligence for autonomous operation and decision-making."
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Military-Grade Security",
    description: "Advanced encryption and security protocols for mission-critical operations."
  },
  {
    icon: <Target className="w-6 h-6 text-white" />,
    title: "Precision Control",
    description: "High-accuracy targeting and control systems for optimal performance."
  }
];

export function Features() {
  return (
    <section className="relative py-16 sm:py-24 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Advanced Defense Technology
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our cutting-edge solutions combine advanced propulsion, AI systems, and precision control for superior military capabilities.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-700/50"
            >
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}