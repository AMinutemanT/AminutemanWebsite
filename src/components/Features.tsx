import React from 'react';

interface features {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Features({
  features,
  heading,
  subheading,
}: {
  features: features[];
  heading: string;
  subheading?: string;
}) {
  return (
    <section className="relative py-20 px-4 sm:py-28 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-800 overflow-hidden">
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
