"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const particlesRef = useRef(null)

  // Original wedding photos only
  const photos = [
    {
      id: 1,
      url: "https://ik.imagekit.io/7xgikoq8o/6(1).png?updatedAt=1752932936192",
      couple: "Beautiful & Moments",
      date: "NOV 2024",
    location: "MUMBAI",
      alt: "Wedding gallery showcase",
    },
    {
      id: 2,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32927615.jpg?updatedAt=1752931184071",
      couple:"Love & Stories",
      date: "JUN 2024",
      location: "JAIPUR",
      alt: "Cinematic wedding capture",
    },
    {
      id: 3,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32862200.jpg?updatedAt=1752931182686",
      couple: "Romantic & Moments",
      date: "JUN 2024",
      location: "GOA",
      alt: "Wedding celebration",
    },
    {
      id: 4,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-17284627.jpg?updatedAt=1752916089168",
      couple: "Perfect Days",
      date: "DEC 2024",
      location: "DELHI",
      alt: "Wedding ceremony capture",
    },
    {
      id: 5,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-909646465-31600964.jpg?updatedAt=1752917490827",
      couple: "Forever & Begins",
      date: "OCT 2024",
      location: "UDAIPUR",
      alt: "Wedding portrait session",
    },
  ]

  // Auto-advance gallery every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [photos.length, isAutoPlaying])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Beautiful title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.8,
          ease: "elastic.out(1, 0.6)",
          delay: 0.3,
        },
      )

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50,
          letterSpacing: "0.5em",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.1em",
          duration: 1.5,
          ease: "power3.out",
          delay: 0.8,
        },
      )

      // Floating particles animation
      gsap.to(".floating-particle", {
        y: -30,
        x: 15,
        rotation: 360,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random",
        },
      })

      // Sparkle particles
      gsap.to(".sparkle-particle", {
        scale: 1.5,
        opacity: 0.8,
        rotation: 180,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      })

      // Section entrance animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Cards stagger animation
      gsap.fromTo(
        ".gallery-card",
        { opacity: 0, y: 80, scale: 0.9, rotationY: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Get visible cards for the current view
  const getVisibleCards = () => {
    const cards = []
    // Show 3 cards: previous, current, next
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % photos.length
      cards.push(photos[index])
    }
    return cards
  }

  return (
    <section
      ref={sectionRef}
      className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 bg-gradient-to-b from-cream/30 via-background to-beige-light/20 relative overflow-hidden"
    >
      {/* Beautiful Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Heart particles */}
        <Heart className="floating-particle absolute top-20 left-20 w-4 h-4 text-chocolate/20 fill-current" />
        <Heart className="floating-particle absolute top-40 right-32 w-3 h-3 text-beige-warm/30 fill-current" />
        <Heart className="floating-particle absolute bottom-60 left-40 w-5 h-5 text-chocolate/15 fill-current" />

        {/* Sparkle particles */}
        <Sparkles className="sparkle-particle absolute top-32 left-1/4 w-6 h-6 text-chocolate/25" />
        <Sparkles className="sparkle-particle absolute top-60 right-1/4 w-4 h-4 text-beige-warm/35" />
        <Sparkles className="sparkle-particle absolute bottom-40 left-1/3 w-5 h-5 text-chocolate/20" />

        {/* Star particles */}
        <Star className="floating-particle absolute top-80 right-20 w-3 h-3 text-chocolate/25 fill-current" />
        <Star className="floating-particle absolute bottom-80 left-16 w-4 h-4 text-beige-warm/20 fill-current" />

        {/* Dot particles */}
        <div className="floating-particle absolute top-24 right-40 w-2 h-2 bg-chocolate/20 rounded-full"></div>
        <div className="floating-particle absolute top-72 left-24 w-3 h-3 bg-beige-warm/25 rounded-full"></div>
        <div className="floating-particle absolute bottom-32 right-16 w-2 h-2 bg-chocolate/30 rounded-full"></div>
        <div className="sparkle-particle absolute bottom-72 right-1/3 w-1 h-1 bg-chocolate/40 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Beautiful Animated Title */}
        <div className="text-center mb-10 relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chocolate/5 to-transparent blur-3xl"></div>

          <div className="relative">
            {/* Main Title */}
            <h2
              ref={titleRef}
              className="font-amsterdam text-3xl sm:text-4xl md:text-5xl lg:text-4xl text-chocolate mb-4 leading-tight relative"
              style={{
                textShadow: "0 4px 20px rgba(183, 134, 90, 0.15)",
                fontWeight: "400",
                letterSpacing: "0.02em",
              }}
            >
              Captured Moments
              {/* Decorative elements around title */}
              <div className="absolute -top-4 -left-4 w-8 h-8 opacity-20">
                <Sparkles className="w-full h-full text-chocolate animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -right-6 w-6 h-6 opacity-25">
                <Heart className="w-full h-full text-chocolate fill-current animate-pulse" />
              </div>
            </h2>

            {/* Elegant Subtitle */}
            <p
              ref={subtitleRef}
              className="font-playfair text-lg sm:text-xl md:text-2xl  max-w-4xl mx-auto leading-relaxed"
              style={{
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                fontWeight: "300",
              }}
            >
              Every frame tells a story of love, joy, and beautiful beginnings
            </p>

            {/* Decorative line with particles */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="w-2 h-2 bg-chocolate/30 rounded-full animate-pulse"></div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-chocolate/40 to-transparent"></div>
              <div className="inline-flex items-center justify-center w-8 h-8 bg-chocolate/10 rounded-full">
                <Heart className="w-4 h-4 text-chocolate fill-current animate-pulse" />
              </div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-chocolate/40 to-transparent"></div>
              <div className="w-2 h-2 bg-chocolate/30 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Gallery Cards */}
        <div ref={cardsRef} className="relative">
          {/* Desktop & Tablet View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {getVisibleCards().map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                className={`gallery-card relative group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  index === 1 ? "lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-white border border-chocolate/10">
                  {/* Image */}
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
  <div className="mb-2">
    <div className="flex items-center space-x-2 text-sm font-playfair font-light tracking-wider opacity-90">
      <span>{photo.date}</span>
      <span>—</span>
      <span>{photo.location}</span>
    </div>
  </div>
  <h3 className="font-playfair text-xl sm:text-2xl lg:text-xl font-normal tracking-wide leading-snug">
  {photo.couple}
</h3>




</div>


                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="md:hidden mb-12">
            <div className="gallery-card relative group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-white border border-chocolate/10">
                <img
                  src={photos[currentIndex].url || "/placeholder.svg"}
                  alt={photos[currentIndex].alt}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
  {/* Date + Location */}
  <div className="flex items-center space-x-2 text-xs sm:text-sm font-poppins font-light tracking-wider opacity-90 mb-1">
    <span>{photos[currentIndex].date}</span>
    <span>—</span>
    <span>{photos[currentIndex].location}</span>
  </div>

  {/* Couple Name */}
  <h3 className="font-playfair text-lg sm:text-xl lg:text-2xl font-light tracking-wide leading-snug">
    {photos[currentIndex].couple}
  </h3>
</div>

              </div>
            </div>
          </div>

          {/* Navigation Arrows - Mobile Only */}
          <div className="md:hidden">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-chocolate rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-chocolate/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-chocolate rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-chocolate/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        {/* Navigation Dots - Mobile Only */}
        <div className="flex md:hidden justify-center mt-8 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-chocolate shadow-lg"
                  : "w-3 h-3 bg-chocolate/30 hover:bg-chocolate/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhotoGallery
