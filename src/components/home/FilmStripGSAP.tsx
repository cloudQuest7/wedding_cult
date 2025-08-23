import { useRef, useEffect } from 'react';

const FilmStrip = () => {
  const filmStripRef = useRef(null);
  const containerRef = useRef(null);

  const baseImages = [
    "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488.jpg?updatedAt=1752122341261",
    "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144255.jpg?updatedAt=1752122336598", 
    "https://ik.imagekit.io/7xgikoq8o/pexels-zephyr-events-2153609654-32864600.jpg?updatedAt=1752122336721",
    "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759464.jpg?updatedAt=1752122335592",
    "https://ik.imagekit.io/7xgikoq8o/couple-9210801.jpg?updatedAt=1752218451384",
  ];

  // Duplicate images multiple times for longer scroll
  const images = [...baseImages, ...baseImages, ...baseImages, ...baseImages];

  useEffect(() => {
    const handleScroll = () => {
      if (!filmStripRef.current) return;

      const scrollY = window.scrollY;
      
      // Faster scroll speed
      const translateX = -(scrollY / 1.5);
      
      filmStripRef.current.style.transform = `translateX(${translateX}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="mb-12 sm:mb-16 md:mb-20 w-full container-fix">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-gradient-to-r from-black via-gray-900 to-black py-6 rounded-lg relative shadow-2xl overflow-hidden
                        sm:py-8 sm:rounded-xl sm:shadow-2xl
                        md:py-12 md:rounded-2xl
                        lg:py-16">
          
          <div className="film-strip-container overflow-hidden">
            <div 
              ref={filmStripRef} 
              className="flex gap-3 px-3 min-w-max
                         sm:gap-4 sm:px-4
                         md:gap-6 md:px-6"
            >
              {images.map((src, i) => (
                <div key={i} className="w-32 h-24 flex-shrink-0
                                        sm:w-40 sm:h-32
                                        md:w-56 md:h-40
                                        lg:w-72 lg:h-48
                                        xl:w-80 xl:h-56">
                  <div className="w-full h-full bg-gray-800 rounded-md overflow-hidden border-2 border-gray-600 hover:border-chocolate/70 transition-all duration-500 shadow-xl
                                  sm:rounded-lg sm:shadow-2xl sm:border-2
                                  md:rounded-xl md:border-3">
                    <img 
                      src={src} 
                      alt="Portfolio film strip" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-3 gap-1.5
                          sm:mt-4 sm:gap-2
                          md:mt-6 md:gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-gray-500 rounded-sm opacity-80
                                      sm:w-2 sm:h-2
                                      md:w-3 md:h-3"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;
