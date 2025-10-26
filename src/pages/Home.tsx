import React, { useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { CTA } from '../components/CTA';
import { Carousel } from '../components/Carousel';
import { Rocket, Brain, Shield, Target } from 'lucide-react';

const carouselSlides = [
  {
    title: "Twin Turbo Jet Engine Manufacturing",
    description: "State-of-the-art manufacturing facility for advanced jet engines with superior performance and reliability.",
    image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=60"
  },
  {
    title: "Interceptor",
    description: "Next-generation interceptors designed for enhanced capabilities and strategic deployment.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=60"
  },
  {
    title: "AI-Powered Tactical Systems",
    description: "Advanced artificial intelligence solutions providing superior agility and situational awareness in combat scenarios.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=60"
  },
  {
    title: "Battlefield scenario",
    description: "Comprehensive simulation systems for tactical scenarios and mission planning with real-time analytics.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=60"
  }
];

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

export function Home() {
  const sectionRefs = {
    features: useRef<HTMLDivElement>(null),
    carousel: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Hero />
      <div 
        ref={sectionRefs.features} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading='Advanced Defense Technology' subheading='Our cutting-edge solutions combine advanced propulsion, AI systems, and precision control for superior military capabilities.' />
      </div>
      <div 
        ref={sectionRefs.carousel} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Carousel slides={carouselSlides} className="bg-gray-900/50 backdrop-blur-sm" />
      </div>
      <div 
        ref={sectionRefs.cta} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <CTA />
      </div>
    </div>
  );
}