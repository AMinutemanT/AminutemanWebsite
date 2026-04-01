import { useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { CTA } from '../components/CTA';
import { Carousel } from '../components/Carousel';
import { Rocket, Brain, Shield, Target } from 'lucide-react';

const carouselSlides = [
  {
    title: "Valley OS",
    description: "Building state of the Operating System for Data mining, autonomy across all platforms with advanced computational algorithms across hardware, geospatial network, on single command chain",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=60"
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
    title: "Advanced Humanoid",
    description: "State-of-the-art unmanned robots and advanced learning systems for enhanced performance and reliability."
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
    description: "High-accuracy targeting, control and stipulated systems for optimal decision making and reliable performance."
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
    <div className="relative min-h-screen bg-black">
      <Hero />
      
      {/* Tagline Section */}
      <section className="relative py-16 sm:py-24 bg-black">
        <div className="absolute inset-0 bg-black" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center leading-none space-y-1">
            <div className="text-4xl sm:text-6xl lg:text-8xl font-black text-blue-400/60 tracking-[0.15em] uppercase select-none [text-shadow:_0_0_30px_rgb(59_130_246_/_20%)]">
              SHAPING
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white italic tracking-wider select-none">
              the
            </div>
            <div className="text-4xl sm:text-6xl lg:text-8xl font-black text-blue-400/60 tracking-[0.15em] uppercase select-none [text-shadow:_0_0_30px_rgb(59_130_246_/_20%)]">
              DETERRENCE
            </div>
          </div>
        </div>
      </section>
      
      <div 
        ref={sectionRefs.carousel} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Carousel slides={carouselSlides} className="bg-black" />
      </div>
      
      <div 
        ref={sectionRefs.features} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading='Advancing Military Defense Technology' subheading='Our cutting-edge solutions combine advanced propulsion, AI systems, and precision control for superior military capabilities.' />
      </div>
      
      {/* Leadership Section */}
      <section className="relative py-20 px-4 sm:py-28 bg-black overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Layout */}
            <div className="grid lg:grid-cols-5 gap-x-16 gap-y-8 lg:gap-y-12 items-start">

              {/* Header - always first */}
              <div className="lg:col-span-3 order-1">
                <div className="mb-0 lg:mb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 bg-blue-400 rounded-sm" />
                    <span className="text-sm font-bold text-blue-300 tracking-widest uppercase">Leadership</span>
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-black text-white tracking-wider leading-tight uppercase">
                    Our Vision
                  </h2>
                </div>
              </div>

              {/* Image - second on mobile, right column on desktop spanning 2 rows */}
              <div className="lg:col-span-2 lg:row-span-2 relative order-2">
                <div className="relative border-2 border-white/40 p-6 bg-transparent">
                  <img
                    loading="eager"
                    decoding="sync"
                    src="/images/vision.jpg"
                    alt="Company Vision"
                    className="w-full aspect-[4/5] object-cover"
                    style={{ 
                      imageRendering: 'auto',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                  />
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-blue-400" />
                  <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-blue-400" />
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-blue-400" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-blue-400" />
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-4xl font-bold text-white mb-3">Aniruddha Narayan</h3>
                  <p className="text-xl text-blue-300 font-medium">Founder & CEO</p>
                </div>
              </div>

              {/* Founder Vision Content - third on mobile, left column on desktop */}
              <div className="lg:col-span-3 order-3">
                <div className="flex flex-col justify-center h-full relative">
                  <div className="relative z-10 pl-4 lg:pl-8 pr-4">
                    <p className="text-base text-gray-300 leading-relaxed text-justify">
                      At <span className="font-bold text-white">Aminuteman Technologies</span>, I envision a future where defense technology is not just reactive but intelligent — systems that think, decide, and act with autonomy. Our goal is to shift the paradigm of defense readiness from dependence on maintenance to true self-sustainability, where machines become sentient guardians of national security. Through <span className="font-semibold text-blue-400">Valley AI</span>, the world's first Physical AI Operating System, we are building the brain for autonomous defense hardware — capable of real-time decision-making on the edge. This mission is deeply aligned with <span className="font-semibold text-blue-400">Atmanirbhar Bharat</span>, driving India toward complete defense sovereignty by engineering indigenous, AI-driven systems that reduce human risk, enhance strategic agility, and ensure that the burden of danger is borne by technology, not our soldiers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clients Section */}
      <div className="py-16 sm:py-20 px-4 bg-black overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold text-blue-300 tracking-widest uppercase mb-4">
              CLIENTELE
            </h3>
            <p className="text-base text-gray-300">
              Delivering advanced and optimised solutions to leading organizations
            </p>
          </div>
          <div className="relative overflow-hidden bg-white py-8 rounded-lg">
            <div className="flex items-center gap-16 animate-scroll whitespace-nowrap">
              {[...Array(3)].map((_, setIndex) => (
                [
                  { src: '/images/collab/6febd270f3f6a4cf7951703ba0e925a0.png', alt: 'Client Organization' },
                  { src: '/images/collab/9e6a710497202d266783a4f5ed0f61ea.png', alt: 'Client Organization' },
                  { src: '/images/collab/indian-army-logo-hd-49649.png', alt: 'Indian Army' },
                  { src: '/images/collab/logo.jpeg', alt: 'Client Organization' },
                  { src: '/images/collab/pngwing.com.png', alt: 'Client Organization' },
                  { src: '/images/collab/CA.png', alt: 'Client Organization' },
                ].map((logo, i) => (
                  <div key={`${setIndex}-${i}`} className="flex items-center justify-center flex-shrink-0 w-32 sm:w-40">
                    <img src={logo.src} alt={logo.alt} className="h-16 sm:h-20 w-auto object-contain" />
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
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