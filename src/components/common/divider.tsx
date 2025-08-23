import { useRef, useEffect, useState } from 'react';

const WeddingRingsDivider = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let scrollProgress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        scrollProgress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)));
      }

      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full py-24 bg-gradient-to-b from-rose-50 via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="relative">
          {/* Wedding rings animation */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            {/* Left ring */}
            <div 
              className="w-16 h-16 border-4 border-rose-400 rounded-full relative transition-all duration-1000 ease-out"
              style={{
                opacity: progress,
                transform: `translateX(${-20 * (1 - progress)}px) rotate(${360 * progress}deg)`,
              }}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-rose-500 rounded-full"></div>
            </div>
            
            {/* Right ring */}
            <div 
              className="w-16 h-16 border-4 border-pink-400 rounded-full relative transition-all duration-1000 ease-out"
              style={{
                opacity: progress,
                transform: `translateX(${20 * (1 - progress)}px) rotate(${-360 * progress}deg)`,
              }}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
            </div>
          </div>

          {/* Decorative line with hearts */}
          <div className="relative h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>

          {/* Floating hearts */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-rose-400 text-sm"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 2) * 40}%`,
                  opacity: progress > 0.3 ? 1 : 0,
                  transform: `translateY(${-10 * progress}px) scale(${0.5 + progress * 0.5})`,
                  transition: 'all 0.8s ease-out',
                }}
              >
                ♡
              </div>
            ))}
          </div>

          {/* Center text that appears */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-600 font-script text-lg"
            style={{
              opacity: progress > 0.7 ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${progress})`,
              transition: 'all 0.6s ease-out',
            }}
          >
            ∞
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingRingsDivider;
