"use client"

import { useEffect, useRef } from "react"
import { Camera, Film, Heart, Sparkles, Quote } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const About = () => {
  const sectionRef = useRef(null)
  const symbolRef = useRef(null)
  const quoteRef = useRef(null)
  const contentRef = useRef(null)
  const typingCardRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous rotation for the symbol
      gsap.to(symbolRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      })

      // Fast smooth entrance animations
      gsap.fromTo(
        symbolRef.current,
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Fast smooth card animation for typing section
      gsap.fromTo(
        typingCardRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: typingCardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Smooth text reveal animation (replacing typing)
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: typingCardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Fast content cards animation
      gsap.fromTo(
        ".content-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Floating animation for decorative elements
      gsap.to(".floating-element", {
        y: -15,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-background via-beige-light/10 to-background relative overflow-hidden"
    >
      {/* Background decorative elements - FIXED positioning for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-10 left-8 w-2 h-2 sm:w-3 sm:h-3 bg-chocolate/10 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-32 right-12 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-beige-warm/20 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-32 left-12 w-2 h-2 sm:w-4 sm:h-4 bg-chocolate/15 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-16 right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-beige-warm/25 rounded-full blur-sm"></div>
      </div>

      {/* FIXED: Maximum width container with proper padding */}
      <div className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto text-center relative">
        
        {/* Rotating Cinematic Symbol - FIXED sizing */}
        <div className="mb-8 sm:mb-12 md:mb-16 relative">
          <div ref={symbolRef} className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 md:mb-8 relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-2 border-chocolate/30 rounded-full"></div>
            {/* Inner Ring */}
            <div className="absolute inset-1 sm:inset-2 border border-chocolate/20 rounded-full"></div>
            {/* Center Icon */}
            <div className="relative z-10 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-full p-2 sm:p-3 md:p-4 shadow-lg">
              <Film className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-cream" />
            </div>
            {/* Decorative dots - FIXED positioning */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0.5 sm:-translate-y-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-chocolate rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0.5 sm:translate-y-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-chocolate rounded-full"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-0.5 sm:-translate-x-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-chocolate rounded-full"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-0.5 sm:translate-x-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-chocolate rounded-full"></div>
          </div>
        </div>

        {/* Elegant Quote Section - FIXED for small screens */}
        <div ref={quoteRef} className="mb-10 sm:mb-16 md:mb-20">
          <div className="relative w-full max-w-full sm:max-w-3xl md:max-w-4xl mx-auto px-1 sm:px-4">
            {/* Decorative quote marks - FIXED positioning */}
            <Quote className="absolute -top-1 -left-0 sm:-top-2 sm:-left-2 md:-top-4 md:-left-4 w-3 h-3 sm:w-5 sm:h-5 md:w-8 md:h-8 text-chocolate/20 fill-current" />
            <Quote className="absolute -bottom-1 -right-0 sm:-bottom-2 sm:-right-2 md:-bottom-4 md:-right-4 w-3 h-3 sm:w-5 sm:h-5 md:w-8 md:h-8 text-chocolate/20 fill-current rotate-180" />

            {/* FIXED: Much smaller text on mobile */}
            <blockquote className="font-amsterdam text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-chocolate leading-loose sm:leading-snug md:leading-relaxed mb-4 sm:mb-6 md:mb-8 px-3 sm:px-6 md:px-8 break-words">
              "Nothing is ever lost to us as long as we remember it."
            </blockquote>

            <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6 md:mb-8">
              <div className="w-6 sm:w-12 md:w-16 h-px bg-chocolate/30"></div>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-chocolate fill-current" />
              <div className="w-6 sm:w-12 md:w-16 h-px bg-chocolate/30"></div>
            </div>

            <cite className="font-amsterdam text-sm sm:text-lg md:text-xl lg:text-2xl text-chocolate/80 not-italic">- The Wedding Cult</cite>
          </div>
        </div>

        {/* Smooth Loading Text Section - FIXED padding and sizing */}
        <div className="mb-8 sm:mb-12 md:mb-16 w-full max-w-full sm:max-w-3xl md:max-w-4xl mx-auto">
          <div 
            ref={typingCardRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-chocolate/10 relative overflow-hidden mx-1 sm:mx-0"
          >
            {/* Decorative background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-chocolate/5 to-beige-warm/10 opacity-50"></div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-full mb-4 sm:mb-6 md:mb-8 shadow-lg">
                <Film className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-cream" />
              </div>

              {/* FIXED: Much smaller text on mobile */}
              <div 
                ref={textRef}
                className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 md:mb-6 leading-relaxed break-words"
              >
                We don't just shoot weddings, we craft cinematic stories that capture the soul of your love, the laughter of your joy, and the tears of your happiness. Every frame is a memory, every moment is a masterpiece.
              </div>

              <div className="w-8 sm:w-12 md:w-16 lg:w-20 h-0.5 sm:h-1 bg-chocolate/30 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section - FIXED grid and spacing */}
        <div ref={contentRef} className="space-y-6 sm:space-y-8 md:space-y-12">
          {/* Content Cards - FIXED: Single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
            
            {/* Left Card - FIXED sizing and padding */}
            <div className="content-card relative mx-1 sm:mx-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-chocolate/10 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
                {/* Decorative corner */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-chocolate/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-cream" />
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-4 font-playfair text-sm sm:text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                    <p className="group-hover:text-chocolate transition-colors duration-300 break-words">
                      Every wedding is unique. So is our storytelling.
                    </p>
                    <p className="group-hover:text-chocolate transition-colors duration-300 break-words">
                      We always aim to do better than our last project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - FIXED sizing and padding */}
            <div className="content-card relative mx-1 sm:mx-0">
              <div className="bg-gradient-to-br from-chocolate/10 to-beige-warm/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-chocolate/10 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
                {/* Decorative corner */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-chocolate/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-cream" />
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-4 font-playfair text-sm sm:text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                    <p className="group-hover:text-chocolate transition-colors duration-300 break-words">
                      "We craft cinematic experiences that resonate, without the premium studio price tag."
                    </p>
                    <p className="group-hover:text-chocolate transition-colors duration-300 break-words">
                      The Wedding Cult is known for capturing real, raw emotions. We don't force moments, we find them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Element - FIXED spacing */}
          <div className="pt-6 sm:pt-10 md:pt-16">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-chocolate rounded-full animate-pulse"></div>
              <div className="w-8 sm:w-12 md:w-16 lg:w-20 h-px bg-gradient-to-r from-transparent via-chocolate/30 to-transparent"></div>
              <div className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-chocolate/10 rounded-full">
                <Heart className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-chocolate fill-current" />
              </div>
              <div className="w-8 sm:w-12 md:w-16 lg:w-20 h-px bg-gradient-to-r from-transparent via-chocolate/30 to-transparent"></div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-chocolate rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
