"use client"

import { useState, useEffect } from "react"

const Portfolio = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [typedText, setTypedText] = useState("")

  const portfolioItems = [
    {
      id: 1,
      couple: "Yash & Kejal",
      location: "Jaipur",
      type: "Pre-Wedding",
      embedId: "ly9ejEF1DqU",
    },
    {
      id: 2,
      couple: "Jobin & Jesline",
      location: "Kerala",
      type: "Wedding Film",
      embedId: "VWkzOkb21UA",
    },
    {
      id: 3,
      couple: "Pranay & Aishwarya",
      location: "Mumbai",
      type: "Pre-Wedding",
      embedId: "II_KVGp3WKM",
    },
  ]

  // Simple typing animation
  useEffect(() => {
    const text = "Every love story is different & so is our lens."
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const currentVideo = portfolioItems[currentVideoIndex]

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % portfolioItems.length)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:ml-0 w-full">
        {/* Header */}
        <div className="text-center mb-12 pt-16 px-4 sm:px-6 lg:px-8">
          <h1 className="font-amsterdam text-4xl sm:text-5xl lg:text-6xl font-bold text-chocolate mb-6">
            Our Cinematic Stories
          </h1>

          {/* Typing Animation */}
          <div className="min-h-[60px] flex items-center justify-center px-4">
            <p className="font-playfair text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl text-center">
              {typedText}
              <span className="animate-pulse text-chocolate font-bold">|</span>
            </p>
          </div>

          <div className="w-20 h-1 bg-chocolate mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Video Player Section */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-chocolate/10 rounded-full backdrop-blur-sm border border-chocolate/20">
              <span className="text-lg">🎬</span>
              <span className="font-poppins text-sm font-medium text-chocolate">Featured Films</span>
            </div>
            <h2 className="font-amsterdam text-3xl sm:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
              Our Latest Creations
            </h2>
          </div>

          {/* Video Player */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl w-full">
            {/* Header */}
            <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                  ▶
                </div>
                <span className="text-white font-medium font-poppins text-sm truncate">
                  {currentVideo.couple} | {currentVideo.type}
                </span>
              </div>
              <div className="text-gray-400 text-xs font-poppins flex-shrink-0 ml-2">
                {currentVideoIndex + 1}/{portfolioItems.length}
              </div>
            </div>

            {/* Video Area */}
            <div className="relative aspect-video w-full">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1`}
                  title={currentVideo.couple}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full bg-cover bg-center cursor-pointer group"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg)`,
                  }}
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 hover:bg-white text-black p-4 sm:p-6 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl">
                      <span className="text-xl sm:text-2xl">▶</span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="absolute bottom-4 left-4 text-white max-w-[calc(100%-2rem)]">
                    <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
                      <h3 className="font-amsterdam text-lg sm:text-xl mb-1 truncate">{currentVideo.couple}</h3>
                      <p className="font-poppins text-xs sm:text-sm opacity-90 truncate">
                        {currentVideo.location} • {currentVideo.type}
                      </p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-chocolate/90 backdrop-blur-sm text-cream px-3 py-1 rounded-full text-xs font-poppins font-medium">
                      {currentVideo.type}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <button
                onClick={prevVideo}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/70 hover:bg-chocolate/90 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-xl backdrop-blur-sm"
              >
                <span className="text-sm sm:text-base">◀</span>
              </button>

              <button
                onClick={nextVideo}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/70 hover:bg-chocolate/90 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-xl backdrop-blur-sm"
              >
                <span className="text-sm sm:text-base">▶</span>
              </button>
            </div>

            {/* Controls */}
            <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-chocolate transition-colors text-lg"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <span className="text-white text-xs sm:text-sm font-poppins">
                  {isPlaying ? "Now Playing" : "Click to Play"}
                </span>
              </div>
              <span className="text-red-500 font-bold text-xs sm:text-sm font-poppins">YouTube</span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentVideoIndex(index)
                  setIsPlaying(false)
                }}
                className={`transition-all duration-300 rounded-full hover:scale-125 ${
                  currentVideoIndex === index
                    ? "w-6 h-2 bg-chocolate shadow-lg"
                    : "w-2 h-2 bg-chocolate/30 hover:bg-chocolate/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Film Strip Section */}
        <div className="mb-16 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Film strip content */}
            <div className="bg-black py-8 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <div className="flex gap-4 px-4 animate-scroll min-w-max">
                  {[
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=300&fit=crop",
                  ].map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-48 sm:w-64 h-36 sm:h-48">
                      <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800 hover:border-chocolate/50 transition-all duration-500">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Wedding ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-white text-xs bg-black px-2 py-1 rounded font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Perforations */}
              <div className="flex justify-center mt-4 gap-2 sm:gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-700 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div className="w-full max-w-5xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-chocolate/10 rounded-full backdrop-blur-sm border border-chocolate/20">
              <span className="text-lg">🏆</span>
              <span className="font-poppins text-xs font-medium text-chocolate uppercase tracking-wider">
                Why Choose Us?
              </span>
            </div>
            <h2 className="font-amsterdam text-3xl sm:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
              HEARTFELT • CINEMATIC • TIMELESS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-romantic hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
                  alt="Powerful Storytelling"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-white text-xs font-poppins font-medium">
                    POWERFUL
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="font-poppins text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                  POWERFUL STORYTELLING
                </div>
                <h3 className="font-amsterdam text-xl text-chocolate mb-3">HEARTFELT DIALOGUES</h3>
                <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
                  Intimate conversations that capture the humor, drama, emotion, and love of your wedding.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-romantic hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop"
                  alt="Pioneering Cinema"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full text-white text-xs font-poppins font-medium">
                    PIONEERING
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="font-poppins text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                  PIONEERING CINEMA
                </div>
                <h3 className="font-amsterdam text-xl text-chocolate mb-3">CINEMATIC EXCELLENCE</h3>
                <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
                  State-of-the-art technology to reinvent ourselves for every story and create unique masterpieces.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-romantic hover:shadow-2xl transition-all duration-500 hover:scale-105 group md:col-span-2 lg:col-span-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
                  alt="Signature Soundscapes"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white text-xs font-poppins font-medium">
                    SIGNATURE
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="font-poppins text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                  SIGNATURE SOUNDSCAPES
                </div>
                <h3 className="font-amsterdam text-xl text-chocolate mb-3">TIMELESS TUNES</h3>
                <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
                  Award-winning music crafted exclusively for you, harmonizing with your wedding's mood and story.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="gradient-romantic rounded-2xl p-8 sm:p-12 text-center text-white shadow-romantic overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10 animate-pulse"></div>

            <div className="relative z-10">
              <h2 className="font-amsterdam text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Create Your Story?
              </h2>
              <div className="w-16 h-1 bg-white/50 mx-auto mb-6 rounded-full"></div>
              <p className="font-playfair text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how we can capture your special moments with cinematic beauty and timeless elegance.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-chocolate px-8 py-4 rounded-full font-poppins font-bold text-base hover:bg-cream transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Let's Begin Your Story
                <span className="ml-2 text-lg">❤️</span>
              </a>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Portfolio
