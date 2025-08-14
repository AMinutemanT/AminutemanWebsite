// IntroSection.tsx
import React from "react";

interface IntroSectionProps {
  sectionRef?: React.RefObject<HTMLDivElement>;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  sectionRef,
  title,
  description,
  imageUrl,
  imageAlt = "Intro Image",
}) => {
  return (
    <div
      ref={sectionRef}
      className="py-20 px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-gray-300 text-lg mb-6">{description}</p>
          </div>
          <img
            loading="lazy"
            src={imageUrl}
            alt={imageAlt}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
