"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Touch/Swipe state
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isSwipping, setIsSwipping] = useState(false)
  
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const autoPlayRef = useRef(null)

  // Memoized photos array
  const photos = useMemo(() => [
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
      couple: "Love Stories",
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
  ], [])

  // Swipe detection
  const minSwipeDistance = 50

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwipping(true)
  }, [])

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
    
    setIsSwipping(false)
  }, [touchStart, touchEnd])

  // Optimized navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    setIsAutoPlaying(false)
    // Resume autoplay after 8 seconds
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    autoPlayRef.current = setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [photos.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
    setIsAutoPlaying(false)
    // Resume autoplay after 8 seconds
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    autoPlayRef.current = setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [photos.length])

  // Auto-advance gallery - optimized
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [photos.length, isAutoPlaying])

  // Optimized GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      )

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      )

      // Section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards animation
      gsap.fromTo(
        ".gallery-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // Get visible cards for desktop view
  const getVisibleCards = useCallback(() => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % photos.length
      cards.push(photos[index])
    }
    return cards
  }, [currentIndex, photos])

  const currentPhoto = useMemo(() => photos[currentIndex], [photos, currentIndex])

  return (
    <section
      ref={sectionRef}
      className="py-4 sm:py-6 pt-8 md:py-8 px-4 sm:px-6 bg-gradient-to-b from-cream/20 via-background to-beige-light/10 relative overflow-hidden"
      style={{ backgroundColor: "#f9f6f2" }} // Added simple background color matching the theme
    >
      <div className="max-w-7xl mx-auto relative">
      {/* Clean Animated Title */}
      <div className="text-center mb-8 sm:mb-10 relative">
        <div className="relative">
        <h2
          ref={titleRef}
          className="font-amsterdam text-2xl sm:text-3xl md:text-4xl text-chocolate mb-5 leading-loose"
          style={{ fontWeight: "400", letterSpacing: "0.02em" }}
        >
          Captured Moments
        </h2>

        <p
          ref={subtitleRef}
          className="font-playfair text-base sm:text-lg md:text-xl text-chocolate/80 max-w-3xl mx-auto leading-relaxed"
          style={{ fontWeight: "300" }}
        >
          Every frame tells a story of love, joy, and beautiful beginnings
        </p>

        {/* Simple decorative line */}
        <div className="flex items-center justify-center mt-4 space-x-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-chocolate/30 to-transparent"></div>
          <Heart className="w-4 h-4 text-chocolate/40 fill-current" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-chocolate/30 to-transparent"></div>
        </div>
        </div>
      </div>

      {/* Gallery Cards */}
      <div ref={cardsRef} className="relative">
        {/* Desktop & Tablet View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {getVisibleCards().map((photo, index) => (
          <div
          key={`${photo.id}-${index}`}
          className="gallery-card relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-white border border-chocolate/5">
            <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center space-x-2 text-xs font-light tracking-wide opacity-90 mb-1">
              <span>{photo.date}</span>
              <span>—</span>
              <span>{photo.location}</span>
            </div>
            <h3 className="font-playfair text-lg font-normal tracking-wide leading-snug">
              {photo.couple}
            </h3>
            </div>
          </div>
          </div>
        ))}
        </div>

        {/* Mobile View with Swipe Support */}
        <div 
        className="md:hidden mb-8 relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        >
        {/* Swipe indicator */}
        {isSwipping && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-chocolate/90 text-cream px-3 py-1 rounded-full text-sm">
          ← Swipe →
          </div>
        )}

        <div className={`gallery-card transition-transform duration-200 ${isSwipping ? 'scale-[0.98]' : ''}`}>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-white border border-chocolate/5">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex items-center space-x-2 text-sm font-light tracking-wide opacity-90 mb-2">
            <span>{currentPhoto.date}</span>
            <span>—</span>
            <span>{currentPhoto.location}</span>
            </div>
            <h3 className="font-playfair text-xl font-normal tracking-wide leading-snug">
            {currentPhoto.couple}
            </h3>
          </div>

          {/* Navigation arrows for mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 text-chocolate rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 mx-auto" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 text-chocolate rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 mx-auto" />
          </button>
          </div>
        </div>

        {/* Swipe hint */}
        <div className="text-center mt-3">
          <p className="text-chocolate/60 text-sm">Swipe or use arrows to browse</p>
        </div>
        </div>

        {/* Navigation Dots - Mobile */}
        <div className="flex md:hidden justify-center mt-6 space-x-2">
        {photos.map((_, index) => (
          <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`transition-all duration-300 rounded-full ${
            index === currentIndex
            ? "w-8 h-3 bg-chocolate shadow-md"
            : "w-3 h-3 bg-chocolate/30 hover:bg-chocolate/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default PhotoGallery
