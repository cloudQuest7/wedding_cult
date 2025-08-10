"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"

const Portfolio = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [typedText, setTypedText] = useState("")
  const filmStripRef = useRef(null)

  const portfolioItems = [
    { id: 1, couple: "Yash & Kejal", location: "Jaipur", type: "Pre-Wedding", embedId: "ly9ejEF1DqU" },
    { id: 2, couple: "Jobin & Jesline", location: "Kerala", type: "Wedding Film", embedId: "VWkzOkb21UA" },
    { id: 3, couple: "Pranay & Aishwarya", location: "Mumbai", type: "Pre-Wedding", embedId: "II_KVGp3WKM" },
  ]

  // Typing effect
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
    }, 80)
    return () => clearInterval(timer)
  }, [])

  const currentVideo = portfolioItems[currentVideoIndex]
  const nextVideo = () => { setCurrentVideoIndex((p) => (p + 1) % portfolioItems.length); setIsPlaying(false) }
  const prevVideo = () => { setCurrentVideoIndex((p) => (p - 1 + portfolioItems.length) % portfolioItems.length); setIsPlaying(false) }

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

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <div className="text-center mb-12 pt-16 px-4">
        <h1 className="font-amsterdam text-5xl font-bold text-chocolate mb-6">
          Our Cinematic Stories
        </h1>
        <div className="min-h-[60px] flex items-center justify-center">
          <p className="font-playfair text-xl text-muted-foreground max-w-2xl text-center">
            {typedText}
            <span className="animate-pulse text-chocolate font-bold">|</span>
          </p>
        </div>
        <div className="w-20 h-1 bg-chocolate mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Video Player */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">▶</div>
              <span className="text-white text-sm truncate">{currentVideo.couple} | {currentVideo.type}</span>
            </div>
            <span className="text-gray-400 text-xs">{currentVideoIndex + 1}/{portfolioItems.length}</span>
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
                className="relative w-full h-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg)` }}
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 text-black p-6 rounded-full hover:scale-110 transition-all shadow-2xl">▶</div>
                </div>
              </div>
            )}
            {/* Nav */}
            <button onClick={prevVideo} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 text-white rounded-full hover:bg-chocolate transition">◀</button>
            <button onClick={nextVideo} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 text-white rounded-full hover:bg-chocolate transition">▶</button>
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {portfolioItems.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentVideoIndex(i); setIsPlaying(false) }}
              className={`rounded-full transition-all ${currentVideoIndex === i ? "w-6 h-2 bg-chocolate" : "w-2 h-2 bg-chocolate/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Film Strip */}
      <div className="mb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-black py-8 rounded-2xl overflow-hidden relative">
            <div className="overflow-hidden">
              <div ref={filmStripRef} className="flex gap-4 px-4 min-w-max">
                {[
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
                  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
                  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800",
                  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800",
                ].map((src, i) => (
                  <div key={i} className="w-48 sm:w-64 h-36 sm:h-48 flex-shrink-0">
                    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-chocolate/50 transition">
                      <img src={src} alt="Portfolio film strip" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Perforations */}
            <div className="flex justify-center mt-4 gap-2">
              {[...Array(8)].map((_, i) => <div key={i} className="w-2 h-2 bg-gray-700 rounded-sm"></div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Why Us Cards */}
      <div className="max-w-6xl mx-auto mb-16 px-4 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "HEARTFELT DIALOGUES",
            subtitle: "POWERFUL STORYTELLING",
            desc: "Intimate conversations that capture the humor, drama, emotion, and love of your wedding.",
            img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
            tag: "POWERFUL",
            color: "from-rose-500 to-pink-600"
          },
          {
            title: "CINEMATIC EXCELLENCE",
            subtitle: "PIONEERING CINEMA",
            desc: "State-of-the-art technology to reinvent ourselves for every story and create unique masterpieces.",
            img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
            tag: "PIONEERING",
            color: "from-blue-500 to-cyan-600"
          },
          {
            title: "TIMELESS TUNES",
            subtitle: "SIGNATURE SOUNDSCAPES",
            desc: "Award-winning music crafted exclusively for you, harmonizing with your wedding's mood and story.",
            img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
            tag: "SIGNATURE",
            color: "from-purple-500 to-indigo-600"
          },
        ].map((card, i) => (
          <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:scale-[1.02] group">
            <div className="relative h-48 overflow-hidden">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 bg-gradient-to-r ${card.color} rounded-full text-white text-xs font-medium`}>{card.tag}</div>
              </div>
            </div>
            <div className="p-6 text-center">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{card.subtitle}</div>
              <h3 className="text-xl text-chocolate mb-3 font-amsterdam">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
