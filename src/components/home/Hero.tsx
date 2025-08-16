"use client"
import { ArrowDown } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animations
      gsap.to(".floating-element", {
        y: -20,
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
    <section ref={heroRef} className="relative h-[85vh] sm:h-screen w-full flex items-center justify-center mx-auto px-3 sm:px-6">
      {/* Professional Corner Curves - Smaller on mobile */}
      <div className="absolute inset-0 z-10">
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-black/15 to-transparent rounded-br-[30px] sm:rounded-br-[75px] lg:rounded-br-[100px] backdrop-blur-sm"></div>
        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-bl from-black/15 to-transparent rounded-bl-[30px] sm:rounded-bl-[75px] lg:rounded-bl-[100px] backdrop-blur-sm"></div>
        {/* Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-tr from-black/15 to-transparent rounded-tr-[30px] sm:rounded-tr-[75px] lg:rounded-tr-[100px] backdrop-blur-sm"></div>
        {/* Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-tl from-black/15 to-transparent rounded-tl-[30px] sm:rounded-tl-[75px] lg:rounded-tl-[100px] backdrop-blur-sm"></div>
      </div>

      {/* Professional Location & Date Header - Much closer to top on mobile */}
      <div className="absolute top-2 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-30">
        <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-full border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-xs sm:text-sm font-light">
            <span className="tracking-[0.15em] sm:tracking-[0.2em] uppercase">MUMBAI</span>
            <div className="w-3 sm:w-4 h-px bg-white/40"></div>
            <span className="tracking-[0.1em] sm:tracking-[0.15em] uppercase">INDIA</span>
          </div>
        </div>
      </div>

      {/* Enhanced Video Background - Cropped better for mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          className="w-full h-full object-cover scale-105 sm:scale-110 translate-y-[-5%] sm:translate-y-0"
          src="https://www.youtube.com/embed/jF_kNaTp-KA?autoplay=1&mute=1&loop=1&playlist=jF_kNaTp-KA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="The Wedding Cult Hero Video"
          allow="autoplay; fullscreen"
        />
        {/* Professional Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Professional Brand Text - Same positioning as desktop */}
      <div className="absolute bottom-6 left-6 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-30 max-w-sm sm:max-w-md">
        <div className="space-y-3 sm:space-y-3 lg:space-y-4">
          {/* Location & Date */}
          <div className="flex items-center space-x-3 sm:space-x-3 lg:space-x-4 text-white/80">
            <span className="text-sm sm:text-sm font-light tracking-[0.2em] sm:tracking-[0.2em] uppercase">MUMBAI</span>
            <div className="w-5 sm:w-6 h-px bg-white/40"></div>
            <span className="text-sm sm:text-sm font-light tracking-[0.15em] sm:tracking-[0.15em] uppercase">
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
            </span>
          </div>

          {/* Main Brand Title - Responsive but well-sized */}
          <h1 className="font-amsterdam text-white text-2xl sm:text-4xl md:text-5xl lg:text-4xl font-light tracking-wide leading-snug drop-shadow-2xl">
  The Wedding   Cult
  
</h1>



          {/* Professional Tagline */}
          <div className="space-y-1 sm:space-y-2 text-white/95 text-base sm:text-base lg:text-lg font-light leading-relaxed drop-shadow-lg">
            <p className="italic">"Come and witness the Divine in</p>
            <p className="italic">this soul stirring love story."</p>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center space-x-3 sm:space-x-3">
            <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full"></div>
            <div className="w-10 sm:w-10 lg:w-12 h-px bg-white/60"></div>
            <span className="text-white/70 text-xs font-light tracking-[0.1em] uppercase">Cinematic Films</span>
          </div>
        </div>
      </div>

      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 sm:bottom-6 lg:bottom-8 z-30">
        <div className="flex flex-col items-center space-y-2 sm:space-y-3 text-white/80">
          <div className="w-px h-12 sm:h-14 lg:h-16 bg-gradient-to-b from-transparent to-white/60"></div>
          <ArrowDown className="h-5 w-5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 animate-bounce" />
          <span className="text-xs font-light tracking-[0.1em] uppercase">Scroll</span>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        <div className="floating-element absolute top-1/4 left-1/4 w-2 h-2 sm:w-2 sm:h-2 bg-white/20 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-3/4 right-1/4 w-3 h-3 sm:w-3 sm:h-3 bg-white/15 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/25 rounded-full blur-sm"></div>
      </div>

      {/* Film Grain Effect */}
      <div className="absolute inset-0 z-5 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.4%22/%3E%3C/svg%3E')] animate-pulse"></div>
      </div>
    </section>
  )
}

export default Hero
