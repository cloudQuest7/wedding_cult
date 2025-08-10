"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, PlayCircle, Eye, Star } from "lucide-react"
import gsap from "gsap"
import { Link } from "react-router-dom"

const Portfolio = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const filmStripRef = useRef(null)

  const portfolioItems = [
    { id: 1, couple: "Yash & Kejal", location: "Jaipur", type: "Pre-Wedding", embedId: "ly9ejEF1DqU" },
    { id: 2, couple: "Jobin & Jesline", location: "Kerala", type: "Wedding Film", embedId: "VWkzOkb21UA" },
    { id: 3, couple: "Pranay & Aishwarya", location: "Mumbai", type: "Pre-Wedding", embedId: "II_KVGp3WKM" },
  ]

  // Featured gallery images (subset of your full gallery)
  const featuredGalleryImages = [
    {
      id: 1,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488.jpg?updatedAt=1752122341261",
      alt: "Nilkeshi & Saevesh - Wedding ceremony moment",
      category: "Ceremony"
    },
    {
      id: 2,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144255.jpg?updatedAt=1752122336598",
      alt: "Dhiraj & Rajashri - Bride and groom portrait",
      category: "Portraits"
    },
    {
      id: 3,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-zephyr-events-2153609654-32864600.jpg?updatedAt=1752122336721",
      alt: "Ruturaj & Krutika - Wedding celebration",
      category: "Reception"
    },
    {
      id: 4,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759464.jpg?updatedAt=1752122335592",
      alt: "Jobin & Jesline - Cinematic wedding moments",
      category: "Cinematic"
    },
    {
      id: 5,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-sourav-kundu-87262483-31230267.jpg?updatedAt=1752122328085",
      alt: "Love Stories - Pre-wedding shoot",
      category: "Pre-Wedding"
    },
    {
      id: 6,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9210801.jpg?updatedAt=1752218451384",
      alt: "Beautiful couple portrait",
      category: "Portraits"
    },
    {
      id: 7,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-gursher-gill-63702010-18633036.jpg?updatedAt=1752218493332",
      alt: "Wedding ceremony moments",
      category: "Ceremony"
    },
    {
      id: 8,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-fliqaindia-32499931.jpg?updatedAt=1752218492641",
      alt: "Traditional wedding rituals",
      category: "Ceremony"
    }
  ];

  // Testimonial carousel data with correct YouTube thumbnails
  const testimonials = [
    {
      id: 1,
      name: "Yash & Kejal",
      location: "Jaipur",
      rating: 5,
      text: "The Wedding Cult captured our love story beautifully. Every frame tells our tale perfectly.",
      image: "https://img.youtube.com/vi/ly9ejEF1DqU/maxresdefault.jpg"
    },
    {
      id: 2,
      name: "Jobin & Jesline", 
      location: "Kerala",
      rating: 5,
      text: "Absolutely cinematic! They made our wedding feel like a movie. Highly recommended!",
      image: "https://img.youtube.com/vi/VWkzOkb21UA/maxresdefault.jpg"
    },
    {
      id: 3,
      name: "Pranay & Aishwarya",
      location: "Mumbai", 
      rating: 5,
      text: "Professional, creative, and passionate. Our wedding film exceeded all expectations!",
      image: "https://img.youtube.com/vi/II_KVGp3WKM/maxresdefault.jpg"
    }
  ];

  const currentVideo = portfolioItems[currentVideoIndex]
  const nextVideo = () => { setCurrentVideoIndex((p) => (p + 1) % portfolioItems.length); setIsPlaying(false) }
  const prevVideo = () => { setCurrentVideoIndex((p) => (p - 1 + portfolioItems.length) % portfolioItems.length); setIsPlaying(false) }

  // Auto-play testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Film strip scroll animation
  useEffect(() => {
    const el = filmStripRef.current
    if (!el) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { x: "-50%", duration: 15, ease: "none", repeat: -1 })
        } else {
          gsap.killTweensOf(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Smooth loading animations
  useEffect(() => {
    gsap.fromTo(".hero-content", {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })

    gsap.fromTo(".video-player", {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      delay: 0.3,
      ease: "power3.out"
    })

    gsap.fromTo(".gallery-section", {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.6,
      ease: "power2.out"
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 font-sans">
      {/* Enhanced Header */}
      <div className="hero-content text-center mb-8 sm:mb-12 md:mb-16 pt-16 sm:pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-amsterdam text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-chocolate mb-4 sm:mb-6 md:mb-8 leading-tight">
            Our Cinematic Stories
          </h1>
          <p className="font-playfair text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 md:mb-8">
            Every love story is different & so is our lens.
          </p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-chocolate to-transparent mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Enhanced Video Player - Fully Responsive */}
      <div className="video-player max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20 px-4">
        <div className="bg-gradient-to-br from-white/90 to-cream/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-chocolate/10">
          <div className="bg-gradient-to-r from-chocolate to-chocolate-light px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                <PlayCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-white font-amsterdam text-sm sm:text-lg block truncate">{currentVideo.couple}</span>
                <span className="text-white/80 text-xs sm:text-sm block truncate">{currentVideo.type} • {currentVideo.location}</span>
              </div>
            </div>
            <span className="text-white/80 text-xs sm:text-sm bg-white/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
              {currentVideoIndex + 1} of {portfolioItems.length}
            </span>
          </div>
          
          <div className="relative aspect-video">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1`}
                className="w-full h-full border-none"
                allowFullScreen
                title={`Video of ${currentVideo.couple} - ${currentVideo.type}`}
              />
            ) : (
              <div
                className="relative w-full h-full bg-cover bg-center cursor-pointer group"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg)` }}
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 text-chocolate p-4 sm:p-6 md:p-8 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl group-hover:bg-chocolate group-hover:text-white">
                    <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12" />
                  </div>
                </div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white font-amsterdam text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">{currentVideo.couple}</h3>
                  <p className="text-white/80 font-playfair text-sm sm:text-base">{currentVideo.type} in {currentVideo.location}</p>
                </div>
              </div>
            )}
            
            {/* Navigation arrows - Responsive */}
            <button 
              onClick={prevVideo} 
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-black/70 text-white rounded-full hover:bg-chocolate transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={nextVideo} 
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-black/70 text-white rounded-full hover:bg-chocolate transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Enhanced Dots Navigation - Responsive */}
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-2 sm:space-x-3">
          {portfolioItems.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentVideoIndex(i); setIsPlaying(false) }}
              className={`transition-all duration-300 ${
                currentVideoIndex === i 
                  ? "w-6 sm:w-8 h-2 sm:h-3 bg-chocolate rounded-full" 
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-chocolate/30 rounded-full hover:bg-chocolate/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Gallery Section - Fully Responsive */}
      <div className="gallery-section max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-20 px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-amsterdam text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-chocolate mb-4 sm:mb-6">
            Featured Gallery
          </h2>
          <p className="font-playfair text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            A glimpse of our most cherished moments captured with love and artistry
          </p>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {featuredGalleryImages.map((photo, index) => (
            <div 
              key={photo.id}
              className="group cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="aspect-square">
                <img 
                  src={photo.url} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  loading="lazy" 
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Category Badge - Responsive */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 transform -translate-y-6 sm:-translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-white/90 text-chocolate px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                  {photo.category}
                </span>
              </div>
              
              {/* View Icon - Responsive */}
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 transform translate-y-6 sm:translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                <div className="bg-white/90 text-chocolate p-1.5 sm:p-2 rounded-full">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - Responsive */}
        <div className="text-center">
          <Link 
            to="/gallery"
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-chocolate to-chocolate-light text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-amsterdam text-base sm:text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View Complete Gallery
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>

      {/* Modern Testimonial Carousel - Fully Responsive */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-amsterdam text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-chocolate mb-4 sm:mb-6">
            What Couples Say
          </h2>
          <p className="font-playfair text-base sm:text-lg text-muted-foreground">
            Real love stories, real emotions, real testimonials
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-gradient-to-br from-white/90 to-cream/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-chocolate/10">
                    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                      <div className="md:w-1/3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
                        />
                      </div>
                      <div className="md:w-2/3 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-3 sm:mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="font-playfair text-lg sm:text-xl md:text-2xl text-chocolate mb-4 sm:mb-6 italic leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>
                        <div>
                          <h4 className="font-amsterdam text-xl sm:text-2xl text-chocolate mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-muted-foreground font-playfair text-sm sm:text-base">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Navigation - Responsive */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`transition-all duration-300 ${
                  currentTestimonial === i 
                    ? "w-6 sm:w-8 h-2 sm:h-3 bg-chocolate rounded-full" 
                    : "w-2 sm:w-3 h-2 sm:h-3 bg-chocolate/30 rounded-full hover:bg-chocolate/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Film Strip - Responsive */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-black via-gray-900 to-black py-8 sm:py-10 md:py-12 rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="overflow-hidden">
              <div ref={filmStripRef} className="flex gap-4 sm:gap-6 px-4 sm:px-6 min-w-max">
                {[
                  "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488.jpg?updatedAt=1752122341261",
                  "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144255.jpg?updatedAt=1752122336598", 
                  "https://ik.imagekit.io/7xgikoq8o/pexels-zephyr-events-2153609654-32864600.jpg?updatedAt=1752122336721",
                  "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759464.jpg?updatedAt=1752122335592",
                  "https://ik.imagekit.io/7xgikoq8o/couple-9210801.jpg?updatedAt=1752218451384",
                ].map((src, i) => (
                  <div key={i} className="w-48 sm:w-64 md:w-80 h-32 sm:h-48 md:h-60 flex-shrink-0">
                    <div className="w-full h-full bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-600 hover:border-chocolate/50 transition-all duration-500 shadow-xl">
                      <img 
                        src={src} 
                        alt="Portfolio film strip" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Film perforations - Responsive */}
            <div className="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-sm opacity-70"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
