import React, { useState, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  title: string;
  description: string;
  image: string;
}

interface CarouselProps {
  slides: Slide[];
  className?: string;
}

export function Carousel({ slides, className = "bg-[#FFEfd5]" }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    
    const touchDiff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isSwiping.current = false;
  };

  return (
    <section className={`py-16 sm:py-20 md:py-24 ${className}`}>
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="relative w-full rounded-2xl overflow-hidden border">
          {/* Main Carousel */}
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0 -z-10'
                }`}
              >
                {/* Image Container */}
                <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${slide.image})`,
                      filter: 'brightness(0.6)' 
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="relative h-full flex items-end">
                    <div className="w-full px-6 sm:px-8 md:px-12 pb-6 sm:pb-8 md:pb-10">
                      <div className="max-w-4xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                          {slide.title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 line-clamp-3 sm:line-clamp-none">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Arrow Navigation - Hidden on Mobile */}
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-black border-t">
            {/* Desktop Navigation */}
            <div className="hidden sm:flex divide-x divide-white">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-1 px-3 py-3 sm:py-4 md:py-5 text-md md:text-lg lg:text-xl text-center transition-colors duration-300 ${
                    index === currentSlide 
                      ? 'text-black bg-white font-bold' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}