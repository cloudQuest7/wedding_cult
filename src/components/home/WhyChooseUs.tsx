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
    const icon = card.querySelector('.feature-icon');
    const title = card.querySelector('.feature-title');
    const subtitle = card.querySelector('.feature-subtitle');
    const description = card.querySelector('.feature-description');
    const number = card.querySelector('.feature-number');
    const overlay = card.querySelector('.card-overlay');

    gsap.timeline()
      .to(card, {
        y: -15,
        scale: 1.08,
        rotationY: 5,
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
        scale: 1.3,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, 0.1)
      .to([title, subtitle], {
        color: "#8B4513",
        y: -5,
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
        scale: 1.4,
        color: "#D2691E",
        duration: 0.3,
        ease: "power2.out"
      }, 0.1);
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
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
        y: 10,
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
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-beige-warm to-cream relative overflow-hidden"
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

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div 
            ref={decorativeRef}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="w-16 h-px bg-chocolate"></div>
            <Heart className="w-6 h-6 text-chocolate mx-4" />
            <div className="w-16 h-px bg-chocolate"></div>
          </div>
          
          <h2 
            ref={titleRef}
            className="font-amsterdam text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-chocolate mb-6 leading-tight"
          >
            Why Couples Choose Us
            <span className="block text-2xl sm:text-3xl md:text-4xl font-poppins font-light text-muted-foreground mt-2">
              for Their Special Day
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-chocolate to-transparent mx-auto"></div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
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
                {/* Professional card container */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 overflow-hidden transform-gpu">
                  
                  {/* Gradient overlay on hover */}
                  <div className="card-overlay absolute inset-0 bg-gradient-to-br from-chocolate/5 to-amber-100/20 opacity-0 transition-opacity duration-300"></div>
                  
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-chocolate/10 to-transparent rounded-bl-3xl"></div>
                  
                  {/* Icon container with professional styling */}
                  <div className="relative mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-chocolate/10 to-amber-100/30 rounded-2xl shadow-inner">
                      <IconComponent className="feature-icon w-10 h-10 text-chocolate transition-all duration-300" />
                    </div>
                  </div>

                  {/* Content with hierarchy */}
                  <div className="relative space-y-4">
                    <h3 className="feature-title font-amsterdam text-2xl text-chocolate transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="feature-subtitle font-poppins text-base text-muted-foreground font-medium transition-all duration-300">
                      {feature.subtitle}
                    </p>
                    
                    {/* Enhanced description that appears on hover */}
                    <p className="feature-description font-poppins text-sm text-slate-600 leading-relaxed opacity-0 transform translate-y-2 transition-all duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Professional number styling */}
                  <div className="absolute bottom-4 right-4">
                    <span className="feature-number text-5xl font-bold text-chocolate/10 transition-all duration-300">
                      {feature.number}
                    </span>
                  </div>
                </div>

                {/* Professional accent line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-chocolate to-amber-500 transition-all duration-500 group-hover:w-3/4 rounded-full"></div>
              </div>
            );
          })}
        </div>

        {/* Professional bottom section */}
        <div className="text-center mt-20 lg:mt-28">
          <div className="inline-flex flex-col items-center space-y-4">
            <div className="flex items-center gap-4 text-muted-foreground font-poppins text-sm tracking-wide">
              <div className="w-12 h-px bg-chocolate/30"></div>
              <Heart className="w-4 h-4 text-chocolate" />
              <span className="font-medium">Capturing love stories across India</span>
              <Heart className="w-4 h-4 text-chocolate" />
              <div className="w-12 h-px bg-chocolate/30"></div>
            </div>
            
            {/* Professional badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-chocolate/20 shadow-sm">
              <div className="w-2 h-2 bg-chocolate rounded-full animate-pulse"></div>
              <span className="font-poppins text-sm text-chocolate font-medium">
                Trusted by 500+ couples
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
