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
      className="relative py-20 px-4 sm:py-28 bg-black overflow-hidden transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {title}
          </h2>
        </div>

        {/* Specifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="group bg-transparent border border-white/40 rounded-xl p-8 transition-all duration-300 hover:border-white/60"
            >
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-medium">
                  {spec.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {spec.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
