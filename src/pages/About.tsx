import { useState, useEffect, useRef } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";
import { ChevronLeft, ChevronRight, Star, Quote, Heart, Camera, Film, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  const reviews = [
    {
      names: "Sneha & Ritesh",
      location: "Mumbai",
      review: "The Wedding Cult captured our day with raw emotions. It felt magical.",
      rating: 5
    },
    {
      names: "Neha & Arjun",
      location: "Thane",
      review: "Very affordable. Even more cinematic than studios charging 5x.",
      rating: 5
    },
    {
      names: "Devika & Sahil",
      location: "Navi Mumbai",
      review: "We didn't know we could look like a film scene until we saw the video.",
      rating: 5
    },
    {
      names: "Rahul & Manisha",
      location: "Pune",
      review: "Everything felt cinematic. The photos still make us cry.",
      rating: 5
    },
    {
      names: "Mira & Aditya",
      location: "Mumbai",
      review: "Pure magic. From pre-wedding to pheras — every frame felt alive.",
      rating: 5
    },
    {
      names: "Priya & Vikash",
      location: "Mumbai",
      review: "They treated our wedding like their own family celebration.",
      rating: 5
    },
    {
      names: "Ananya & Rohan",
      location: "Thane",
      review: "The storytelling was beyond our expectations. Truly cinematic.",
      rating: 5
    },
    {
      names: "Kavya & Siddharth",
      location: "Mumbai",
      review: "Each shot was like a scene from a beautiful movie.",
      rating: 5
    },
    {
      names: "Isha & Kartik",
      location: "Navi Mumbai",
      review: "They captured emotions we didn't even know we were feeling.",
      rating: 5
    },
    {
      names: "Divya & Arjun",
      location: "Mumbai",
      review: "The best investment we made for our wedding. Absolutely stunning work.",
      rating: 5
    },
    {
      names: "Meera & Ashwin",
      location: "Pune",
      review: "Their attention to detail and artistic vision is unmatched.",
      rating: 5
    },
    {
      names: "Pooja & Nikhil",
      location: "Mumbai",
      review: "Every family member was impressed. They work like silent artists.",
      rating: 5
    },
    {
      names: "Rhea & Varun",
      location: "Thane",
      review: "The way they captured our cultural traditions was breathtaking.",
      rating: 5
    },
    {
      names: "Shreya & Karan",
      location: "Mumbai",
      review: "Professional, creative, and so warm. Made us feel comfortable throughout.",
      rating: 5
    },
    {
      names: "Nidhi & Abhishek",
      location: "Navi Mumbai",
      review: "The final video made us relive every beautiful moment. Tears of joy!",
      rating: 5
    },
    {
      names: "Tara & Ravi",
      location: "Mumbai",
      review: "They understand Indian weddings and capture them with modern artistry.",
      rating: 5
    },
    {
      names: "Sonali & Pranav",
      location: "Pune",
      review: "Quality that surpasses expensive studios. Highly recommend!",
      rating: 5
    },
    {
      names: "Aditi & Sameer",
      location: "Mumbai",
      review: "Our families still talk about how beautiful the coverage was.",
      rating: 5
    },
    {
      names: "Riya & Harsh",
      location: "Thane",
      review: "They made our love story look like a Bollywood romance.",
      rating: 5
    },
    {
      names: "Shweta & Gaurav",
      location: "Mumbai",
      review: "Every penny was worth it. The memories they created are priceless.",
      rating: 5
    }
  ];

 const stats = [
  { number: "100+", label: "Weddings Captured", icon: Camera },
  { number: "8+", label: "Cities Covered", icon: Heart },
  { number: "100%", label: "Happy Couples", icon: Award },
  { number: "5★", label: "Average Rating", icon: Star }
];


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      // About section animation
      gsap.fromTo(aboutRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Reviews animation
      gsap.fromTo(reviewsRef.current,
        { opacity: 0, rotationY: 15, z: -100 },
        {
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const nextReview = () => {
    setCurrentReview(prev => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-beige-light/10 to-background">
      <FloatingBallBackground />
      
      <div className="pt-20 pb-16">
        {/* Elegant Header */}
        <div ref={heroRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-chocolate/10 rounded-full backdrop-blur-sm">
              <Film className="w-4 h-4 text-chocolate" />
              <span className="font-poppins text-sm font-medium text-chocolate">Cinematic Love Stories</span>
            </div>
            
            <h1 className="font-amsterdam text-3xl sm:text-5xl md:text-4xl text-chocolate mb-6 leading-tight">
              About Us & Reviews
            </h1>
            
            <p className="font-playfair text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We don't just film weddings — we narrate love stories through light, emotion, and timeless visuals.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stats, index) => {
              const IconComponent = stats.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-chocolate/10 hover:shadow-xl transition-all duration-500 hover:scale-105">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-chocolate to-chocolate-light rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-1">
                      {stats.number}
                    </div>
                    <div className="font-poppins text-sm text-muted-foreground">
                      {stats.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About Section - Enhanced */}
        <div ref={aboutRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-chocolate/10 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-chocolate/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-chocolate/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-chocolate to-chocolate-light rounded-full mb-6">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-amsterdam text-3xl sm:text-4xl text-chocolate mb-4">
                  Our Story
                </h2>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-6 font-playfair text-base sm:text-lg text-foreground leading-relaxed">
                <div className="bg-chocolate/5 rounded-2xl p-6 border-l-4 border-chocolate">
                  <p className="italic text-chocolate font-medium">
                    "We don't just film weddings — we narrate love stories through light, emotion, and timeless visuals."
                  </p>
                </div>
                
                <p>
                  The Wedding Cult isn't just a studio — we're storytellers who believe real emotions make timeless films. 
                  Based in Mumbai, we capture weddings with cinematic beauty, honesty, and soul.
                </p>
                
                <p>
                  We aim to provide better work than our previous projects, constantly pushing ourselves to create something 
                  extraordinary for every couple who trusts us with their special day.
                </p>
                
                <p>
                  We're more affordable than big-name studios — but our storytelling is stronger. We treat every wedding 
                  like a personal project — never template-based. Each love story deserves its own unique narrative.
                </p>
                
                <div className="bg-gradient-to-r from-beige-warm/30 to-cream/30 rounded-2xl p-6">
                  <p className="italic text-chocolate font-medium text-center">
                    "We always try to do better than our last wedding. Real emotions. Real memories. Timelessly filmed."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Enhanced */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-chocolate/10 rounded-full">
              <Heart className="w-4 h-4 text-chocolate fill-chocolate" />
              <span className="font-poppins text-sm font-medium text-chocolate">Client Love</span>
            </div>
            <h2 className="font-amsterdam text-2xl sm:text-4xl text-chocolate mb-4">
              What Our Couples Say
            </h2>
            <p className="font-playfair text-lg text-muted-foreground max-w-2xl mx-auto">
              Real reviews from real couples whose stories we've had the honor to capture
            </p>
          </div>

          {/* Enhanced Review Carousel */}
          <div ref={reviewsRef} className="relative">
            <div className="bg-gradient-to-br from-white/95 to-beige-light/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-chocolate/10 overflow-hidden">
              {/* Decorative quote marks */}
              <div className="absolute top-6 left-6 text-6xl text-chocolate/10 font-serif">"</div>
              <div className="absolute bottom-6 right-6 text-6xl text-chocolate/10 font-serif rotate-180">"</div>
              
              <div className="text-center relative z-10">
                {/* Enhanced Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-6 w-6 text-gold fill-current mx-0.5 animate-pulse" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                
                {/* Review Text */}
                <blockquote className="font-playfair text-xl sm:text-2xl text-chocolate mb-8 italic leading-relaxed max-w-3xl mx-auto">
                  {reviews[currentReview].review}
                </blockquote>
                
                {/* Couple Info */}
                <div className="bg-chocolate/5 rounded-2xl p-6 inline-block">
                  <div className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-2">
                    {reviews[currentReview].names}
                  </div>
                  <div className="font-poppins text-muted-foreground flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-chocolate rounded-full"></div>
                    {reviews[currentReview].location}
                    <div className="w-2 h-2 bg-chocolate rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation Buttons */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={prevReview} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-chocolate/20 hover:bg-chocolate hover:text-cream hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={nextReview} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-chocolate/20 hover:bg-chocolate hover:text-cream hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Enhanced Review Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {reviews.slice(0, 10).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentReview === index 
                      ? "w-8 h-3 bg-chocolate shadow-lg" 
                      : "w-3 h-3 bg-chocolate/30 hover:bg-chocolate/50 hover:scale-125"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div ref={ctaRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-chocolate via-chocolate-light to-chocolate rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Animated decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1s"></div>

            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Camera className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="font-amsterdam text-2xl sm:text-2xl md:text-3xl text-white mb-4">
                Ready to Join Our Story?
              </h2>
              <p className="font-playfair text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's create something beautiful together. Your love story deserves cinematic treatment.
              </p>
              
              <a 
                href="/contact" 
                className="group inline-flex items-center justify-center bg-white text-chocolate px-8 py-4 rounded-2xl font-poppins font-semibold text-lg hover:bg-cream transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                Let's Begin Your Story
                <Heart className="ml-3 w-5 h-5 group-hover:scale-125 transition-transform duration-300 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <SocialFloatingButton />
    </div>
  );
};

export default About;
