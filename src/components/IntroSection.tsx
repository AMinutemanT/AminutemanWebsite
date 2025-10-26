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
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:py-28 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-800 overflow-hidden transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      {/* Decorative glowing orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-40 animate-pulse delay-500" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img
              loading="lazy"
              src={imageUrl}
              alt={imageAlt}
              className="relative rounded-2xl shadow-2xl border border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
