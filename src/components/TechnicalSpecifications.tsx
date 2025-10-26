import React from "react";

interface SpecItem {
  label: string;
  value: string;
}

interface TechnicalSpecificationsProps {
  sectionRef?: React.RefObject<HTMLDivElement>;
  title?: string;
  specs: SpecItem[];
}

const TechnicalSpecifications: React.FC<TechnicalSpecificationsProps> = ({
  sectionRef,
  title = "Technical Specifications",
  specs
}) => {
  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:py-28 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-800 overflow-hidden transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      {/* Decorative glowing orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-40 animate-pulse delay-500" />

      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>

        {/* Specifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">
                  {spec.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {spec.value}
                </p>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
