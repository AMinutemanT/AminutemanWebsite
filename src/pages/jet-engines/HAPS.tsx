export function HAPS() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            loading="lazy"
            src="/src/images/HAPS/hero.webp"
            alt="HAPS Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white">
            HAPS
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg text-black leading-relaxed font-serif">
            A new generation Earth observation service specialising in the acquisition of very high resolution images and live video from the stratosphere.
          </p>
        </div>
      </div>

      {/* Images Gallery Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hero Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/src/images/HAPS/hero.webp"
                  alt="HAPS Hero"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Fin Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/src/images/HAPS/fin.webp"
                  alt="HAPS Fin"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Insky Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/src/images/HAPS/insky.webp"
                  alt="HAPS Insky"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Solar Image */}
            <div className="group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  loading="lazy"
                  src="/src/images/HAPS/solar.txt"
                  alt="HAPS Solar"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}