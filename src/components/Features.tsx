import React, { useEffect } from 'react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Features({
  features,
  heading,
  subheading,
  sectionRef
}: {
  features: FeatureItem[];
  heading: string;
  subheading?: string;
  sectionRef: React.RefObject<HTMLDivElement>;
}) {

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0', 'translate-y-10');
          el.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:py-28 overflow-hidden transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      {/* Decorative glowing orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-40 animate-pulse delay-500" />

      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="bg-gradient-to-tr from-blue-500/20 to-purple-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
