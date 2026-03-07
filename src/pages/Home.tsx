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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Hero />
      
      {/* Tagline Section */}
      <section className="relative py-20 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center leading-none">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-blue-400/60 tracking-widest uppercase select-none [text-shadow:_0_0_30px_rgb(59_130_246_/_20%)]">
              SHAPING
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white italic tracking-wider select-none -my-2">
              the
            </div>
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-blue-400/60 tracking-widest uppercase select-none [text-shadow:_0_0_30px_rgb(59_130_246_/_20%)]">
              DETERRENCE
            </div>
          </div>
        </div>
      </section>
      
      <div 
        ref={sectionRefs.carousel} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Carousel slides={carouselSlides} className="bg-gray-900/50 backdrop-blur-sm" />
      </div>
      
      <div 
        ref={sectionRefs.features} 
        className="transform transition-all duration-1000 opacity-0 translate-y-10"
      >
        <Features features={features} heading='Advancing Military Defense Technology' subheading='Our cutting-edge solutions combine advanced propulsion, AI systems, and precision control for superior military capabilities.' />
      </div>
      
      {/* Leadership Section */}
      <section className="relative py-20 px-4 sm:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Layout */}
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              
              {/* Left Column - Header and Content */}
              <div className="lg:col-span-3">
                {/* Header */}
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 bg-blue-400 rounded-sm" />
                    <span className="text-sm font-bold text-blue-300 tracking-widest uppercase">Leadership</span>
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-black text-white tracking-wider leading-tight uppercase">
                    Our Vision
                  </h2>
                </div>

                {/* Founder Vision Content */}
                <div className="flex flex-col justify-center h-full relative">
                  
                  
                  <div className="relative z-10 pl-8 pr-4">
                    <p className="text-base text-gray-300 leading-relaxed text-justify">
                      At <span className="font-bold text-white">Aminuteman Technologies</span>, I envision a future where defense technology is not just reactive but intelligent — systems that think, decide, and act with autonomy. Our goal is to shift the paradigm of defense readiness from dependence on maintenance to true self-sustainability, where machines become sentient guardians of national security. Through <span className="font-semibold text-blue-400">Valley AI</span>, the world's first Physical AI Operating System, we are building the brain for autonomous defense hardware — capable of real-time decision-making on the edge. This mission is deeply aligned with <span className="font-semibold text-blue-400">Atmanirbhar Bharat</span>, driving India toward complete defense sovereignty by engineering indigenous, AI-driven systems that reduce human risk, enhance strategic agility, and ensure that the burden of danger is borne by technology, not our soldiers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="lg:col-span-2 relative">
                <div className="relative border-2 border-gray-600 p-6 bg-gray-800/50 backdrop-blur-sm">
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
            </div>

            {/* Om Panchal - Co-Founder */}
            <div className="grid lg:grid-cols-5 gap-16 items-center mt-24">

              {/* Left Column - Image */}
              <div className="lg:col-span-2 relative order-2 lg:order-1">
                <div className="relative border-2 border-gray-600 p-6 bg-gray-800/50 backdrop-blur-sm">
                  <img
                    loading="eager"
                    decoding="sync"
                    src="/ompanchal.jpeg"
                    alt="Om Panchal"
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
                  <h3 className="text-4xl font-bold text-white mb-3">Om Panchal</h3>
                  <p className="text-xl text-blue-300 font-medium">Co-Founder</p>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-3 order-1 lg:order-2 flex items-center lg:-mt-28">
                <div className="flex flex-col justify-center h-full relative w-full">
                  <div className="relative z-10 pl-4 lg:pl-8 pr-4">
                    <p className="text-base text-gray-300 leading-relaxed text-justify">
                      A hands-on aerospace engineer with <span className="font-semibold text-blue-400">10+ years</span> of building, flying, and breaking things — from RC aircraft and UAVs to rockets and lunar lander technology. Currently completing his <span className="font-bold text-white">M.S. Aerospace Engineering at Arizona State University</span>, Om led the design and engineering of NASA's AGEGIS lunar landing pad system at the <span className="font-semibold text-blue-400">Luminosity Lab, ASU</span> — earning the <span className="font-bold text-white">Best System Engineering Award</span> and <span className="font-semibold text-blue-400">$150K in NASA funding</span> at the Big Idea Forum in Las Vegas. A 3× Boeing National Aeromodelling champion at IIT Madras, FAA Part 107 certified drone pilot, and NASA L-Space mission planning committee member, Om brings a field-ready mindset and prototyping obsession — turning napkin sketches into flight-tested hardware that works when it matters.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Clients Section */}
      <div className="py-16 px-4 bg-gray-900/50 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              CLINTELE
            </h3>
            <p className="text-gray-300">
              Delivering Advanced and optimised solution to leading organizations
            </p>
          </div>
          <div className="relative overflow-hidden bg-white py-8 rounded-lg">
            <div className="flex items-center gap-16 animate-scroll whitespace-nowrap">
              {/* First set */}
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/6febd270f3f6a4cf7951703ba0e925a0.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/9e6a710497202d266783a4f5ed0f61ea.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/indian-army-logo-hd-49649.png" 
                  alt="Indian Army" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/logo.jpeg" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/pngwing.com.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/CA.png" 
                  alt="Client Organization" 
                  className="h-28 w-auto object-contain"
                />
              </div>
              {/* Second set - exact duplicate for seamless loop */}
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/6febd270f3f6a4cf7951703ba0e925a0.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/9e6a710497202d266783a4f5ed0f61ea.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/indian-army-logo-hd-49649.png" 
                  alt="Indian Army" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/logo.jpeg" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/pngwing.com.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/CA.png" 
                  alt="Client Organization" 
                  className="h-28 w-auto object-contain"
                />
              </div>
              {/* Third set - for extra smoothness */}
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/6febd270f3f6a4cf7951703ba0e925a0.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/9e6a710497202d266783a4f5ed0f61ea.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/indian-army-logo-hd-49649.png" 
                  alt="Indian Army" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/logo.jpeg" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/pngwing.com.png" 
                  alt="Client Organization" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-40">
                <img 
                  src="/images/collab/CA.png" 
                  alt="Client Organization" 
                  className="h-28 w-auto object-contain"
                />
              </div>
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