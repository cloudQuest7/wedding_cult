import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Quote, Star, Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { client } from "@/sanity/client";
import { feedbacksQuery } from "@/lib/queries";

interface Review {
  names: string;
  location: string;
  review: string;
}

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);

  const [feedbackData, setFeedbackData] = useState<{
    reviews: Review[];
    stats: { totalReviews: number; averageRating: number; }
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        console.log('🎯 Starting feedback fetch in Reviews component');
        
        const testQuery = '*[_type == "feedback"][0]';
        const singleDoc = await client.fetch(testQuery)
          .catch(err => {
            throw new Error(`Simple query failed: ${err.message}`);
          });
        console.log('📄 Test document:', singleDoc);

        if (!singleDoc) {
          console.log('No feedback documents found. Creating test document...');
        }

        console.log('🔄 Fetching all feedback...');
        const result = await client.fetch(feedbacksQuery)
          .catch(err => {
            throw new Error(`Main query failed: ${err.message}`);
          });
        console.log('✅ Got feedback data:', result);
        
        if (!result) {
          console.error('No data received from Sanity');
          return;
        }
        if (!result.reviews) {
          console.error('No reviews in the response:', result);
          return;
        }
        setFeedbackData(result);
        console.log('Successfully set feedback data:', result.reviews.length, 'reviews');
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const clientReviews: Review[] = feedbackData?.reviews || [
    {
      names: "Sneha & Ritesh",
      location: "Mumbai",
      review: "Magical! We felt like we were in a movie."
    },
    {
      names: "Neha & Arjun",
      location: "Thane",
      review: "Affordable, but so premium. More cinematic than big studios."
    },
    {
      names: "Devika & Sahil",
      location: "Navi Mumbai",
      review: "Itna emotional aur beautiful wedding film kabhi nahi dekha."
    },
    {
      names: "Mira & Aditya",
      location: "Pune",
      review: "Real moments. Real feels. 100% recommend."
    },
    {
      names: "Kavita & Raj",
      location: "Mumbai",
      review: "Jab video dekha toh maa bhi ro padi."
    },
    {
      names: "Ayesha & Aman",
      location: "Andheri",
      review: "Looks like a Netflix show, but feels like home."
    },
    {
      names: "Payal & Sagar",
      location: "Borivali",
      review: "Team was so friendly, yet professional. Full paisa vasool."
    },
    {
      names: "Rhea & Karan",
      location: "Mumbai",
      review: "Every detail was cinematic. Still crying watching it."
    },
    {
      names: "Priya & Vikram",
      location: "Powai",
      review: "Sabse best decision tha ye team choose karna."
    },
    {
      names: "Simran & Rohit",
      location: "Bandra",
      review: "They captured our souls, not just our wedding."
    },
    {
      names: "Ananya & Deepak",
      location: "Juhu",
      review: "Professional yet personal. Bilkul perfect combination."
    },
    {
      names: "Ruchi & Amit",
      location: "Thane",
      review: "Worth every penny. Quality is unmatched."
    },
    {
      names: "Nisha & Aryan",
      location: "Mumbai",
      review: "Made us feel like Bollywood stars on our special day."
    },
    {
      names: "Tanvi & Rajesh",
      location: "Pune",
      review: "Emotions captured beautifully. Family ko bhi pasand aaya."
    },
    {
      names: "Meera & Sameer",
      location: "Vashi",
      review: "Best storytellers in Mumbai. Highly recommended."
    },
    {
      names: "Pooja & Nikhil",
      location: "Malad",
      review: "Budget-friendly but looks like a million-dollar production."
    },
    {
      names: "Shruti & Karthik",
      location: "Chennai",
      review: "Travelled from Chennai. Totally worth it!"
    },
    {
      names: "Manisha & Rahul",
      location: "Mumbai",
      review: "Har frame mein pyaar dikh raha hai. Amazing work!"
    },
    {
      names: "Divya & Suresh",
      location: "Kandivali",
      review: "They don't just shoot, they create magic."
    },
    {
      names: "Aarti & Vishal",
      location: "Dadar",
      review: "Best investment for our wedding. Memories for lifetime."
    },
    {
      names: "Rajesh & Priyanka",
      location: "Delhi",
      review: "Shaadi ka din itna khoobsurat capture hua ki har baar dekh ke aankhon mein aansu aa jaate hain."
    },
    {
      names: "Amit & Pooja",
      location: "Gurgaon",
      review: "Hamare wedding moments ko itni khoobsurti se capture kiya — dil se shukriya!"
    },
    {
      names: "Vikash & Swati",
      location: "Noida",
      review: "Bilkul filmi jaisa laga tha. Sabko lagta hai professional crew tha."
    },
    {
      names: "Rohit & Meera",
      location: "Faridabad",
      review: "Itna beautiful work kiya hai ki dekhte hi reh gaye. Sach mein amazing!"
    },
    {
      names: "Karan & Ishika",
      location: "Mumbai",
      review: "Humari shaadi ko itna royal banaya ki lagta hai hum actors hain."
    }
  ];

  // Mobile-optimized: 1 card per slide on mobile, 2 on tablet, 3 on desktop
  const getCardsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(getCardsPerSlide());
      setCurrentIndex(0); // Reset to first slide when screen size changes
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(clientReviews.length / cardsPerSlide);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.8
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      });

      // Initial cards animation
      animateCardsIn();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance with pause on hover - slower on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = cardsPerSlide === 1 ? 4000 : 5000; // Faster transitions on mobile
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    }, interval);
    
    return () => clearInterval(timer);
  }, [totalSlides, isAutoPlaying, cardsPerSlide]);

  // Animate cards when index changes
  useEffect(() => {
    animateCardsIn();
  }, [currentIndex]);

  const animateCardsIn = () => {
    const startIndex = currentIndex * cardsPerSlide;
    const currentCards = cardsRef.current.slice(startIndex, startIndex + cardsPerSlide);
    
    gsap.fromTo(currentCards, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      rotationX: 5
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    
    // Dot animation
    gsap.to(dotsRef.current[index], {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const handleCardHover = (index) => {
    if (cardsPerSlide === 1) return; // Disable hover effects on mobile
    
    const card = cardsRef.current[currentIndex * cardsPerSlide + index];
    if (!card) return;

    gsap.to(card, {
      y: -10,
      scale: 1.03,
      rotationY: 2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (index) => {
    if (cardsPerSlide === 1) return;
    
    const card = cardsRef.current[currentIndex * cardsPerSlide + index];
    if (!card) return;

    gsap.to(card, {
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex(prev => prev < totalSlides - 1 ? prev + 1 : 0);
    }
    if (isRightSwipe) {
      setCurrentIndex(prev => prev > 0 ? prev - 1 : totalSlides - 1);
    }
  };

  if (isLoading) {
    console.log('Loading feedback data...');
  }

  return (
    <section 
      ref={sectionRef}
      className="py-8 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-6 bg-gradient-to-br from-cream/80 via-background to-beige-light/60 relative overflow-hidden min-h-screen flex flex-col justify-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Modern animated background - Simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-chocolate/5 to-amber-500/5 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tr from-beige-warm/10 to-chocolate/5 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        
        {/* Reduced floating particles for mobile */}
        <div className="absolute inset-0 hidden sm:block">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-2 sm:w-3 h-2 sm:h-3 text-chocolate" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col justify-center">
        {/* Mobile-Optimized Header Section */}
        <div className="text-center mb-8 sm:mb-16 md:mb-20">
          <div className="relative">
            <h2 
              ref={titleRef}
              className="font-amsterdam text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-4xl text-chocolate mb-3 sm:mb-6 leading-tight px-2"
            >
              What Our Couples Say
            </h2>
            <p className="font-playfair text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2">
              Real Stories, Real Love, Real Emotions
            </p>
            
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-8">
              <div className="w-10 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-chocolate to-transparent rounded-full"></div>
              <Heart className="w-4 sm:w-6 h-4 sm:h-6 text-chocolate animate-pulse" />
              <div className="w-10 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-chocolate to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Reviews Slider */}
        <div className="relative">
          {/* Main slider container with mobile-optimized styling */}
          <div 
            className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/50 to-cream/30 backdrop-blur-sm border border-white/30 shadow-xl sm:shadow-2xl p-4 sm:p-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-all duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className={`min-w-full grid gap-4 sm:gap-6 lg:gap-8 ${
                    cardsPerSlide === 1 ? 'grid-cols-1' :
                    cardsPerSlide === 2 ? 'grid-cols-1 md:grid-cols-2' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {clientReviews.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((review, index) => (
                    <div
                      key={slideIndex * cardsPerSlide + index}
                      ref={(el) => cardsRef.current[slideIndex * cardsPerSlide + index] = el}
                      className="group relative bg-white/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-white/50 cursor-pointer transform-gpu hover:shadow-2xl transition-all duration-300"
                      onMouseEnter={() => handleCardHover(index)}
                      onMouseLeave={() => handleCardLeave(index)}
                    >
                      {/* Mobile-optimized quote design */}
                      <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-chocolate to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        <Quote className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                      </div>

                      {/* Floating accent - hidden on mobile */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-chocolate/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"></div>

                      {/* Mobile-optimized review content */}
                      <div className="relative pt-2 sm:pt-4 space-y-3 sm:space-y-6">
                        <p className="font-playfair text-foreground text-sm sm:text-base lg:text-lg leading-relaxed italic relative z-10 line-clamp-4 sm:line-clamp-none">
                          "{review.review}"
                        </p>
                        
                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-chocolate/10">
                          <div className="flex-1 min-w-0">
                            <div className="font-amsterdam text-base sm:text-lg lg:text-xl font-bold text-chocolate mb-1 truncate">
                              {review.names}
                            </div>
                            <div className="font-playfair text-muted-foreground text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-chocolate rounded-full animate-pulse flex-shrink-0"></div>
                              <span className="truncate">{review.location}</span>
                            </div>
                          </div>
                          
                          {/* Mobile-optimized rating stars */}
                          <div className="flex items-center gap-0.5 p-1.5 sm:p-2 bg-amber-50 rounded-lg sm:rounded-xl ml-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Modern hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-chocolate/5 via-transparent to-amber-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
                      
                      {/* Subtle border glow on hover - desktop only */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-0 group-hover:ring-1 sm:group-hover:ring-2 group-hover:ring-chocolate/20 transition-all duration-300 hidden sm:block"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile-Optimized Navigation */}
          <div className="flex justify-center items-center mt-6 sm:mt-10 space-x-2 sm:space-x-4">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                ref={(el) => dotsRef.current[index] = el}
                onClick={() => handleDotClick(index)}
                className={`relative transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 sm:w-12 h-2 sm:h-4 bg-gradient-to-r from-chocolate to-amber-600 shadow-md sm:shadow-lg' 
                    : 'w-2 sm:w-4 h-2 sm:h-4 bg-chocolate/30 hover:bg-chocolate/50'
                } rounded-full hover:scale-110 touch-manipulation`}
                aria-label={`Go to review slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-chocolate to-amber-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile swipe indicator */}
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <ChevronLeft className="w-4 h-4" />
              <span>Swipe to navigate</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Desktop navigation arrows - hidden on mobile */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-10">
            <button
              onClick={() => handleDotClick(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1)}
              className="pointer-events-auto -ml-8 w-12 lg:w-14 h-12 lg:h-14 bg-white/95 backdrop-blur-md rounded-xl lg:rounded-2xl shadow-xl flex items-center justify-center text-chocolate hover:bg-white hover:scale-110 transition-all duration-300 border border-chocolate/10"
            >
              <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
            <button
              onClick={() => handleDotClick(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0)}
              className="pointer-events-auto -mr-8 w-12 lg:w-14 h-12 lg:h-14 bg-white/95 backdrop-blur-md rounded-xl lg:rounded-2xl shadow-xl flex items-center justify-center text-chocolate hover:bg-white hover:scale-110 transition-all duration-300 border border-chocolate/10"
            >
              <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
          </div>
        </div>

        {/* Mobile-Optimized Bottom CTA */}
        <div className="text-center mt-8 sm:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-4 sm:px-10 py-4 sm:py-6 bg-gradient-to-r from-white/90 to-cream/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-chocolate/20 shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 max-w-full">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-chocolate to-amber-600 rounded-xl sm:rounded-2xl">
              <Heart className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-playfair text-lg sm:text-xl text-chocolate font-bold mb-1">
                Join Our Family
              </h3>
              <p className="font-playfair text-muted-foreground text-sm sm:text-base">
                500+ couples trust us with their love stories
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-chocolate rounded-full animate-pulse"></div>
             <div className="w-2 sm:w-3 h-2 sm:h-3 bg-chocolate rounded-full animate-pulse delay-500ms"></div>
<div className="w-2 sm:w-3 h-2 sm:h-3 bg-chocolate rounded-full animate-pulse delay-1s"></div>

            </div>
          </div>
        </div>
      </div>

      {/* Enhanced mobile-optimized CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
