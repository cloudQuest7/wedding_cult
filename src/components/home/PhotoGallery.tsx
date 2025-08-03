import { useState, useEffect } from "react";
const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Wedding photos - 5 homepage gallery images
  const photos = [{
    id: 1,
    url: "https://ik.imagekit.io/7xgikoq8o/6(1).png?updatedAt=1752932936192",
    couple: "Beautiful Moments",
    alt: "Wedding gallery showcase"
  }, {
    id: 2,
    url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32927615.jpg?updatedAt=1752931184071",
    couple: "Love Stories",
    alt: "Cinematic wedding capture"
  }, {
    id: 3,
    url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32862200.jpg?updatedAt=1752931182686",
    couple: "Romantic Moments",
    alt: "Wedding celebration"
  }, {
    id: 4,
    url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-17284627.jpg?updatedAt=1752916089168",
    couple: "Perfect Day",
    alt: "Wedding ceremony capture"
  }, {
    id: 5,
    url: "https://ik.imagekit.io/7xgikoq8o/pexels-909646465-31600964.jpg?updatedAt=1752917490827",
    couple: "Forever Begins",
    alt: "Wedding portrait session"
  }];

  // Auto-advance gallery every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photos.length]);
  return <section className="py-12 sm:py-16 px-4 sm:px-6 bg-beige-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-3 sm:mb-4 animate-fade-in-up mx-0 px-0 md:text-2xl">
            Captured Moments
          </h2>
          <p className="font-playfair text-base sm:text-lg text-muted-foreground animate-fade-in-up px-4 sm:px-0" style={{
          animationDelay: "0.2s"
        }}>
            Every frame tells a story of love, joy, and beautiful beginnings
          </p>
        </div>

        {/* Photo Gallery Carousel */}
        <div className="relative overflow-hidden rounded-xl shadow-2xl group">
          <div className="flex transition-all duration-700 ease-in-out" style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}>
            {photos.map((photo, index) => <div key={photo.id} className="min-w-full relative group">
                <div className="relative overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.alt} 
                    className={`w-full h-auto object-contain transition-all duration-1000 ${
                      index === currentIndex 
                        ? 'scale-105 filter brightness-110' 
                        : 'scale-100 filter brightness-90'
                    }`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-chocolate/90 to-chocolate/70 text-cream px-6 py-3 rounded-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                    <p className="font-amsterdam text-xl font-medium tracking-wide">{photo.couple}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-primary to-primary/70 rounded-full animate-pulse opacity-75" />
                </div>
              </div>)}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 right-6 flex space-x-2">
            {photos.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-cream shadow-glow' : 'bg-cream/50 hover:bg-cream/70'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>

        {/* Manual Navigation for Mobile */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex space-x-2">
            {photos.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-chocolate' : 'bg-chocolate/30 hover:bg-chocolate/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default PhotoGallery;