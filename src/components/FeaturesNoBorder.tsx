import React from 'react';

interface features {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeaturesNoBorder({
  features,
  heading,
  subheading,
}: {
  features: features[];
  heading: string;
  subheading?: string;
}) {
  return (
    <section className="relative py-20 px-4 sm:py-28 bg-gray-900 overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
