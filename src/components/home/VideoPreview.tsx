"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Volume2, Maximize, MoreHorizontal } from "lucide-react"
import { gsap } from "gsap"

const VideoPreview = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const sectionRef = useRef(null)
  const videoPlayerRef = useRef(null)
  const contentRef = useRef(null)

  const videos = [
    {
      id: "video1",
      embedId: "jF_kNaTp-KA",
      title: "Neel & Jheel Wedding Film",
      coupleNames: "Neel & Jheel",
      location: "Jaipur, Rajasthan",
      year: "2024",
      duration: "12:45",
      category: "Traditional Wedding",
    },
    {
      id: "video2",
      embedId: "XOyKGqbR2nM",
      title: "Rahul & Manisha Wedding Film",
      coupleNames: "Rahul & Manisha",
      location: "Mumbai, Maharashtra",
      year: "2024",
      duration: "15:20",
      category: "Modern Wedding",
    },
  ]

  const currentVideo = videos[currentVideoIndex]

  // Auto-slide functionality - switch every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
      setActiveVideo(null)
      setIsPlaying(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [videos.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        videoPlayerRef.current,
        { opacity: 0, x: -100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" },
      )

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 100, y: 50 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 },
      )

      // Floating animation for the preview window
      gsap.to(".preview-window", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(activeVideo === videoId ? null : videoId)
    setIsPlaying(activeVideo !== videoId)
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    setActiveVideo(null)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
    setActiveVideo(null)
    setIsPlaying(false)
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-[80vh] bg-gradient-to-br from-background via-beige-light/10 to-background px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-chocolate/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-beige-warm/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-chocolate/15 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Video Player Section - Netflix Style with Coffee Theme */}
          <div ref={videoPlayerRef} className="relative">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-chocolate/10 border border-chocolate/20">
              {/* Video Content */}
              {activeVideo === currentVideo.id ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                  title={currentVideo.title}
                  allow="autoplay; fullscreen"
                  key={`${currentVideo.id}-playing`}
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center relative group cursor-pointer"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg)`,
                  }}
                  onClick={() => handleVideoPlay(currentVideo.id)}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-chocolate/60 group-hover:bg-chocolate/40 transition-all duration-500"></div>

                  {/* Wedding Cult branding */}
                  <div className="absolute top-6 left-6 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-chocolate rounded-sm flex items-center justify-center font-bold text-cream text-sm">
                      W
                    </div>
                    <span className="text-cream font-medium text-sm">The Wedding Cult Films</span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-6 right-6 bg-chocolate/90 text-cream px-3 py-1 rounded-full text-sm font-medium">
                    {currentVideo.duration}
                  </div>

                  {/* Preview window overlay */}
                  <div className="preview-window absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-24 bg-chocolate/90 rounded-xl border border-beige-warm/30 backdrop-blur-sm overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-chocolate/70 to-beige-warm/50 flex items-center justify-center">
                      <Play className="w-8 h-8 text-cream" />
                    </div>
                    <div className="absolute bottom-2 right-2 text-cream text-xs font-mono bg-chocolate/80 px-2 py-1 rounded">
                      {currentVideo.duration}
                    </div>
                  </div>

                  {/* Main play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-cream hover:bg-white text-chocolate p-8 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                  </div>

                  {/* Coffee-themed controls overlay */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-chocolate/90 to-transparent p-6 transition-opacity duration-300 ${
                      showControls ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-beige-warm/30 rounded-full mb-4">
                      <div className="w-1/3 h-full bg-cream rounded-full"></div>
                    </div>

                    {/* Control buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-cream hover:text-beige-warm transition-colors"
                          aria-label="Play video"
                          title="Play video"
                        >
                          <Play className="w-6 h-6" />
                        </button>
                        <button
                          className="text-cream hover:text-beige-warm transition-colors"
                          aria-label="Volume control"
                          title="Volume control"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <span className="text-cream text-sm font-mono">0:00 / {currentVideo.duration}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-cream hover:text-beige-warm transition-colors"
                          aria-label="More options"
                          title="More options"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <button
                          className="text-cream hover:text-beige-warm transition-colors"
                          aria-label="Fullscreen"
                          title="Fullscreen"
                        >
                          <Maximize className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video navigation arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevVideo()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-chocolate/80 hover:bg-chocolate text-cream rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Previous video"
                    title="Previous video"
                  >
                    <span className="text-xl">‹</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextVideo()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-chocolate/80 hover:bg-chocolate text-cream rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Next video"
                    title="Next video"
                  >
                    <span className="text-xl">›</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Information Section - Minimalistic Netflix Layout */}
          <div ref={contentRef} className="text-chocolate pt-4">
            {/* Series/Category Info */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-chocolate font-bold text-sm uppercase tracking-wider">Wedding Films</span>
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground text-sm">{currentVideo.year}</span>
              </div>
            </div>

            {/* Main Title - Clean and Minimalistic */}
            <div className="mb-8">
              <h1 className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-2 leading-tight tracking-tight">
                FEATURED IN
              </h1>
              <h2 className="font-amsterdam text-2xl sm:text-3xl text-chocolate mb-2 leading-tight tracking-tight">
                THE WEDDING CULT'S
              </h2>
              <h3 className="font-amsterdam text-3xl sm:text-4xl text-chocolate leading-tight tracking-tight font-bold">
                {currentVideo.coupleNames.toUpperCase()}
              </h3>
            </div>

            {/* Breadcrumb Navigation - Clean and Simple */}
            <div className="flex items-center space-x-3 mb-8 text-sm">
              <span className="text-muted-foreground hover:text-chocolate cursor-pointer transition-colors">
                The Wedding Cult
              </span>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-muted-foreground hover:text-chocolate cursor-pointer transition-colors">
                {currentVideo.category}
              </span>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-chocolate font-medium">{currentVideo.coupleNames}</span>
              <span className="text-muted-foreground ml-auto">{currentVideo.location}</span>
            </div>

            {/* Video Selection Dots - Minimalistic */}
            <div className="flex items-center space-x-4">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentVideoIndex === index
                      ? "bg-chocolate scale-125 shadow-lg"
                      : "bg-beige-warm/50 hover:bg-chocolate/50 hover:scale-110"
                  }`}
                  aria-label={`Select video ${index + 1}: ${video.coupleNames}`}
                  title={`Select video ${index + 1}: ${video.coupleNames}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoPreview
