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
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-background via-beige-light/10 to-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-20 w-3 h-3 bg-chocolate/10 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-60 right-32 w-2 h-2 bg-beige-warm/20 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-40 left-40 w-4 h-4 bg-chocolate/15 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-20 right-20 w-2 h-2 bg-beige-warm/25 rounded-full blur-sm"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative">
        {/* Rotating Cinematic Symbol */}
        <div className="mb-16 relative">
          <div ref={symbolRef} className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-8 relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-2 border-chocolate/30 rounded-full"></div>
            {/* Inner Ring */}
            <div className="absolute inset-2 border border-chocolate/20 rounded-full"></div>
            {/* Center Icon */}
            <div className="relative z-10 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-full p-4 shadow-lg">
              <Film className="w-8 h-8 text-cream" />
            </div>
            {/* Decorative dots around the circle */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-chocolate rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-chocolate rounded-full"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-chocolate rounded-full"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-chocolate rounded-full"></div>
          </div>
        </div>

        {/* Elegant Quote Section */}
        <div ref={quoteRef} className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Decorative quote marks */}
            <Quote className="absolute -top-4 -left-4 w-8 h-8 text-chocolate/20 fill-current" />
            <Quote className="absolute -bottom-4 -right-4 w-8 h-8 text-chocolate/20 fill-current rotate-180" />

            <blockquote className="font-amsterdam text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-chocolate leading-relaxed italic mb-8 px-8">
              "Nothing is ever lost to us as long as we remember it."
            </blockquote>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-px bg-chocolate/30"></div>
              <Heart className="w-4 h-4 text-chocolate fill-current" />
              <div className="w-16 h-px bg-chocolate/30"></div>
            </div>

            <cite className="font-amsterdam text-xl sm:text-2xl text-chocolate/80 not-italic">- The Wedding Cult</cite>
          </div>
        </div>

        {/* Smooth Loading Text Section (No more typing) */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div 
            ref={typingCardRef}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-chocolate/10 relative overflow-hidden"
          >
            {/* Decorative background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-chocolate/5 to-beige-warm/10 opacity-50"></div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-full mb-8 shadow-lg">
                <Film className="w-6 h-6 text-cream" />
              </div>

              <div 
                ref={textRef}
                className="font-playfair text-xl sm:text-3xl md:text-4xl mb-6"
              >
                We don't just shoot weddings, we craft cinematic stories that capture the soul of your love, the laughter of your joy, and the tears of your happiness. Every frame is a memory, every moment is a masterpiece.
              </div>

              <div className="w-20 h-1 bg-chocolate/30 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div ref={contentRef} className="space-y-12">
          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left Card */}
            <div className="content-card relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl border border-chocolate/10 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-chocolate/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Camera className="w-8 h-8 text-cream" />
                  </div>

                  <div className="space-y-4 font-playfair text-lg sm:text-xl text-foreground leading-relaxed">
                    <p className="group-hover:text-chocolate transition-colors duration-300">
                      Every wedding is unique. So is our storytelling.
                    </p>
                    <p className="group-hover:text-chocolate transition-colors duration-300">
                      We always aim to do better than our last project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="content-card relative">
              <div className="bg-gradient-to-br from-chocolate/10 to-beige-warm/20 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl border border-chocolate/10 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-chocolate/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-chocolate to-chocolate/80 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Sparkles className="w-8 h-8 text-cream" />
                  </div>

                  <div className="space-y-4 font-playfair text-lg sm:text-xl text-foreground leading-relaxed">
                    <p className="group-hover:text-chocolate transition-colors duration-300">
                      "We craft cinematic experiences that resonate, without the premium studio price tag."

                    </p>
                    <p className="group-hover:text-chocolate transition-colors duration-300">
                      The Wedding Cult is known for capturing real, raw emotions. We don't force moments, we find them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Element */}
          <div className="pt-16">
            <div className="flex items-center justify-center space-x-6">
              <div className="w-2 h-2 bg-chocolate rounded-full animate-pulse"></div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-chocolate/30 to-transparent"></div>
              <div className="inline-flex items-center justify-center w-8 h-8 bg-chocolate/10 rounded-full">
                <Heart className="w-4 h-4 text-chocolate fill-current" />
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-chocolate/30 to-transparent"></div>
              <div className="w-2 h-2 bg-chocolate rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
