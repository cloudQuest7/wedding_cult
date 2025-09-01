"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Play, Volume2, Maximize, MoreHorizontal } from "lucide-react"
import { gsap } from "gsap"

const VideoPreview = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  
  // Touch/Swipe state - optimized
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [isSwipping, setIsSwipping] = useState(false)
  
  const sectionRef = useRef(null)
  const videoPlayerRef = useRef(null)
  const contentRef = useRef(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  // Memoize videos array to prevent recreation
  const videos = useMemo(() => [
    {
      id: "video1",
      embedId: "Mb3u8RnwU6k",
      title: "Yash & Kejal Wedding Film",
      coupleNames: "Yash & Kejal",
      year: "2025",
      duration: "0:59",
      category: "Sangeet Ceremony",
    },
    {
      id: "video2",
      embedId: "XOyKGqbR2nM",
      title: "Rahul & Manisha Wedding Film",
      coupleNames: "Rahul & Manisha",
      year: "2024",
      duration: "0:59",
      category: "Modern Wedding",
    },
  ], [])

  // Memoize current video to prevent recalculation
  const currentVideo = useMemo(() => videos[currentVideoIndex], [videos, currentVideoIndex])

  // Optimized swipe handlers with useCallback
  const minSwipeDistance = 50

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwipping(true)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling while swiping
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return
    
    const touchEnd = e.changedTouches[0].clientX
    const distance = touchStart - touchEnd

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Left swipe - next video
        setCurrentVideoIndex(prev => (prev + 1) % videos.length)
      } else {
        // Right swipe - previous video
        setCurrentVideoIndex(prev => (prev - 1 + videos.length) % videos.length)
      }
      setActiveVideo(null)
      setIsPlaying(false)
    }
    
    setTouchStart(null)
    setIsSwipping(false)
  }, [touchStart, videos.length])

  // Optimized navigation functions
  const nextVideo = useCallback(() => {
    setCurrentVideoIndex(prev => (prev + 1) % videos.length)
    setActiveVideo(null)
    setIsPlaying(false)
  }, [videos.length])

  const prevVideo = useCallback(() => {
    setCurrentVideoIndex(prev => (prev - 1 + videos.length) % videos.length)
    setActiveVideo(null)
    setIsPlaying(false)
  }, [videos.length])

  const handleVideoPlay = useCallback((videoId: string) => {
    setActiveVideo(current => current === videoId ? null : videoId)
    setIsPlaying(current => !current)
  }, [])

  // Optimized auto-slide with proper cleanup
  useEffect(() => {
    if (activeVideo !== null) {
      // Clear auto-slide when video is playing
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
        autoSlideRef.current = null
      }
      return
    }

    // Set auto-slide
    autoSlideRef.current = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % videos.length)
    }, 7000)

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
        autoSlideRef.current = null
      }
    }
  }, [activeVideo, videos.length])

  // Optimized GSAP animations - only run once per video change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoPlayerRef.current,
        { opacity: 0.8, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      )

      gsap.fromTo(
        contentRef.current,
        { opacity: 0.8, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
      )
    })

    return () => ctx.revert()
  }, [currentVideoIndex]) // Only animate on video change

  // Memoize video thumbnail URL to prevent recalculation
  const thumbnailUrl = useMemo(() => 
    `https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg`,
    [currentVideo.embedId]
  )

  return (
    <section
      ref={sectionRef}
      className="min-h-[60vh] bg-gradient-to-br from-background via-beige-light/5 to-background px-3 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8 relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Video Player Section */}
          <div ref={videoPlayerRef} className="relative">
            {/* Swipe Indicator - only show when actually swiping */}
            {isSwipping && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-chocolate/90 text-cream px-4 py-2 rounded-full text-sm font-medium">
                ← Swipe to navigate →
              </div>
            )}

            <div className={`relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-chocolate/5 border border-chocolate/10 transition-transform duration-200 ${isSwipping ? 'scale-[0.98]' : ''}`}>
              {/* Video Content */}
              {activeVideo === currentVideo.id ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                  title={currentVideo.title}
                  allow="autoplay; fullscreen"
                  key={currentVideo.id} // Stable key
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center relative group cursor-pointer"
                  style={{ backgroundImage: `url(${thumbnailUrl})` }}
                  onClick={() => handleVideoPlay(currentVideo.id)}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-chocolate/50 group-hover:bg-chocolate/35 transition-all duration-500"></div>

                  {/* Wedding Cult branding */}
                  <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-chocolate rounded-lg flex items-center justify-center font-bold text-cream text-xs sm:text-sm">
                      W
                    </div>
                    <span className="text-cream font-medium text-xs sm:text-sm">The Wedding Cult</span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-chocolate/90 text-cream px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {currentVideo.duration}
                  </div>

                  {/* Main play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-cream/95 hover:bg-white text-chocolate p-6 sm:p-8 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Play className="w-8 sm:w-10 h-8 sm:h-10 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevVideo()
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-chocolate/80 hover:bg-chocolate text-cream rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous video"
                  >
                    <span className="text-xl sm:text-2xl font-light">‹</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextVideo()
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-chocolate/80 hover:bg-chocolate text-cream rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next video"
                  >
                    <span className="text-xl sm:text-2xl font-light">›</span>
                  </button>

                  {/* Simplified controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-chocolate/80 to-transparent p-4 sm:p-6">
                    <div className="w-full h-1 bg-beige-warm/30 rounded-full mb-3">
                      <div className="w-1/3 h-full bg-cream rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between text-cream">
                      <div className="flex items-center space-x-3">
                        <Play className="w-5 h-5" />
                        <span className="text-sm font-mono">0:00 / {currentVideo.duration}</span>
                      </div>
                      <Maximize className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile swipe hint */}
            <div className="block sm:hidden mt-2 text-center">
              <p className="text-chocolate/60 text-sm">Swipe left or right to browse videos</p>
            </div>
          </div>

          {/* Content Information Section */}
          <div ref={contentRef} className="text-chocolate pt-1 sm:pt-2 px-1 sm:px-0">
            {/* Series/Category Info */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-chocolate font-bold text-xs sm:text-sm uppercase tracking-wider">Wedding Films</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground text-xs sm:text-sm">{currentVideo.year}</span>
              </div>
            </div>

            {/* Title */}
            <div className="mb-4 sm:mb-6">
              <div className="mb-2">
                <p className="font-playfair text-xs sm:text-sm text-chocolate/70 mb-1 uppercase tracking-widest font-light">
                  Featured Wedding
                </p>
              </div>
              <h1 className="font-amsterdam text-md sm:text-2xl md:text-2xl text-chocolate leading-loose font-normal mb-2">
                {currentVideo.coupleNames}
              </h1>
              <p className="text-chocolate/70 text-sm sm:text-base mb-2">
                {currentVideo.category}
              </p>
            </div>

            {/* Video Selection Dots */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {videos.map((video, index) => (
                  <button
                    key={video.id} // Use stable key
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                      currentVideoIndex === index
                        ? "bg-chocolate shadow-lg"
                        : "bg-beige-warm/40 hover:bg-chocolate/60"
                    }`}
                    aria-label={`Select video ${index + 1}: ${video.coupleNames}`}
                  >
                    {currentVideoIndex === index && (
                      <div className="absolute inset-0 bg-chocolate rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Video counter */}
              <span className="text-chocolate/60 text-sm font-mono">
                {String(currentVideoIndex + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoPreview
