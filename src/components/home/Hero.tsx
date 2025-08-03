import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import brandLogo from "@/assets/brand-logo.png";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      title: "PreWedding Flat ₹35K",
      subtitle: "Complete Photography Package",
      description: "Professional pre-wedding shoot with unlimited photos & 50+ edited images",
      bg: "bg-gradient-to-r from-rose-500/90 to-pink-600/90"
    },
    {
      title: "Wedding Photography",
      subtitle: "Starting from ₹50K",
      description: "Capture your special day with our premium wedding photography services",
      bg: "bg-gradient-to-r from-purple-500/90 to-indigo-600/90"
    },
    {
      title: "Couple Photoshoot",
      subtitle: "Special Offer ₹15K",
      description: "Beautiful couple portraits with professional editing & prints",
      bg: "bg-gradient-to-r from-amber-500/90 to-orange-600/90"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <section className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Brand Logo */}
      <div className="absolute top-4 left-4 z-20">
        <img src="https://ik.imagekit.io/7xgikoq8o/1751227659683_PhotoGrid%20(1).png?updatedAt=1752124024635" alt="The Wedding Cult Logo" className="h-20 w-auto sm:h-24 md:h-28 lg:h-32" />
      </div>

      {/* Auto-sliding Offer Overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg pointer-events-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl mx-4">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0'
                }`}
              >
                <div className={`${offer.bg} backdrop-blur-md p-6 text-white text-center border border-white/20`}>
                  <div className="mb-2">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-white" />
                  </div>
                  <h3 className="font-poppins font-bold text-2xl mb-2">{offer.title}</h3>
                  <p className="font-playfair text-lg mb-3 text-white/90">{offer.subtitle}</p>
                  <p className="text-sm opacity-90 mb-4 leading-relaxed">{offer.description}</p>
                  <Link to="/contact">
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 font-medium px-6 py-2">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Slide indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white scale-110' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe className="w-full h-full object-cover scale-125" src="https://www.youtube.com/embed/jF_kNaTp-KA?autoplay=1&mute=1&loop=1&playlist=jF_kNaTp-KA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1" title="The Wedding Cult Hero Video" allow="autoplay; fullscreen" />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-chocolate/5 to-chocolate/15" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-cream px-4 sm:px-6 md:px-8 animate-fade-in-up">
        <div className="mb-4 sm:mb-8">
          
        </div>
        
        <h1 style={{
        animationDelay: "0.3s"
      }} className="font-amsterdam text-2xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 sm:mb-6 animate-fade-in-down leading-tight px-2 sm:px-4 py-4 sm:py-8 md:py-12">
          The Wedding Cult
        </h1>
        
        <div className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto animate-fade-in-up leading-relaxed px-4" style={{
        animationDelay: "0.6s"
      }}>
          <p className="mb-1 sm:mb-2">Quality, the way you deserve.</p>
          <p className="mb-1 sm:mb-2">Story, the way you want.</p>
          <p className="italic">Memories, the way your forever begins.</p>
        </div>
        
        <Link to="/portfolio">
          <Button size="lg" className="bg-cream text-chocolate hover:bg-beige-light font-poppins font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-glow hover:shadow-romantic transition-smooth animate-fade-in-up" style={{
          animationDelay: "0.9s"
        }}>
            <Heart className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            View Our Work
          </Button>
        </Link>
        
        {/* Scroll Down Arrow */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <ArrowDown className="h-6 w-6 sm:h-8 sm:w-8 text-cream/80" />
        </div>
      </div>
    </section>
  );
};
export default Hero;