import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Camera, Heart, MapPin, Sparkles } from "lucide-react";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const decorativeRef = useRef(null);

  const features = [
    {
      icon: Camera,
      title: "Cinematic Films",
      subtitle: "Real Emotions",
      description: "Every frame tells your unique love story with cinematic precision",
      number: "01."
    },
    {
      icon: Heart,
      title: "Affordable",
      subtitle: "Yet Premium",
      description: "Luxury wedding photography accessible to every couple",
      number: "02."
    },
    {
      icon: Sparkles,
      title: "Custom Stories",
      subtitle: "Every Wedding Unique",
      description: "Tailored approach capturing your personality and style",
      number: "03."
    },
    {
      icon: MapPin,
      title: "Mumbai-Based",
      subtitle: "Available Across India",
      description: "Local expertise with nationwide coverage for destination weddings",
      number: "04."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      });

      // Decorative elements animation
      gsap.fromTo(decorativeRef.current, {
        opacity: 0,
        scale: 0
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)"
      });

      // Enhanced cards animation
      gsap.fromTo(cardsRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationY: 45
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.6,
        ease: "power3.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const icon = card.querySelector('.feature-icon');
    const title = card.querySelector('.feature-title');
    const subtitle = card.querySelector('.feature-subtitle');
    const description = card.querySelector('.feature-description');
    const number = card.querySelector('.feature-number');
    const overlay = card.querySelector('.card-overlay');

    gsap.timeline()
      .to(card, {
        y: -8,
        scale: 1.03,
        rotationY: 2,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, 0)
      .to(icon, {
        rotation: 360,
        scale: 1.2,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, 0.1)
      .to([title, subtitle], {
        color: "#8B4513",
        y: -3,
        duration: 0.3,
        ease: "power2.out"
      }, 0.1)
      .to(description, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, 0.2)
      .to(number, {
        opacity: 0.8,
        scale: 1.2,
        color: "#D2691E",
        duration: 0.3,
        ease: "power2.out"
      }, 0.1);
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const description = card.querySelector('.feature-description');
    const overlay = card.querySelector('.card-overlay');

    gsap.timeline()
      .to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, 0)
      .to(card.querySelector('.feature-icon'), {
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 0)
      .to([
        card.querySelector('.feature-title'),
        card.querySelector('.feature-subtitle')
      ], {
        color: "initial",
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, 0)
      .to(description, {
        opacity: 0,
        y: 5,
        duration: 0.3,
        ease: "power2.out"
      }, 0)
      .to(card.querySelector('.feature-number'), {
        opacity: 0.1,
        scale: 1,
        color: "initial",
        duration: 0.3,
        ease: "power2.out"
      }, 0);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-8 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-6 bg-gradient-to-r from-beige-warm to-cream relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Professional background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px',
            backgroundPosition: '0 0, 30px 30px'
          }}
          className="w-full h-full"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative flex-1 flex flex-col justify-center">
        {/* Mobile-Optimized Header */}
        <div className="text-center mb-6 sm:mb-12 md:mb-16 lg:mb-20">
          <div 
            ref={decorativeRef}
            className="inline-flex items-center justify-center mb-3 sm:mb-6"
          >
            <div className="w-8 sm:w-16 h-px bg-chocolate"></div>
            <Heart className="w-4 sm:w-6 h-4 sm:h-6 text-chocolate mx-2 sm:mx-4" />
            <div className="w-8 sm:w-16 h-px bg-chocolate"></div>
          </div>
          
          <h2 ref={titleRef}
          className="font-amsterdam text-lg sm:text-4xl md:text-4xl lg:text-3xl text-chocolate mb-5 sm:mb-6 leading-snug px-3"
        >
          Why Couples Choose Us
          <span className="block mt-3 text-base sm:text-2xl md:text-3xl font-poppins font-light text-muted-foreground">
            for Their Special Day
          </span>
        </h2>

          
          <div className="w-16 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-chocolate to-transparent mx-auto"></div>
        </div>

        {/* Mobile-Optimized Feature Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => cardsRef.current[index] = el}
                className="group text-center cursor-pointer relative perspective-1000"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Mobile-optimized card container */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 shadow-lg border border-white/50 overflow-hidden transform-gpu h-full min-h-[180px] sm:min-h-[280px] flex flex-col justify-center">
                  
                  {/* Gradient overlay on hover */}
                  <div className="card-overlay absolute inset-0 bg-gradient-to-br from-chocolate/5 to-amber-100/20 opacity-0 transition-opacity duration-300"></div>
                  
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-8 sm:w-16 h-8 sm:h-16 bg-gradient-to-bl from-chocolate/10 to-transparent rounded-bl-2xl sm:rounded-bl-3xl"></div>
                  
                  {/* Icon container with mobile-optimized sizing */}
                  <div className="relative mb-3 sm:mb-6 lg:mb-8">
                    <div className="inline-flex items-center justify-center w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-gradient-to-br from-chocolate/10 to-amber-100/30 rounded-xl sm:rounded-2xl shadow-inner">
                      <IconComponent className="feature-icon w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 text-chocolate transition-all duration-300" />
                    </div>
                  </div>

                  {/* Mobile-optimized content */}
                  <div className="relative space-y-2 sm:space-y-3 lg:space-y-4 flex-1 flex flex-col justify-center">
                    <h3 className="feature-title font-amsterdam text-sm sm:text-xl lg:text-2xl text-chocolate transition-all duration-300 leading-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="feature-subtitle font-poppins text-xs sm:text-sm lg:text-base text-muted-foreground font-medium transition-all duration-300 leading-tight">
                      {feature.subtitle}
                    </p>
                    
                    {/* Enhanced description - hidden on mobile, visible on larger screens */}
                    <p className="feature-description font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed opacity-0 transform translate-y-1 sm:translate-y-4 transition-all duration-300 hidden sm:block">
                      {feature.description}
                    </p>
                  </div>

                  {/* Mobile-optimized number styling */}
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
                    <span className="feature-number text-2xl sm:text-4xl lg:text-5xl font-bold text-chocolate/10 transition-all duration-300">
                      {feature.number}
                    </span>
                  </div>
                </div>

                {/* Professional accent line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 sm:h-1 bg-gradient-to-r from-chocolate to-amber-500 transition-all duration-500 group-hover:w-3/4 rounded-full"></div>
              </div>
            );
          })}
        </div>

        {/* Mobile-optimized bottom section */}
        <div className="text-center mt-6 sm:mt-16 lg:mt-28">
          <div className="inline-flex flex-col items-center space-y-2 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground font-poppins text-xs sm:text-sm tracking-wide">
              <div className="w-6 sm:w-12 h-px bg-chocolate/30"></div>
              <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-chocolate" />
              <span className="font-medium">Capturing love stories across India</span>
              <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-chocolate" />
              <div className="w-6 sm:w-12 h-px bg-chocolate/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
