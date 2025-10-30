import { useState, useRef, TouchEvent, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Image cache utility to prevent images from being garbage collected
class ImageCache {
  private static instance: ImageCache;
  private cache: Map<string, HTMLImageElement> = new Map();

  static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }

  preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.cache.has(src)) {
        resolve(this.cache.get(src)!);
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.loading = "eager";
      img.decoding = "sync";
      
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  getImage(src: string): HTMLImageElement | null {
    return this.cache.get(src) || null;
  }
}

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(slides.length).fill(false));
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const imageRefsCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Preload and cache all images to prevent them from disappearing
  useEffect(() => {
    const imageCache = ImageCache.getInstance();
    
    const preloadImages = async () => {
      const imageElements: HTMLImageElement[] = [];
      
      const loadPromises = slides.map(async (slide, index) => {
        try {
          const img = await imageCache.preloadImage(slide.image);
          imageElements[index] = img;
          
          setImagesLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
        } catch (error) {
          console.warn(`Failed to preload image: ${slide.image}`, error);
        }
      });
      
      await Promise.all(loadPromises);
      
      // Store references in cache to prevent garbage collection
      imageElements.forEach((img, index) => {
        if (img && slides[index]) {
          imageRefsCache.current.set(slides[index].image, img);
        }
      });
    };

    preloadImages();
    
    // Cleanup function - keep images cached for performance
    return () => {
      // Images remain in cache for future use
    };
  }, [slides]);

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
        <div className="relative w-full rounded-2xl overflow-hidden border carousel-container">
          {/* Main Carousel */}
          <div 
            className="relative"
            data-carousel="true"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => (
              <div
                key={`slide-${index}`}
                className={`transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 z-0'
                }`}
                style={{
                  // Keep all slides in DOM to prevent reloading
                  position: index === currentSlide ? 'relative' : 'absolute',
                  visibility: 'visible', // Always visible to prevent unloading
                }}
              >
                {/* Image Container - Always render to prevent reloading */}
                <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
                  {/* Loading placeholder */}
                  {!imagesLoaded[index] && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-20">
                      <div className="text-white">Loading...</div>
                    </div>
                  )}
                  
                  {/* Image with permanent loading to prevent disappearing */}
                  <img
                    key={`carousel-img-${index}-permanent`}
                    src={slide.image}
                    alt={slide.title}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
                    style={{ 
                      imageRendering: 'auto',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      MozBackfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity',
                      // Force image to stay in memory
                      pointerEvents: 'none',
                      userSelect: 'none',
                      // Prevent image from being optimized away
                      minHeight: '1px',
                      minWidth: '1px',
                    }}
                    onLoad={() => {
                      setImagesLoaded(prev => {
                        const newLoaded = [...prev];
                        newLoaded[index] = true;
                        return newLoaded;
                      });
                    }}
                    onError={(e) => {
                      console.warn(`Image failed to load: ${slide.image}`);
                      const target = e.target as HTMLImageElement;
                      // Don't hide the image, just log the error
                      target.style.backgroundColor = '#374151';
                    }}
                    // Prevent context menu and dragging
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  
                  {/* Content Overlay */}
                  <div className="relative h-full flex items-end bg-gradient-to-t from-black/50 to-transparent">
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