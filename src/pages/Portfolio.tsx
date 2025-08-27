"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, PlayCircle, Eye, Star, X } from "lucide-react"
import gsap from "gsap"
import { Link } from "react-router-dom"

const Portfolio = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const scrollPosition = useRef(0)
  const filmStripRef = useRef(null)

  // UPDATED: Portfolio items with all 6 couples
  const portfolioItems = [
    { id: 1, couple: "Yash & Kejal", location: "Jaipur", type: "Pre-Wedding", embedId: "ly9ejEF1DqU" },
    { id: 2, couple: "Jobin & Jesline", location: "Kerala", type: "Wedding Film", embedId: "VWkzOkb21UA" },
    { id: 3, couple: "Pranay & Aishwarya", location: "Mumbai", type: "Pre-Wedding", embedId: "II_KVGp3WKM" },
    { id: 4, couple: "Gaurav & Shikhanshi", location: "Himachal", type: "Pre-Wedding", embedId: "4s3wKpLEZ5w" },
    { id: 5, couple: "Rajvi & Tejas", location: "Gujarat", type: "Wedding Teaser", embedId: "K8LlckrZJxw" },
    { id: 6, couple: "Yash & Kejal", location: "Rajasthan", type: "Wedding Film", embedId: "Mb3u8RnwU6k" },
  ]

  // Featured gallery images
  const featuredGalleryImages = [
    {
      id: 1,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488.jpg?updatedAt=1752122341261",
      alt: "Wedding ceremony moment",
      category: "Ceremony"
    },
    {
      id: 2,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144255.jpg?updatedAt=1752122336598",
      alt: "Bride and groom portrait",
      category: "Portraits"
    },
    {
      id: 3,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-zephyr-events-2153609654-32864600.jpg?updatedAt=1752122336721",
      alt: "Wedding celebration",
      category: "Reception"
    },
    {
      id: 4,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759464.jpg?updatedAt=1752122335592",
      alt: "Cinematic wedding moments",
      category: "Cinematic"
    },
    {
      id: 5,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-sourav-kundu-87262483-31230267.jpg?updatedAt=1752122328085",
      alt: "Pre-wedding shoot",
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

  // UPDATED: Testimonials with all 6 couples using YouTube thumbnails
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
    },
    {
      id: 4,
      name: "Gaurav & Shikhanshi",
      location: "Himachal",
      rating: 5,
      text: "The mountain backdrop and their artistic vision created magic. Truly memorable pre-wedding shoot!",
      image: "https://img.youtube.com/vi/4s3wKpLEZ5w/maxresdefault.jpg"
    },
    {
      id: 5,
      name: "Rajvi & Tejas",
      location: "Gujarat",
      rating: 5,
      text: "They perfectly captured our Gujarati traditions with modern cinematic flair. Outstanding work!",
      image: "https://img.youtube.com/vi/K8LlckrZJxw/maxresdefault.jpg"
    },
    {
      id: 6,
      name: "Yash & Kejal",
      location: "Rajasthan",
      rating: 5,
      text: "Our royal Rajasthani wedding was filmed like a grand epic. Every moment feels like a fairy tale!",
      image: "https://img.youtube.com/vi/Mb3u8RnwU6k/maxresdefault.jpg"
    }
  ];

  const currentVideo = portfolioItems[currentVideoIndex]
  const nextVideo = () => { setCurrentVideoIndex((p) => (p + 1) % portfolioItems.length); setIsPlaying(false) }
  const prevVideo = () => { setCurrentVideoIndex((p) => (p - 1 + portfolioItems.length) % portfolioItems.length); setIsPlaying(false) }

  // Auto-play testimonial carousel - Updated timing for more testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Increased to 6 seconds since we have more testimonials
    return () => clearInterval(interval)
  }, [testimonials.length])

  // REMOVED: Film strip animation - No automatic animation anymore
  // Just keep the ref for potential future use
  useEffect(() => {
    const el = filmStripRef.current
    if (!el) return
    
    // No animation - just keep the element available for manual scrolling
    return () => {
      // Cleanup any existing animations if they exist
      gsap.killTweensOf(el)
    }
  }, [])

  // Loading animations
  useEffect(() => {
    gsap.fromTo(".hero-content", {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })

    gsap.fromTo(".video-player", {
      opacity: 0,
      scale: 0.95
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      delay: 0.2,
      ease: "power3.out"
    })

    gsap.fromTo(".gallery-section", {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out"
    })
  }, [])

  function handleImageClick(url: string, index: number): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 w-full">
      {/* Enhanced CSS with manual scroll for film strip */}
      <style jsx>{`
        /* Prevent all overflow issues */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
          width: 100%;
        }
        
        body {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Hide scrollbar but keep functionality */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        /* For Firefox */
        * {
          scrollbar-width: none;
        }
        
        /* For IE and Edge */
        * {
          -ms-overflow-style: none;
        }
        
        /* Ensure no horizontal overflow anywhere */
        * {
          box-sizing: border-box;
        }
        
        /* Fix container overflow */
        .container-fix {
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        /* Film strip manual scroll */
        .film-strip-container {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .film-strip-container::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scrolling for film strip */
        .film-strip-container {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Mobile-First Header - Fixed width constraints */}
      <div className="hero-content text-center px-4 pt-12 pb-6
       w-full container-fix">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="font-amsterdam text-2xl leading-tight mb-3 text-chocolate 
                         xs:text-3xl xs:mb-4
                         sm:text-4xl sm:mb-5 sm:leading-tight
                         md:text-5xl md:mb-6
                         lg:text-4xl lg:mb-7">
            Our Cinematic Stories
          </h1>
          <p className="font-playfair text-sm leading-relaxed text-muted-foreground mx-auto mb-4 max-w-sm
                        xs:text-base xs:max-w-md xs:mb-5
                        sm:text-lg sm:max-w-2xl sm:mb-6
                        md:text-xl md:max-w-3xl">
            Every love story is different & so is our lens.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-chocolate to-transparent mx-auto rounded-full
                          sm:w-24 sm:h-1"></div>
        </div>
      </div>

      {/* Mobile-Optimized Video Player - Fixed width constraints */}
      <div className="video-player px-3 mb-8 sm:px-4 sm:mb-10 md:mb-12 w-full container-fix">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-gradient-to-br from-white/90 to-cream/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-chocolate/10
                          sm:rounded-xl sm:shadow-xl
                          lg:rounded-2xl w-full">
            
            {/* Video Header - Compact for mobile */}
            <div className="bg-gradient-to-r from-chocolate to-chocolate-light px-3 py-2 flex items-center justify-between w-full
                            sm:px-4 sm:py-3">
              <div className="flex items-center gap-2 flex-1 min-w-0
                              sm:gap-3">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center
                                sm:w-5 sm:h-5
                                md:w-6 md:h-6">
                  <PlayCircle className="w-2.5 h-2.5 text-white
                                        sm:w-3 sm:h-3
                                        md:w-4 md:h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-white font-fairplay text-xs block truncate
                                   sm:text-sm
                                   md:text-base">{currentVideo.couple}</span>
                  <span className="text-white/80 text-xs block truncate
                                   sm:text-sm">{currentVideo.type} • {currentVideo.location}</span>
                </div>
              </div>
              <span className="text-white/80 text-xs bg-white/10 px-2 py-0.5 rounded-full whitespace-nowrap
                               sm:text-sm sm:px-3 sm:py-1">
                {currentVideoIndex + 1}/{portfolioItems.length}
              </span>
            </div>
            
            {/* Video Container - Responsive aspect ratio */}
            <div className="relative aspect-video w-full">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1`}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={`Video of ${currentVideo.couple} - ${currentVideo.type}`}
                  loading="lazy"
                />

              ) : (
                <div
                  className="relative w-full h-full bg-cover bg-center cursor-pointer group"
                  style={{ backgroundImage: `url(https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg)` }}
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 text-chocolate p-2 rounded-full hover:scale-110 transition-all duration-300 shadow-xl group-hover:bg-chocolate group-hover:text-white
                                    sm:p-3
                                    md:p-4
                                    lg:p-6">
                      <PlayCircle className="w-6 h-6
                                            sm:w-8 sm:h-8
                                            md:w-10 md:h-10" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2
                                  sm:bottom-3 sm:left-3 sm:right-3
                                  md:bottom-4 md:left-4 md:right-4">
                    <h3 className="text-white font-amsterdam text-sm mb-1
                                   sm:text-base sm:mb-1
                                   md:text-lg">{currentVideo.couple}</h3>
                    <p className="text-white/80 font-playfair text-xs
                                  sm:text-sm">{currentVideo.type} in {currentVideo.location}</p>
                  </div>
                </div>
              )}
              
              {/* Compact Navigation */}
              <button 
                onClick={prevVideo} 
                className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/70 text-white rounded-full hover:bg-chocolate transition-all duration-300 flex items-center justify-center z-10
                           sm:left-2 sm:w-8 sm:h-8
                           md:left-3 md:w-10 md:h-10"
              >
                <ChevronLeft className="w-3 h-3
                                       sm:w-4 sm:h-4
                                       md:w-5 md:h-5" />
              </button>
              <button 
                onClick={nextVideo} 
                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/70 text-white rounded-full hover:bg-chocolate transition-all duration-300 flex items-center justify-center z-10
                           sm:right-2 sm:w-8 sm:h-8
                           md:right-3 md:w-10 md:h-10"
              >
                <ChevronRight className="w-3 h-3
                                        sm:w-4 sm:h-4
                                        md:w-5 md:h-5" />
              </button>
            </div>
          </div>
          
          {/* Compact Dots Navigation - Updated for 6 videos */}
          <div className="flex justify-center mt-3 space-x-1.5 w-full
                          sm:mt-4 sm:space-x-2
                          md:mt-6">
            {portfolioItems.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentVideoIndex(i); setIsPlaying(false) }}
                className={`transition-all duration-300 ${
                  currentVideoIndex === i 
                    ? "w-5 h-1.5 bg-chocolate rounded-full sm:w-6 sm:h-2" 
                    : "w-1.5 h-1.5 bg-chocolate/30 rounded-full hover:bg-chocolate/50 sm:w-2 sm:h-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-2"
            disabled={selectedIndex === 0}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={selectedImage}
            alt="Selected gallery image"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-2"
            disabled={selectedIndex === featuredGalleryImages.length - 1}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Compact Gallery Section - Fixed width constraints */}
      <div className="gallery-section px-3 mb-8 sm:px-4 sm:mb-10 md:mb-12 w-full container-fix">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-amsterdam text-xl text-chocolate mb-3 py-2 px-3
               sm:text-2xl sm:mb-4 sm:py-3 sm:px-4
               md:text-3xl md:mb-5 md:py-4 md:px-6
               lg:text-3xl lg:py-6 lg:px-8">
              Featured Gallery
            </h2>

            <p className="font-playfair text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed
                          sm:text-base sm:max-w-xl
                          md:text-lg md:max-w-2xl">
              A glimpse of our most cherished moments captured with love and artistry
            </p>
          </div>

          {/* Compact Gallery Grid - Fixed width constraints */}
          <div className="grid grid-cols-2 gap-2 mb-4 w-full
                          sm:gap-3 sm:mb-6
                          md:grid-cols-3 md:gap-4
                          lg:grid-cols-4">
            {featuredGalleryImages.map((photo, index) => (
              <div 
                key={photo.id}
                onClick={() => handleImageClick(photo.url, index)}
                className="group cursor-pointer relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transform transition-all duration-500 hover:scale-105 w-full
                           sm:rounded-xl
                           md:rounded-2xl"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="aspect-square w-full">
                  <img 
                    src={photo.url} 
                    alt={photo.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                    loading="lazy" 
                  />
                </div>
                
                {/* Simplified overlay for mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-1.5 left-1.5 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300
                                sm:top-2 sm:left-2 sm:-translate-y-6">
                  <span className="bg-white/90 text-chocolate px-2 py-0.5 rounded text-xs font-medium
                                   sm:px-2 sm:py-1 sm:text-sm">
                    {photo.category}
                  </span>
                </div>
                
                {/* View Icon */}
                <div className="absolute bottom-1.5 right-1.5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100
                                sm:bottom-2 sm:right-2 sm:translate-y-6">
                  <div className="bg-white/90 text-chocolate p-1 rounded-full
                                  sm:p-1.5">
                    <Eye className="w-3 h-3
                                   sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Button */}
          <div className="text-center w-full">
            <Link 
              to="/gallery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-chocolate to-chocolate-light text-white px-5 py-2.5 rounded-full font-playfair text-sm hover:shadow-lg hover:scale-105 transition-all duration-300
                         sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
            >
              View Complete Gallery
              <ArrowRight className="w-3 h-3
                                   sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* FIXED: Testimonials Section - Enhanced visibility and spacing with all 6 couples */}
      <div className="px-3 mb-16 sm:px-4 sm:mb-20 md:mb-24 w-full container-fix relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-6">
            <h2 className="font-amsterdam text-2xl text-chocolate mb-4 py-3 px-4 leading-loose
               sm:text-3xl sm:mb-6 sm:py-4 sm:px-6 sm:leading-relaxed
               md:text-3xl md:mb-8 md:py-6 md:px-8 md:leading-relaxed
               lg:text-3xl lg:py-6 lg:px-10 lg:leading-relaxed">
              What Couples Say
            </h2>

            <p className="font-playfair text-base text-muted-foreground
                          sm:text-lg
                          md:text-xl">
              Real love stories, real emotions, real testimonials
            </p>
          </div>

          <div className="relative w-full">
            <div className="overflow-hidden rounded-xl
                            sm:rounded-2xl
                            md:rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out w-full"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2
                                                      sm:px-4">
                    <div className="bg-gradient-to-br from-white/95 to-cream/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-chocolate/20
                                    sm:rounded-2xl sm:p-8 sm:shadow-2xl
                                    md:rounded-3xl md:p-10
                                    lg:p-12">
                      <div className="flex flex-col items-center gap-6 text-center
                                      md:flex-row md:gap-8 md:text-left
                                      lg:gap-10">
                        {/* Image removed as requested */}
                        <div className="flex-1
                                        md:w-2/3">
                          <div className="flex justify-center mb-3
                                          sm:mb-4
                                          md:justify-start md:mb-5">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current
                                                       sm:w-5 sm:h-5
                                                       md:w-6 md:h-6" />
                            ))}
                          </div>
                          <blockquote className="font-playfair text-base text-chocolate mb-4 italic leading-relaxed
                                                 sm:text-lg sm:mb-6
                                                 md:text-xl md:mb-8
                                                 lg:text-2xl">
                            "{testimonial.text}"
                          </blockquote>
                          <div>
                            <h4 className="font-amsterdam text-lg text-chocolate mb-1
                                           sm:text-xl
                                           md:text-2xl
                                           lg:text-3xl">
                              {testimonial.name}
                            </h4>
                            <p className="text-muted-foreground font-playfair text-sm
                                          sm:text-base
                                          md:text-lg">
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

            {/* Enhanced Navigation - Updated for 6 testimonials */}
            <div className="flex justify-center mt-6 space-x-2 w-full
                            sm:mt-8 sm:space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`transition-all duration-300 ${
                    currentTestimonial === i 
                      ? "w-8 h-2 bg-chocolate rounded-full sm:w-10 sm:h-3" 
                      : "w-2 h-2 bg-chocolate/30 rounded-full hover:bg-chocolate/50 sm:w-3 sm:h-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
