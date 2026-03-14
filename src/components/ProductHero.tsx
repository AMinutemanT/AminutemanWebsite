import React from "react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundType: "image" | "video";
  backgroundSrc: string;
}

const ProductHero: React.FC<HeroProps> = ({
  title = " ",
  subtitle = " ",
  backgroundType,
  backgroundSrc,
}) => {
  return (
    <div className="relative h-[70vh] sm:h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundType === "image" ? (
          <img
            loading="eager"
            fetchPriority="high"
            src={backgroundSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto px-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ProductHero;
