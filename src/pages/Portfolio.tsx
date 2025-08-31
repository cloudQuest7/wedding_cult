"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, PlayCircle, Eye, Star, X, ZoomIn, ZoomOut, Share2, Heart } from "lucide-react"
import gsap from "gsap"
import { Link } from "react-router-dom"

const Portfolio = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [favorites, setFavorites] = useState([])
  const [showImageInfo, setShowImageInfo] = useState(false)
  
  // Mobile swipe detection
  const [swipeStart, setSwipeStart] = useState({ x: 0, y: 0, time: 0 })
  const [isLightboxSwiping, setIsLightboxSwiping] = useState(false)
  
  const scrollPosition = useRef(0)
  const filmStripRef = useRef(null)
  const testimonialsRef = useRef(null)
  const touchStartX = useRef(0)
  const imageRef = useRef(null)
  const lightboxRef = useRef(null)

  // Memoized data to prevent unnecessary re-renders
  const portfolioItems = useMemo(() => [
    { id: 1, couple: "Yash & Kejal", type: "Sangeet Ceremony", embedId: "ly9ejEF1DqU" },
    { id: 2, couple: "Jobin & Jesline", type: "Christian Wedding", embedId: "VWkzOkb21UA" },
    { id: 3, couple: "Pranay & Aishwarya", type: "Pre-Wedding", embedId: "II_KVGp3WKM" },
    { id: 4, couple: "Gaurav & Shikhanshi", type: "Pre-Wedding", embedId: "4s3wKpLEZ5w" },
    { id: 5, couple: "Rajvi & Tejas", type: "Wedding Teaser", embedId: "K8LlckrZJxw" },
    { id: 6, couple: "Yash & Kejal", type: "Wedding Film", embedId: "Mb3u8RnwU6k" },
    { id: 7, couple: "Harshdeep & Muskan", type: "Wedding Teaser", embedId: "_uy6TDq8QPw" },
    { id: 8, couple: "Ajay & Nidhi", type: "South Indian Wedding", embedId: "rNyVc9mUuT0" },
    { id: 9, couple: "Aayshi & Shreys", type: "Wedding Teaser", embedId: "qUXfKc5SzFI" },
    { id: 10, couple: "Jheel & Neel", type: "Wedding Highlights", embedId: "jF_kNaTp-KA" },
  ], [])

  const featuredGalleryImages = useMemo(() => [
    {
      id: 1,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488.jpg?updatedAt=1752122341261",
      alt: "Wedding ceremony moment",
      category: "Ceremony",
      photographer: "The Wedding Cult",
      location: "Udaipur Palace",
      date: "2024"
    },
    {
      id: 2,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144255.jpg?updatedAt=1752122336598",
      alt: "Bride and groom portrait",
      category: "Portraits",
      photographer: "The Wedding Cult",
      location: "Mumbai Studios",
      date: "2024"
    },
    {
      id: 3,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-zephyr-events-2153609654-32864600.jpg?updatedAt=1752122336721",
      alt: "Wedding celebration",
      category: "Reception",
      photographer: "The Wedding Cult",
      location: "Delhi Grand Hotel",
      date: "2024"
    },
    {
      id: 4,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759464.jpg?updatedAt=1752122335592",
      alt: "Cinematic wedding moments",
      category: "Cinematic",
      photographer: "The Wedding Cult",
      location: "Goa Beach Resort",
      date: "2024"
    },
    {
      id: 5,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-sourav-kundu-87262483-31230267.jpg?updatedAt=1752122328085",
      alt: "Pre-wedding shoot",
      category: "Pre-Wedding",
      photographer: "The Wedding Cult",
      location: "Himachal Mountains",
      date: "2024"
    },
    {
      id: 6,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9210801.jpg?updatedAt=1752218451384",
      alt: "Beautiful couple portrait",
      category: "Portraits",
      photographer: "The Wedding Cult",
      location: "Jaipur Heritage",
      date: "2024"
    },
    {
      id: 7,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-gursher-gill-63702010-18633036.jpg?updatedAt=1752218493332",
      alt: "Wedding ceremony moments",
      category: "Ceremony",
      photographer: "The Wedding Cult",
      location: "Kerala Backwaters",
      date: "2024"
    },
    {
      id: 8,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-fliqaindia-32499931.jpg?updatedAt=1752218492641",
      alt: "Traditional wedding rituals",
      category: "Ceremony",
      photographer: "The Wedding Cult",
      location: "Rajasthan Palace",
      date: "2024"
    }
  ], [])

  const testimonials = useMemo(() => [
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
  ], [])

  // Memoized current video to prevent unnecessary re-renders
  const currentVideo = useMemo(() => portfolioItems[currentVideoIndex], [portfolioItems, currentVideoIndex])

  // Optimized video navigation with useCallback
  const nextVideo = useCallback(() => {
    setCurrentVideoIndex((p) => (p + 1) % portfolioItems.length)
    setIsPlaying(false)
  }, [portfolioItems.length])

  const prevVideo = useCallback(() => {
    setCurrentVideoIndex((p) => (p - 1 + portfolioItems.length) % portfolioItems.length)
    setIsPlaying(false)
  }, [portfolioItems.length])

  // Optimized touch handlers
  const handleVideoTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleVideoTouchMove = useCallback((e) => {
    if (!touchStartX.current) return
    const touchEndX = e.touches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentVideoIndex < portfolioItems.length - 1) {
        nextVideo()
      } else if (diff < 0 && currentVideoIndex > 0) {
        prevVideo()
      }
      touchStartX.current = touchEndX
    }
  }, [currentVideoIndex, portfolioItems.length, nextVideo, prevVideo])

  const handleTestimonialTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTestimonialTouchMove = useCallback((e) => {
    if (!testimonialsRef.current) return
    const touchEndX = e.touches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentTestimonial < testimonials.length - 1) {
        setCurrentTestimonial(currentTestimonial + 1)
      } else if (diff < 0 && currentTestimonial > 0) {
        setCurrentTestimonial(currentTestimonial - 1)
      }
      touchStartX.current = touchEndX
    }
  }, [currentTestimonial, testimonials.length])

  // Enhanced Lightbox Functions with better positioning
  const handleImageClick = useCallback((url, index) => {
    // Store current scroll position
    scrollPosition.current = window.pageYOffset
    
    setSelectedImage(url)
    setSelectedIndex(index)
    setZoomLevel(1)
    setDragPosition({ x: 0, y: 0 })
    setIsZoomed(false)
    setShowImageInfo(false)
    
    // FIXED: Better scroll prevention
    requestAnimationFrame(() => {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100vw'
    })
  }, [])

  const handleCloseModal = useCallback(() => {
    // FIXED: Better scroll restoration
    requestAnimationFrame(() => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      
      // Restore exact scroll position
      window.scrollTo(0, scrollPosition.current)
    })
    
    setSelectedImage(null)
    setSelectedIndex(-1)
    setZoomLevel(1)
    setDragPosition({ x: 0, y: 0 })
    setIsZoomed(false)
    setIsDragging(false)
    setShowImageInfo(false)
  }, [])

  const handlePrevImage = useCallback(() => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1
      setSelectedIndex(newIndex)
      setSelectedImage(featuredGalleryImages[newIndex].url)
      setZoomLevel(1)
      setDragPosition({ x: 0, y: 0 })
      setIsZoomed(false)
    }
  }, [selectedIndex, featuredGalleryImages])

  const handleNextImage = useCallback(() => {
    if (selectedIndex < featuredGalleryImages.length - 1) {
      const newIndex = selectedIndex + 1
      setSelectedIndex(newIndex)
      setSelectedImage(featuredGalleryImages[newIndex].url)
      setZoomLevel(1)
      setDragPosition({ x: 0, y: 0 })
      setIsZoomed(false)
    }
  }, [selectedIndex, featuredGalleryImages])

  // Optimized Mobile Swipe Handlers
  const handleLightboxTouchStart = useCallback((e) => {
    if (isZoomed) return
    
    const touch = e.touches[0]
    setSwipeStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    })
    setIsLightboxSwiping(false)
  }, [isZoomed])

  const handleLightboxTouchMove = useCallback((e) => {
    if (isZoomed) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - swipeStart.x
    const deltaY = touch.clientY - swipeStart.y
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      setIsLightboxSwiping(true)
      e.preventDefault() // Prevent page scroll
    }
  }, [isZoomed, swipeStart])

  const handleLightboxTouchEnd = useCallback((e) => {
    if (isZoomed || !isLightboxSwiping) return
    
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - swipeStart.x
    const deltaY = touch.clientY - swipeStart.y
    const deltaTime = Date.now() - swipeStart.time
    
    const isSwipe = Math.abs(deltaX) > 50 || (Math.abs(deltaX) > 20 && deltaTime < 300)
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)
    
    if (isSwipe && isHorizontal) {
      if (deltaX > 0) {
        handlePrevImage()
      } else {
        handleNextImage()
      }
    }
    
    setIsLightboxSwiping(false)
  }, [isZoomed, isLightboxSwiping, swipeStart, handlePrevImage, handleNextImage])

  // Optimized Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
    setIsZoomed(true)
  }, [])

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoomLevel - 0.5, 1)
    setZoomLevel(newZoom)
    if (newZoom === 1) {
      setIsZoomed(false)
      setDragPosition({ x: 0, y: 0 })
    }
  }, [zoomLevel])

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1)
    setIsZoomed(false)
    setDragPosition({ x: 0, y: 0 })
  }, [])

  // Optimized drag handlers
  const handleMouseDown = useCallback((e) => {
    if (!isZoomed) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - dragPosition.x, y: e.clientY - dragPosition.y })
  }, [isZoomed, dragPosition])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !isZoomed) return
    e.preventDefault()
    setDragPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }, [isDragging, isZoomed, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch handlers for zoom/pan
  const handleZoomTouchStart = useCallback((e) => {
    if (!isZoomed) return
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX - dragPosition.x, y: touch.clientY - dragPosition.y })
  }, [isZoomed, dragPosition])

  const handleZoomTouchMove = useCallback((e) => {
    if (!isDragging || !isZoomed) return
    const touch = e.touches[0]
    setDragPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    })
  }, [isDragging, isZoomed, dragStart])

  const handleZoomTouchEnd = useCallback(() => {
    if (isZoomed) {
      setIsDragging(false)
    }
  }, [isZoomed])

  // Favorites functionality
  const toggleFavorite = useCallback((imageId) => {
    setFavorites(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }, [])

  // Share functionality (kept, removed download)
  const handleShare = useCallback(() => {
    if (navigator.share && selectedImage) {
      navigator.share({
        title: 'Beautiful Wedding Photo',
        text: `Check out this amazing wedding photo by The Wedding Cult!`,
        url: selectedImage,
      })
    } else {
      navigator.clipboard.writeText(selectedImage || '')
    }
  }, [selectedImage])

  // Keyboard navigation - Optimized (removed download key binding)
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          handleCloseModal()
          break
        case 'ArrowLeft':
          handlePrevImage()
          break
        case 'ArrowRight':
          handleNextImage()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case '0':
          handleResetZoom()
          break
        case 'i':
        case 'I':
          setShowImageInfo(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, handleCloseModal, handlePrevImage, handleNextImage, handleZoomIn, handleZoomOut, handleResetZoom])

  // Auto-play testimonial carousel - Optimized
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Loading animations - Run only once
  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(".hero-content", {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .fromTo(".video-player", {
      opacity: 0,
      scale: 0.95
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.6")
    .fromTo(".gallery-section", {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 w-full">
      {/* FIXED: Enhanced CSS with better positioning */}
      <style jsx>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
          width: 100%;
        }
        
        body {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
          box-sizing: border-box;
        }
        
        .container-fix {
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        /* FIXED: Bulletproof lightbox positioning */
        .lightbox-container {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 99999 !important;
          overflow: hidden !important;
          touch-action: manipulation !important;
          transform: none !important;
          will-change: auto !important;
        }
        
        .lightbox-image {
          transition: transform 0.2s ease;
          cursor: ${isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'};
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          will-change: transform;
        }
        
        .lightbox-controls {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.8);
          will-change: auto;
        }
        
        /* Optimized animations */
        .fade-in {
          animation: fadeIn 0.25s ease-in-out;
        }
        
        .slide-up {
          animation: slideUp 0.25s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(15px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Performance optimizations */
        .gallery-item {
          will-change: transform;
        }
        
        .gallery-item:hover {
          will-change: transform;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .lightbox-container {
            overscroll-behavior: none !important;
          }
          
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>

      {/* Header */}
      <div className="hero-content text-center px-4 pt-12 pb-6 w-full container-fix">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="font-amsterdam text-lg leading-tight mb-2 text-chocolate 
                     xs:text-xl xs:mb-3
                     sm:text-4xl sm:mb-5 mt-5 sm:leading-loose
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

      {/* Video Player Section */}
      <div className="video-player px-3 mb-8 sm:px-4 sm:mb-10 md:mb-12 w-full container-fix">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-gradient-to-br from-white/90 to-cream/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-chocolate/10
                          sm:rounded-xl sm:shadow-xl
                          lg:rounded-2xl w-full">
            
            {/* Video Header */}
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
                                   sm:text-sm">{currentVideo.type}</span>
                </div>
              </div>
              <span className="text-white/80 text-xs bg-white/10 px-2 py-0.5 rounded-full whitespace-nowrap
                               sm:text-sm sm:px-3 sm:py-1">
                {currentVideoIndex + 1}/{portfolioItems.length}
              </span>
            </div>
            
            {/* Video Container */}
            <div 
              className="relative aspect-video w-full"
              onTouchStart={handleVideoTouchStart}
              onTouchMove={handleVideoTouchMove}
              onTouchEnd={() => { touchStartX.current = 0 }}
            >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 text-chocolate p-2 rounded-full hover:scale-110 transition-all duration-200 shadow-xl group-hover:bg-chocolate group-hover:text-white
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
                                  sm:text-sm">{currentVideo.type}</p>
                  </div>
                </div>
              )}
              
              {/* Navigation */}
              <button 
                onClick={prevVideo} 
                className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/70 text-white rounded-full hover:bg-chocolate transition-all duration-200 flex items-center justify-center z-10
                           sm:left-2 sm:w-8 sm:h-8
                           md:left-3 md:w-10 md:h-10"
              >
                <ChevronLeft className="w-3 h-3
                                       sm:w-4 sm:h-4
                                       md:w-5 md:h-5" />
              </button>
              <button 
                onClick={nextVideo} 
                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/70 text-white rounded-full hover:bg-chocolate transition-all duration-200 flex items-center justify-center z-10
                           sm:right-2 sm:w-8 sm:h-8
                           md:right-3 md:w-10 md:h-10"
              >
                <ChevronRight className="w-3 h-3
                                        sm:w-4 sm:h-4
                                        md:w-5 md:h-5" />
              </button>
            </div>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-3 space-x-1.5 w-full
                          sm:mt-4 sm:space-x-2
                          md:mt-6">
            {portfolioItems.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentVideoIndex(i); setIsPlaying(false) }}
                className={`transition-all duration-200 ${
                  currentVideoIndex === i 
                    ? "w-5 h-1.5 bg-chocolate rounded-full sm:w-6 sm:h-2" 
                    : "w-1.5 h-1.5 bg-chocolate/30 rounded-full hover:bg-chocolate/50 sm:w-2 sm:h-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FIXED: Optimized Lightbox Modal (Download functionality removed) */}
      {selectedImage && (
        <div 
          ref={lightboxRef}
          className="lightbox-container bg-black/95 backdrop-blur-sm flex items-center justify-center fade-in"
          onTouchStart={isZoomed ? handleZoomTouchStart : handleLightboxTouchStart}
          onTouchMove={isZoomed ? handleZoomTouchMove : handleLightboxTouchMove}
          onTouchEnd={isZoomed ? handleZoomTouchEnd : handleLightboxTouchEnd}
        >
          {/* Top Controls Bar (Download button removed) */}
          <div className="absolute top-0 left-0 right-0 z-60 lightbox-controls px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-white">
              <span className="text-sm font-medium">
                {selectedIndex + 1} / {featuredGalleryImages.length}
              </span>
              <span className="text-xs opacity-75">
                {featuredGalleryImages[selectedIndex]?.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImageInfo(prev => !prev)}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                title="Image Info (I)"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleFavorite(featuredGalleryImages[selectedIndex]?.id)}
                className={`p-2 rounded-full hover:bg-white/10 transition-all duration-200 ${
                  favorites.includes(featuredGalleryImages[selectedIndex]?.id) 
                    ? 'text-red-400 hover:text-red-300' 
                    : 'text-white/80 hover:text-white'
                }`}
                title="Add to Favorites"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(featuredGalleryImages[selectedIndex]?.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleCloseModal}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                title="Close (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-60 lightbox-controls px-4 py-3 flex items-center justify-center gap-4">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="text-white/80 hover:text-white disabled:text-white/40 p-2 rounded-full hover:bg-white/10 transition-all duration-200 disabled:cursor-not-allowed"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <span className="text-white text-sm min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="text-white/80 hover:text-white disabled:text-white/40 p-2 rounded-full hover:bg-white/10 transition-all duration-200 disabled:cursor-not-allowed"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleResetZoom}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200 text-sm"
              title="Reset Zoom (0)"
            >
              Reset
            </button>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevImage}
            disabled={selectedIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-60 p-3 rounded-full hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       hidden sm:block"
            title="Previous (← or swipe right)"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative flex-1 flex items-center justify-center overflow-hidden"
            onMouseDown={isZoomed ? handleMouseDown : undefined}
            onMouseMove={isZoomed ? handleMouseMove : undefined}
            onMouseUp={isZoomed ? handleMouseUp : undefined}
            onMouseLeave={isZoomed ? handleMouseUp : undefined}
          >
            <img
              ref={imageRef}
              src={selectedImage}
              alt={featuredGalleryImages[selectedIndex]?.alt}
              className="lightbox-image max-h-[85vh] max-w-[85vw] object-contain select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s ease'
              }}
              onDoubleClick={() => isZoomed ? handleResetZoom() : handleZoomIn()}
              draggable={false}
            />
            
            {/* Mobile Swipe Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full
                            sm:hidden">
              {isZoomed ? 'Double tap to reset zoom' : 'Swipe left/right to navigate'}
            </div>
          </div>

          <button
            onClick={handleNextImage}
            disabled={selectedIndex === featuredGalleryImages.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-60 p-3 rounded-full hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       hidden sm:block"
            title="Next (→ or swipe left)"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Info Panel */}
          {showImageInfo && selectedIndex >= 0 && (
            <div className="absolute right-4 top-20 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm slide-up
                            max-sm:right-2 max-sm:left-2 max-sm:max-w-none">
              <h3 className="font-semibold mb-2">{featuredGalleryImages[selectedIndex]?.alt}</h3>
              <div className="space-y-1 text-sm opacity-90">
                <p><span className="opacity-75">Category:</span> {featuredGalleryImages[selectedIndex]?.category}</p>
                <p><span className="opacity-75">Location:</span> {featuredGalleryImages[selectedIndex]?.location}</p>
                <p><span className="opacity-75">Photographer:</span> {featuredGalleryImages[selectedIndex]?.photographer}</p>
                <p><span className="opacity-75">Year:</span> {featuredGalleryImages[selectedIndex]?.date}</p>
              </div>
            </div>
          )}

          {/* Image Thumbnails Strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 px-4">
            {featuredGalleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleImageClick(image.url, index)}
                className={`relative flex-shrink-0 w-12 h-12 rounded overflow-hidden transition-all duration-200 ${
                  index === selectedIndex 
                    ? 'ring-2 ring-white scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Section - Optimized */}
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

          {/* Optimized Gallery Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 w-full
                          sm:gap-3 sm:mb-6
                          md:grid-cols-3 md:gap-4
                          lg:grid-cols-4">
            {featuredGalleryImages.map((photo, index) => (
              <div 
                key={photo.id}
                onClick={() => handleImageClick(photo.url, index)}
                className="gallery-item group cursor-pointer relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transform transition-all duration-300 hover:scale-105 w-full
                           sm:rounded-xl
                           md:rounded-2xl"
              >
                <div className="aspect-square w-full">
                  <img 
                    src={photo.url} 
                    alt={photo.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
                    loading="lazy" 
                  />
                </div>
                
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-1.5 left-1.5 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200
                                sm:top-2 sm:left-2 sm:-translate-y-6">
                  <span className="bg-white/90 text-chocolate px-2 py-0.5 rounded text-xs font-medium
                                   sm:px-2 sm:py-1 sm:text-sm">
                    {photo.category}
                  </span>
                </div>
                
                {/* Enhanced icons */}
                <div className="absolute bottom-1.5 right-1.5 flex gap-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 delay-75
                                sm:bottom-2 sm:right-2 sm:translate-y-6 sm:gap-2">
                  <div className="bg-white/90 text-chocolate p-1 rounded-full
                                  sm:p-1.5">
                    <Eye className="w-3 h-3
                                   sm:w-4 sm:h-4" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(photo.id);
                    }}
                    className={`p-1 rounded-full sm:p-1.5 transition-all duration-200 ${
                      favorites.includes(photo.id) 
                        ? 'bg-red-100 text-red-500' 
                        : 'bg-white/90 text-chocolate hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${favorites.includes(photo.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Location info */}
                <div className="absolute bottom-1.5 left-1.5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 delay-100
                                sm:bottom-2 sm:left-2 sm:translate-y-6">
                  <span className="bg-white/90 text-chocolate px-2 py-0.5 rounded text-xs
                                   sm:text-sm">
                    {photo.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Button */}
          <div className="text-center w-full">
            <Link 
              to="/gallery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-chocolate to-chocolate-light text-white px-5 py-2.5 rounded-full font-playfair text-sm hover:shadow-lg hover:scale-105 transition-all duration-200
                         sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
            >
              View Complete Gallery
              <ArrowRight className="w-3 h-3
                                   sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
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
            <div 
              ref={testimonialsRef}
              className="overflow-hidden rounded-xl
                        sm:rounded-2xl
                        md:rounded-3xl"
              onTouchStart={handleTestimonialTouchStart}
              onTouchMove={handleTestimonialTouchMove}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out w-full"
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
                            <h4 className="font-amsterdam leading-loose mb-4 text-lg text-chocolate
                                           sm:text-xl
                                           md:text-xl
                                           lg:text-2xl">
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

            {/* Testimonials Navigation */}
            <div className="flex justify-center mt-6 space-x-2 w-full
                            sm:mt-8 sm:space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`transition-all duration-200 ${
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
