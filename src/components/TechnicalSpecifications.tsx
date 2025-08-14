// TechnicalSpecifications.tsx
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
    <div
      ref={sectionRef}
      className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {specs.map((spec, index) => (
              <div key={index} className="space-y-2">
                <p className="text-gray-400">{spec.label}</p>
                <p className="text-2xl font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
