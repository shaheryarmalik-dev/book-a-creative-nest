import { useEffect, useRef } from "react";

// Import all location images
const imagesGlob = import.meta.glob(
  "/src/assets/locations/artsy-modern-apt-film-studio/*.jpg",
  { eager: true, query: "?url", import: "default" }
);

const images = Object.keys(imagesGlob)
  .sort()
  .map((key) => (imagesGlob as Record<string, string>)[key]);

interface ImageCarouselProps {
  compact?: boolean;
}

const ImageCarousel = ({ compact = false }: ImageCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1; // pixels per frame
    const scrollSpeed = 30; // ms per frame

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset when reaching the end (seamless loop)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, scrollSpeed);

    return () => clearInterval(intervalId);
  }, []);

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  if (compact) {
    return (
      <div className="overflow-hidden bg-white/90 backdrop-blur-md py-6 shadow-2xl">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] h-[220px] rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 hover:border-primary/60 transition-all duration-300 hover:scale-105"
            >
              <img
                src={image}
                alt={`Creative space ${(index % images.length) + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="py-12 bg-secondary overflow-hidden">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Featured Spaces
        </h2>
        <p className="text-muted-foreground">
          Discover our stunning collection of creative locations
        </p>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[400px] h-[300px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={image}
              alt={`Creative space ${(index % images.length) + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ImageCarousel;
