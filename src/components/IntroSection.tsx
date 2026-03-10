import React from "react";

interface IntroSectionProps {
  sectionRef?: React.RefObject<HTMLDivElement>;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  imageAlt?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  sectionRef,
  title,
  description,
  imageUrl,
  videoUrl,
  imageAlt = "Intro Image",
}) => {
  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:py-28 bg-gray-900 overflow-hidden transform transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative">
            {videoUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl border border-white/10 w-full h-auto"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                loading="lazy"
                src={imageUrl}
                alt={imageAlt}
                className="rounded-xl border border-white/10"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
