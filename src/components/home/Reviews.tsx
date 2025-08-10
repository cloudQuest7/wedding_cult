import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Quote, Star, Users, Heart } from "lucide-react";
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
  const statsRef = useRef(null);

  const [feedbackData, setFeedbackData] = useState<{
    reviews: Review[];
    stats: { totalReviews: number; averageRating: number; }
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        console.log('🎯 Starting feedback fetch in Reviews component');
        
        // First check if we have any feedback documents
        console.log('🔍 Testing simple query...');
        const testQuery = '*[_type == "feedback"][0]';
        const singleDoc = await client.fetch(testQuery)
          .catch(err => {
            throw new Error(`Simple query failed: ${err.message}`);
          });
        console.log('📄 Test document:', singleDoc);

        if (!singleDoc) {
          console.log('No feedback documents found. Creating test document...');
          // You might want to create a test document here
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

  const totalSlides = Math.ceil(clientReviews.length / 3);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with morphing effect
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

      // Stats animation
      gsap.fromTo(statsRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
      });

      // Initial cards animation
      animateCardsIn();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [totalSlides, isAutoPlaying]);

  // Animate cards when index changes
  useEffect(() => {
    animateCardsIn();
  }, [currentIndex]);

  const animateCardsIn = () => {
    const currentCards = cardsRef.current.slice(currentIndex * 3, currentIndex * 3 + 3);
    
    gsap.fromTo(currentCards, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotationX: 15
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.15,
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
    const card = cardsRef.current[currentIndex * 3 + index];
    if (!card) return;

    gsap.to(card, {
      y: -10,
      scale: 1.03,
      rotationY: 5,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (index) => {
    const card = cardsRef.current[currentIndex * 3 + index];
    if (!card) return;

    gsap.to(card, {
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  if (isLoading) {
    console.log('Loading feedback data...');
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 bg-gradient-to-r from-beige-light to-cream relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Premium background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full reviews-background"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Premium stats bar */}
          <div 
            ref={statsRef}
            className="inline-flex items-center gap-8 mb-8 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-chocolate/20 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-chocolate" />
              <span className="font-poppins text-sm font-semibold text-chocolate">
                {feedbackData?.stats.totalReviews || "500+"} Couples
              </span>
            </div>
            <div className="w-px h-4 bg-chocolate/30"></div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-poppins text-sm font-semibold text-chocolate ml-1">
                {feedbackData?.stats.averageRating || "4.9"}
              </span>
            </div>
          </div>

          <h2 
            ref={titleRef}
            className="font-amsterdam text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-chocolate mb-6 leading-tight"
          >
            What Our Couples Say
            <span className="block text-xl sm:text-2xl md:text-3xl font-poppins font-light text-muted-foreground mt-2">
              Real Stories, Real Love
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-chocolate to-transparent mx-auto"></div>
        </div>

        {/* Enhanced Reviews Slider */}
        <div className="relative">
          {/* Main slider container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-all duration-700 ease-out slider-transform"
              style={{ '--slide-offset': `-${currentIndex * 100}%` } as React.CSSProperties}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2"
                >
                  {clientReviews.slice(slideIndex * 3, slideIndex * 3 + 3).map((review, index) => (
                    <div
                      key={slideIndex * 3 + index}
                      ref={(el) => cardsRef.current[slideIndex * 3 + index] = el}
                      className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 cursor-pointer transform-gpu"
                      onMouseEnter={() => handleCardHover(index)}
                      onMouseLeave={() => handleCardLeave(index)}
                    >
                      {/* Premium quote icon */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-chocolate to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <Quote className="w-4 h-4 text-white" />
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-chocolate/10 to-transparent rounded-bl-3xl"></div>

                      {/* Review content */}
                      <div className="relative space-y-6">
                        <p className="font-playfair text-foreground text-lg leading-relaxed italic">
                          "{review.review}"
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-poppins font-semibold text-chocolate text-lg">
                              {review.names}
                            </div>
                            <div className="font-poppins text-muted-foreground text-sm flex items-center gap-1">
                              <div className="w-1 h-1 bg-chocolate rounded-full"></div>
                              {review.location}
                            </div>
                          </div>
                          
                          {/* Rating stars */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-chocolate/5 to-amber-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-3">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                ref={(el) => dotsRef.current[index] = el}
                onClick={() => handleDotClick(index)}
                className={`relative transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 h-3 bg-chocolate shadow-lg' 
                    : 'w-3 h-3 bg-chocolate/30 hover:bg-chocolate/50'
                } rounded-full`}
                aria-label={`Go to review slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-chocolate to-amber-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Navigation arrows for desktop */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
            <button
              onClick={() => handleDotClick(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1)}
              className="pointer-events-auto -ml-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-chocolate hover:bg-white transition-all duration-300 hover:scale-110"
            >
              ←
            </button>
            <button
              onClick={() => handleDotClick(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0)}
              className="pointer-events-auto -mr-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-chocolate hover:bg-white transition-all duration-300 hover:scale-110"
            >
              →
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-chocolate/20 shadow-sm">
            <Heart className="w-5 h-5 text-chocolate animate-pulse" />
            <span className="font-poppins text-chocolate font-medium">
              Join 500+ Happy Couples
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-chocolate rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-chocolate rounded-full animate-pulse dot-pulse-1"></div>
              <div className="w-2 h-2 bg-chocolate rounded-full animate-pulse dot-pulse-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
