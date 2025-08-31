import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Share2, Heart, Eye } from "lucide-react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";

// Memoized Animated Background with reduced elements
const AnimatedPatterns = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <svg width="6" height="6" viewBox="0 0 8 8" className="text-beige-warm/15">
              <path
                d="M4 0L4.854 2.146L7 1.292L5.708 3.292L8 4L5.708 4.708L7 6.708L4.854 5.854L4 8L3.146 5.854L1 6.708L2.292 4.708L0 4L2.292 3.292L1 1.292L3.146 2.146L4 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`flower-${i}`}
            className="absolute animate-float opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" className="text-primary/5">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
});

// Memoized Category Filter
const CategoryFilter = memo(({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-poppins font-medium text-sm transition-all duration-200 ${
            activeCategory === category
              ? "bg-gradient-to-r from-chocolate to-chocolate-light text-cream shadow-lg"
              : "bg-white/80 text-chocolate hover:bg-beige-warm/50 hover:shadow-md"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
});

// Optimized Image Component
const GalleryImage = memo(({ photo, index, onClick, isVisible, favorites, toggleFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageFailed(true);
  }, []);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    onClick(photo.url, index);
  }, [photo.url, index, onClick]);

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(photo.id);
  }, [photo.id, toggleFavorite]);

  if (!isVisible) {
    return (
      <div 
        className="gallery-item break-inside-avoid mb-4"
        style={{ height: '200px', backgroundColor: '#f5f5f0' }}
      />
    );
  }

  return (
    <div 
      className="gallery-item group cursor-pointer break-inside-avoid mb-4 will-change-transform"
      style={{
        animationDelay: `${Math.min(index * 0.01, 0.5)}s`,
        animationFillMode: 'both',
        contentVisibility: 'auto',
        containIntrinsicSize: '200px'
      }} 
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-[1.02]">
        <div className="relative w-full">
          {!imageFailed ? (
            <img 
              src={photo.url.includes('imagekit.io') 
                ? `${photo.url}${photo.url.includes('?') ? '&' : '?'}tr=w-300,q-70,f-webp`
                : photo.url}
              alt={photo.alt}
              className={`w-full h-auto object-contain transition-opacity duration-200 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
              draggable={false}
              style={{ backgroundColor: '#f5f5f0' }}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-beige-warm/20 to-cream/30 flex items-center justify-center">
              <span className="text-chocolate/40 text-sm">Image unavailable</span>
            </div>
          )}

          {!imageLoaded && !imageFailed && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-beige-warm/20 to-cream/30">
              <div className="w-4 h-4 border-2 border-chocolate/20 border-t-chocolate/60 rounded-full animate-spin" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="bg-white/90 text-chocolate px-2 py-1 rounded text-xs font-medium">
              {photo.category}
            </span>
          </div>
          
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white/90 text-chocolate p-1.5 rounded-full">
              <Eye className="w-3 h-3" />
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-full transition-colors duration-150 ${
                favorites.includes(photo.id) 
                  ? 'bg-red-100 text-red-500' 
                  : 'bg-white/90 text-chocolate'
              }`}
            >
              <Heart className={`w-3 h-3 ${favorites.includes(photo.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const LoadMoreButton = memo(({ onClick, loading, hasMore }) => {
  if (!hasMore) return null;
  
  return (
    <div className="text-center py-8">
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-6 py-3 bg-gradient-to-r from-chocolate to-chocolate-light text-cream rounded-full font-poppins font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? 'animate-pulse' : 'hover:shadow-xl hover:scale-105'
        }`}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
});

const Gallery = () => {
  // State management
  const [galleryState, setGalleryState] = useState({
    selectedImage: null,
    selectedIndex: -1,
    activeCategory: "All",
    displayedCount: 12,
    loading: false
  });

  const [lightboxState, setLightboxState] = useState({
    isZoomed: false,
    zoomLevel: 1,
    dragPosition: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    showImageInfo: false
  });

  const [visibleImages, setVisibleImages] = useState(new Set());
  const [favorites, setFavorites] = useState([]);
  
  // Enhanced swipe detection state
  const [swipeState, setSwipeState] = useState({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0,
    isSwiping: false,
    swipeDirection: null
  });
  
  // Refs
  const galleryRef = useRef(null);
  const scrollPosition = useRef(0);
  const imageRef = useRef(null);
  const lightboxRef = useRef(null);
  
  const IMAGES_PER_LOAD = 8;
  const SWIPE_THRESHOLD = 50;
  const SWIPE_VELOCITY_THRESHOLD = 0.3;

  // Optimized scroll lock
  const lockScroll = useCallback(() => {
    scrollPosition.current = window.pageYOffset;
    
    requestAnimationFrame(() => {
      document.body.style.cssText = `
        overflow: hidden !important;
        position: fixed !important;
        top: -${scrollPosition.current}px !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        touch-action: none !important;
      `;
    });
  }, []);

  const unlockScroll = useCallback(() => {
    requestAnimationFrame(() => {
      document.body.style.cssText = '';
      window.scrollTo(0, scrollPosition.current);
    });
  }, []);

  // Enhanced swipe handlers
  const handleTouchStart = useCallback((e) => {
    if (lightboxState.isZoomed) return;
    
    const touch = e.touches[0];
    const now = Date.now();
    
    setSwipeState({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      startTime: now,
      isSwiping: false,
      swipeDirection: null
    });
  }, [lightboxState.isZoomed]);

  const handleTouchMove = useCallback((e) => {
    if (lightboxState.isZoomed) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Determine if this is a horizontal swipe
    if (absDeltaX > 10 && absDeltaX > absDeltaY * 1.5) {
      // Prevent default scroll behavior for horizontal swipes
      e.preventDefault();
      
      setSwipeState(prev => ({
        ...prev,
        currentX: touch.clientX,
        currentY: touch.clientY,
        isSwiping: true,
        swipeDirection: deltaX > 0 ? 'right' : 'left'
      }));
    }
  }, [lightboxState.isZoomed, swipeState.startX, swipeState.startY]);

  const handleTouchEnd = useCallback((e) => {
    if (lightboxState.isZoomed || !swipeState.isSwiping) {
      setSwipeState(prev => ({ ...prev, isSwiping: false }));
      return;
    }
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    const deltaTime = Date.now() - swipeState.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;
    
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Check if it's a valid swipe (horizontal, sufficient distance or velocity)
    const isValidSwipe = (
      absDeltaX > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD
    ) && absDeltaX > absDeltaY;
    
    if (isValidSwipe) {
      if (deltaX > 0 && galleryState.selectedIndex > 0) {
        // Swipe right - go to previous image
        handlePrevImage();
      } else if (deltaX < 0 && galleryState.selectedIndex < displayedImages.length - 1) {
        // Swipe left - go to next image
        handleNextImage();
      }
    }
    
    setSwipeState(prev => ({ ...prev, isSwiping: false }));
  }, [
    lightboxState.isZoomed, 
    swipeState.isSwiping, 
    swipeState.startX, 
    swipeState.startTime, 
    galleryState.selectedIndex
  ]);

  // Navigation handlers
  const handlePrevImage = useCallback(() => {
    if (galleryState.selectedIndex > 0) {
      const newIndex = galleryState.selectedIndex - 1;
      setGalleryState(prev => ({
        ...prev,
        selectedIndex: newIndex,
        selectedImage: displayedImages[newIndex].url
      }));
      setLightboxState(prev => ({
        ...prev,
        zoomLevel: 1,
        dragPosition: { x: 0, y: 0 },
        isZoomed: false
      }));
    }
  }, [galleryState.selectedIndex]);

  const handleNextImage = useCallback(() => {
    if (galleryState.selectedIndex < displayedImages.length - 1) {
      const newIndex = galleryState.selectedIndex + 1;
      setGalleryState(prev => ({
        ...prev,
        selectedIndex: newIndex,
        selectedImage: displayedImages[newIndex].url
      }));
      setLightboxState(prev => ({
        ...prev,
        zoomLevel: 1,
        dragPosition: { x: 0, y: 0 },
        isZoomed: false
      }));
    }
  }, [galleryState.selectedIndex]);

  // Image click handler
  const handleImageClick = useCallback((url, index) => {
    setGalleryState(prev => ({
      ...prev,
      selectedImage: url,
      selectedIndex: index
    }));
    
    setLightboxState({
      isZoomed: false,
      zoomLevel: 1,
      dragPosition: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
      showImageInfo: false
    });
    
    lockScroll();
  }, [lockScroll]);

  const handleCloseModal = useCallback(() => {
    unlockScroll();
    
    setGalleryState(prev => ({
      ...prev,
      selectedImage: null,
      selectedIndex: -1
    }));
    
    setLightboxState({
      isZoomed: false,
      zoomLevel: 1,
      dragPosition: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
      showImageInfo: false
    });
  }, [unlockScroll]);

  // Category change handler
  const handleCategoryChange = useCallback((category) => {
    setGalleryState(prev => ({
      ...prev,
      activeCategory: category,
      displayedCount: 12
    }));
  }, []);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (galleryState.loading) return;
    
    setGalleryState(prev => ({ ...prev, loading: true }));
    
    setTimeout(() => {
      setGalleryState(prev => ({
        ...prev,
        displayedCount: prev.displayedCount + IMAGES_PER_LOAD,
        loading: false
      }));
    }, 100);
  }, [galleryState.loading]);

  // Favorites toggle
  const toggleFavorite = useCallback((imageId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId];
      return newFavorites;
    });
  }, []);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setLightboxState(prev => ({
      ...prev,
      zoomLevel: Math.min(prev.zoomLevel + 0.5, 3),
      isZoomed: true
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setLightboxState(prev => {
      const newZoom = Math.max(prev.zoomLevel - 0.5, 1);
      return {
        ...prev,
        zoomLevel: newZoom,
        isZoomed: newZoom > 1,
        dragPosition: newZoom === 1 ? { x: 0, y: 0 } : prev.dragPosition
      };
    });
  }, []);

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updates = new Set(visibleImages);
        entries.forEach((entry) => {
          const imageId = Number(entry.target.getAttribute('data-image-id'));
          if (entry.isIntersecting) {
            updates.add(imageId);
          }
        });
        
        if (updates.size !== visibleImages.size) {
          setVisibleImages(updates);
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    const observeImages = () => {
      const images = document.querySelectorAll('[data-image-id]');
      images.forEach(img => observer.observe(img));
    };

    requestAnimationFrame(observeImages);
    return () => observer.disconnect();
  }, [galleryState.displayedCount, visibleImages.size]);

  // Keyboard navigation
  useEffect(() => {
    if (!galleryState.selectedImage) return;

    let keyTimeout;
    const handleKeyPress = (e) => {
      if (keyTimeout) return;
      
      keyTimeout = setTimeout(() => {
        keyTimeout = null;
      }, 100);

      switch (e.key) {
        case 'Escape':
          handleCloseModal();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (keyTimeout) clearTimeout(keyTimeout);
    };
  }, [galleryState.selectedImage, handleCloseModal, handlePrevImage, handleNextImage, handleZoomIn, handleZoomOut]);

  // Gallery images data - keeping your existing data structure
   const galleryImages = useMemo(() => [
  
    {
      id: 1,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488.jpg?updatedAt=1752122341261",
      alt: "Nilkeshi & Saevesh - Wedding ceremony moment",
      category: "Wedding"
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
      category: "Wedding"
    },
    {
      id: 4,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759464.jpg?updatedAt=1752122335592",
      alt: "Jobin & Jesline - Cinematic wedding moments",
      category: "Portraits"
    },
    {
      id: 5,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-sourav-kundu-87262483-31230267.jpg?updatedAt=1752122328085",
      alt: "Love Stories - Pre-wedding shoot",
      category: "Pre-Wedding"
    },
    {
      id: 6,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theshortguyfilms-29187422.jpg?updatedAt=1752122328713",
      alt: "Wedding ceremony moment",
      category: "Pre-Wedding"
    },
    {
      id: 7,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-16196490.jpg?updatedAt=1752122329114",
      alt: "Moments",
      category: "Wedding"
    },
    // {
    //   id: 8,
    //   url: "https://ik.imagekit.io/7xgikoq8o/pexels-sampark-films-samparkfilms-com-1300296201-32081698.jpg?updatedAt=1752122335732",
    //   alt: "Wedding celebration",
    //   category: "Portraits"
    // },
    {
      id: 9,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000471.jpg?updatedAt=1752122333713",
      alt: "Cinematic wedding collection",
      category: "Wedding"
    },
    {
      id: 10,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144266.jpg?updatedAt=1752122336295",
      alt: "Wedding details",
      category: "Portraits"
    },
    {
      id: 11,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-fotographiya-wedding-photography-823737813-29492597.jpg?updatedAt=1752122327991",
      alt: "Pre-wedding shoot",
      category: "Ceremony"
    },
    {
      id: 12,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-angel-ayala-321556-29851245.jpg?updatedAt=1752122328077",
      alt: "Family moments",
      category: "Pre-Wedding"
    },
    {
      id: 13,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000480.jpg?updatedAt=1752122335536",
      alt: "Couple dancing",
      category: "Wedding"
    },
    {
      id: 14,
      url: "https://ik.imagekit.io/7xgikoq8o/Nilkeshi%20+%20Saevesh%20Cinematic.00_04_33_23.Still015.png?updatedAt=1752122785721",
      alt: "Nilkeshi & Saevesh portrait",
      category: "Wedding"
    },
    {
      id: 15,
      url: "https://ik.imagekit.io/7xgikoq8o/Nilkeshi%20+%20Saevesh%20Cinematic.00_06_24_13.Still024.png?updatedAt=1752122785580",
      alt: "Nilkeshi & Saevesh moments",
      category: "Wedding"
    },
    {
      id: 16,
      url: "https://ik.imagekit.io/7xgikoq8o/Dhiraj%20&%20Rajashri%20Wedding%20Teaser.00_00_52_00.Still001.png?updatedAt=1752122784444",
      alt: "Dhiraj & Rajashri wedding",
      category: "Ceremony"
    },
    {
      id: 17,
      url: "https://ik.imagekit.io/7xgikoq8o/Dhiraj%20&%20Rajashri%20Wedding%20Teaser.00_01_18_06.Still019.png?updatedAt=1752122784770",
      alt: "Wedding celebration",
      category: "Pre-Wedding"
    },
    {
      id: 18,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9210801.jpg?updatedAt=1752218451384",
      alt: "Beautiful couple portrait",
      category: "Wedding"
    },
    {
      id: 19,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-gursher-gill-63702010-18633036.jpg?updatedAt=1752218493332",
      alt: "Pretty bridal moments",
      category: "Portraits"
    },
    {
      id: 20,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-fliqaindia-32499931.jpg?updatedAt=1752218492641",
      alt: "Traditional wedding rituals",
      category: "Ceremony"
    },
    {
      id: 21,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-909646465-31600968.jpg?updatedAt=1752218490957",
      alt: "Couple celebration",
      category: "Pre-Wedding"
    },
    {
      id: 22,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-amit-chowdhury-2402860-18077025.jpg?updatedAt=1752218490697",
      alt: "Wedding photography session",
      category: "Wedding" 
    },
    {
      id: 23,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-lpfstudio023-26558728.jpg?updatedAt=1752218490314",
      alt: "Cinematic wedding moments",
      category: "Pre-Wedding"
    },
    {
      id: 24,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-varun-118342-5759527.jpg?updatedAt=1752218488581",
      alt: "Elegant bridal portrait",
      category: "Pre-Wedding"
    },
    {
      id: 25,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000484.jpg?updatedAt=1752218488535",
      alt: "Wedding ceremony traditions",
      category: "Wedding"
    },
    {
      id: 26,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000464.jpg?updatedAt=1752218486011",
      alt: "Candid wedding moments",
      category: "Wedding"
    },
    {
      id: 27,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000479.jpg?updatedAt=1752218483021",
      alt: "Wedding celebration",
      category: "Wedding"
    },
    // {
    //   id: 28,
    //   url: "https://ik.imagekit.io/7xgikoq8o/pexels-ajay-donga-1113836-2235390.jpg?updatedAt=1752218480207",
    //   alt: "Traditional Indian wedding",
    //   category: "Pre-Wedding"
    // },
    // {
    //   id: 29,
    //   url: "https://ik.imagekit.io/7xgikoq8o/pexels-ajay-donga-1113836-2221392.jpg?updatedAt=1752218479074",
    //   alt: "Wedding rituals captured",
    //   category: "Pre-Wedding"
    // },
    {
      id: 30,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theshortguyfilms-29187414.jpg?updatedAt=1752218469371",
      alt: "Cinematic wedding story",
      category: "Pre-Wedding"
    },
    {
      id: 31,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9400897.jpg?updatedAt=1752218465131",
      alt: "Romantic couple moments",
      category: "Wedding"
    },
    {
      id: 32,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9400896.jpg?updatedAt=1752218464809",
      alt: "Pre-wedding photography",
      category: "Wedding"
    },
    {
      id: 33,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9400899.jpg?updatedAt=1752218464719",
      alt: "Beautiful couple shoot",
      category: "Wedding"
    },
    {
      id: 34,
      url: "https://ik.imagekit.io/7xgikoq8o/fotographiya-wedding-photography-9325564.jpg?updatedAt=1752218464295",
      alt: "Professional wedding photography",
      category: "Ceremony"
    },
    {
      id: 35,
      url: "https://ik.imagekit.io/7xgikoq8o/wedding-9325562.jpg?updatedAt=1752218463122",
      alt: "Wedding celebration moments",
      category: "Wedding"
    },
    {
      id: 36,
      url: "https://ik.imagekit.io/7xgikoq8o/fotographiya-wedding-photography-9325561.jpg?updatedAt=1752218460012",
      alt: "Artistic wedding photography",
      category: "Wedding"
    },
    // {
    //   id: 37,
    //   url: "https://ik.imagekit.io/7xgikoq8o/pexels-theshortguyfilms-29187294.jpg?updatedAt=1752218462738",
    //   alt: "Cinematic wedding capture",
    //   category: "Pre-Wedding"
    // },
    {
      id: 38,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9400893.jpg?updatedAt=1752218462662",
      alt: "Couple love story",
      category: "Pre-Wedding"
    },
    {
      id: 39,
      url: "https://ik.imagekit.io/7xgikoq8o/wedding-photography-9371876.jpg?updatedAt=1752218461631",
      alt: "Wedding photography excellence",
      category: "Pre-Wedding"
    },
    {
      id: 40,
      url: "https://ik.imagekit.io/7xgikoq8o/candid-8535584.jpg?updatedAt=1752218456309",
      alt: "Candid wedding photography",
      category: "Pre-Wedding"
    },
    {
      id: 41,
      url: "https://ik.imagekit.io/7xgikoq8o/pre-wedding-photosession-8812655.jpg?updatedAt=1752218454510",
      alt: "Pre-wedding photo session",
      category: "Pre-Wedding"
    },
    {
      id: 42,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9210812.jpg?updatedAt=1752218453773",
      alt: "Couple portraits",
      category: "Wedding"
    },
    {
      id: 43,
      url: "https://ik.imagekit.io/7xgikoq8o/happy-couple-8457514.jpg?updatedAt=1752218453664",
      alt: "Happy wedding couple",
      category: "Ceremony"
    },
    {
      id: 44,
      url: "https://ik.imagekit.io/7xgikoq8o/indian-wedding-8471648.jpg?updatedAt=1752218453165",
      alt: "Traditional Indian wedding",
      category: "Ceremony"
    },
    {
      id: 45,
      url: "https://ik.imagekit.io/7xgikoq8o/haldi-8457512.jpg?updatedAt=1752218452812",
      alt: "Haldi ceremony moments",
      category: "Ceremony"
    },
    {
      id: 46,
      url: "https://ik.imagekit.io/7xgikoq8o/indian-wedding-8471667.jpg?updatedAt=1752218452169",
      alt: "Indian wedding traditions",
      category: "Ceremony"
    },
    {
      id: 47,
      url: "https://ik.imagekit.io/7xgikoq8o/wedding-photography-8443234.jpg?updatedAt=1752218451592",
      alt: "Wedding photography masterpiece",
      category: "Wedding"
    },
    {
      id: 52,
      url: "https://ik.imagekit.io/7xgikoq8o/DSC02069.jpg?updatedAt=1752469016563",
      alt: "Wedding ceremony capture",
      category: "Ceremony"
    },
    {
      id: 54,
      url: "https://ik.imagekit.io/7xgikoq8o/DSC01828.jpg?updatedAt=1752469017255",
      alt: "Little Moments",
      category: "Ceremony"
    },
    {
      id: 60,
      url: "https://ik.imagekit.io/7xgikoq8o/8575c123-3f5f-4994-92d2-3e4a1c1f07f9.jpg?updatedAt=1752469020327",
      alt: "Beautiful moments",
      category: "Portraits" 
    },
    {
      id: 61,
      url: "https://ik.imagekit.io/7xgikoq8o/Foggy%20days,%20wandering%20thoughts%20..%20%20@dana__designss%20.....png?updatedAt=1752469381426",
      alt: "Dreamy portrait session",
      category: "Portraits"
    },
    {
      id: 62,
      url: "https://ik.imagekit.io/7xgikoq8o/Foggy%20days,%20wandering%20thoughts%20..%20%20@dana__designss%20....._love%20_nature%20_naturelovers%20_photographer%20_photography%20_like%20_likesforlike%20_vagamon%20_model%20_modeling%20_dress%20_style%20_followforfollowback%20_follow%20_insta%20_in%20(8)_PhotoGrid.png?updatedAt=1752469379787",
      alt: "Nature-inspired photography",
      category: "Portraits"
    },
    {
      id: 63,
      url: "https://ik.imagekit.io/7xgikoq8o/Foggy%20days,%20wandering%20thoughts%20..%20%20@dana__designss%20....._love%20_nature%20_naturelovers%20_photographer%20_photography%20_like%20_likesforlike%20_vagamon%20_model%20_modeling%20_dress%20_style%20_followforfollowback%20_follow%20_insta%20_in%20(7)_PhotoGrid.png?updatedAt=1752469379782",
      alt: "Artistic couple photography",
      category: "Portraits"
    },
    {
      id: 64,
      url: "https://ik.imagekit.io/7xgikoq8o/Foggy%20days,%20wandering%20thoughts%20..%20%20@dana__designss%20....._love%20_nature%20_naturelovers%20_photographer%20_photography%20_like%20_likesforlike%20_vagamon%20_model%20_modeling%20_dress%20_style%20_followforfollowback%20_follow%20_insta%20_in%20(3)_PhotoGrid.png?updatedAt=1752469379471",
      alt: "Cinematic nature portraits",
      category: "Portraits"
    },
    {
      id: 65,
      url: "https://ik.imagekit.io/7xgikoq8o/Foggy%20days,%20wandering%20thoughts%20..%20%20@dana__designss%20....._love%20_nature%20_naturelovers%20_photographer%20_photography%20_like%20_likesforlike%20_vagamon%20_model%20_modeling%20_dress%20_style%20_followforfollowback%20_follow%20_insta%20_in%20(6)_PhotoGrid.png?updatedAt=1752469379170",
      alt: "Beautiful outdoor session",
      category: "Portraits"
    },
    {
      id: 66,
      url: "https://ik.imagekit.io/7xgikoq8o/Foggy%20days,%20wandering%20thoughts%20..%20%20@dana__designss%20....._love%20_nature%20_naturelovers%20_photographer%20_photography%20_like%20_likesforlike%20_vagamon%20_model%20_modeling%20_dress%20_style%20_followforfollowback%20_follow%20_insta%20_in%20(4)_PhotoGrid.png?updatedAt=1752469379722",
      alt: "Premium portrait photography",
      category: "Portraits"
    },
    {
      id: 67,
      url: "https://ik.imagekit.io/7xgikoq8o/39.png",
      alt: "Wedding photography collection",
      category: "Pre-Wedding"
    },
    {
      id: 70,
      url: "https://ik.imagekit.io/7xgikoq8o/38.png",
      alt: "Elegant bridal portraits",
      category: "Ceremony"
    },
    {
      id: 71,
      url: "https://ik.imagekit.io/7xgikoq8o/37.png",
      alt: "Wedding celebration moments",
      category: "Pre-Wedding"
    },
    {
      id: 72,
      url: "https://ik.imagekit.io/7xgikoq8o/35.png",
      alt: "Traditional wedding ceremony",
      category: "Pre-Wedding"
    },
    {
      id: 73,
      url: "https://ik.imagekit.io/7xgikoq8o/36.png",
      alt: "Pre-wedding photography session",
      category: "Pre-Wedding"
    },
    {
      id: 74,
      url: "https://ik.imagekit.io/7xgikoq8o/32.png",
      alt: "Candid wedding moments",
      category: "Portraits"
    },
    {
      id: 75,
      url: "https://ik.imagekit.io/7xgikoq8o/34.png",
      alt: "Wedding details and decor",
      category: "Pre-Wedding"
    },
    {
      id: 76,
      url: "https://ik.imagekit.io/7xgikoq8o/30.png",
      alt: "Family wedding portraits",
      category: "Pre-Wedding"
    },
    {
      id: 77,
      url: "https://ik.imagekit.io/7xgikoq8o/27.png",
      alt: "Artistic wedding photography",
      category: "Pre-Wedding"
    },
    {
      id: 78,
      url: "https://ik.imagekit.io/7xgikoq8o/28.png",
      alt: "Romantic couple moments",
      category: "Pre-Wedding"
    },
    {
      id: 79,
      url: "https://ik.imagekit.io/7xgikoq8o/33.png",
      alt: "Wedding ceremony rituals",
      category: "Portraits"
    },
    {
      id: 80,
      url: "https://ik.imagekit.io/7xgikoq8o/31.png",
      alt: "Beautiful bridal shots",
      category: "Ceremony"
    },
    {
      id: 81,
      url: "https://ik.imagekit.io/7xgikoq8o/26.png",
      alt: "Wedding reception celebration",
      category: "Portraits"
    },
    {
      id: 84,
      url: "https://ik.imagekit.io/7xgikoq8o/23.png",
      alt: "Traditional Indian wedding",
      category: "Portraits"
    },
    {
      id: 85,
      url: "https://ik.imagekit.io/7xgikoq8o/22.png",
      alt: "Couple love story",
      category: "Pre-Wedding"
    },
    {
      id: 86,
      url: "https://ik.imagekit.io/7xgikoq8o/21.png",
      alt: "Wedding candid photography",
      category: "Portraits"
    },
    {
      id: 87,
      url: "https://ik.imagekit.io/7xgikoq8o/15.png",
      alt: "Elegant wedding portraits",
      category: "Ceremony"
    },
    {
      id: 88,
      url: "https://ik.imagekit.io/7xgikoq8o/20.png",
      alt: "Wedding ceremony moments",
      category: "Portraits"
    },
    {
      id: 89,
      url: "https://ik.imagekit.io/7xgikoq8o/19.png",
      alt: "Cinematic wedding storytelling",
      category: "Portraits"
    },
    {
      id: 91,
      url: "https://ik.imagekit.io/7xgikoq8o/14.png",
      alt: "Beautiful couple portraits",
      category: "Wedding"
    },
    {
      id: 92,
      url: "https://ik.imagekit.io/7xgikoq8o/17.png",
      alt: "Wedding detail shots",
      category: "Portraits"
    },
    {
      id: 93,
      url: "https://ik.imagekit.io/7xgikoq8o/13.png",
      alt: "wedding couple session",
      category: "Wedding"
    },
    {
      id: 94,
      url: "https://ik.imagekit.io/7xgikoq8o/16.png",
      alt: "Wedding family moments",
      category: "Portraits"
    },
    {
      id: 95,
      url: "https://ik.imagekit.io/7xgikoq8o/12.png",
      alt: "Romantic wedding photography",
      category: "Pre-Wedding"
    },
    {
      id: 96,
      url: "https://ik.imagekit.io/7xgikoq8o/11.png",
      alt: "Wedding ceremony traditions",
      category: "Pre-Wedding"
    },
    {
      id: 97,
      url: "https://ik.imagekit.io/7xgikoq8o/10.png",
      alt: "Beautiful bridal moments",
      category: "Pre-Wedding"
    },
    {
      id: 98,
      url: "https://ik.imagekit.io/7xgikoq8o/9.png",
      alt: "Wedding celebration joy",
      category: "Wedding"
    },
    {
      id: 99,
      url: "https://ik.imagekit.io/7xgikoq8o/8.png",
      alt: "Cinematic couple photography",
      category: "Pre-Wedding"
    },
    {
      id: 100,
      url: "https://ik.imagekit.io/7xgikoq8o/7.png",
      alt: "Traditional wedding rituals",
      category: "Pre-Wedding"
    },
    {
      id: 101,
      url: "https://ik.imagekit.io/7xgikoq8o/6.png",
      alt: "Pre-wedding love story",
      category: "Portraits"
    },
    {
      id: 102,
      url: "https://ik.imagekit.io/7xgikoq8o/5.png",
      alt: "Wedding detail photography",
      category: "Wedding"
    },
    {
      id: 103,
      url: "https://ik.imagekit.io/7xgikoq8o/4.png",
      alt: "Family wedding portraits",
      category: "Portraits"
    },
    {
      id: 104,
      url: "https://ik.imagekit.io/7xgikoq8o/3.png",
      alt: "Candid wedding photography",
      category: "Ceremony"
    },
    {
      id: 105,
      url: "https://ik.imagekit.io/7xgikoq8o/2.png",
      alt: "Artistic wedding moments",
      category: "Pre-Wedding"
    },
    {
      id: 106,
      url: "https://ik.imagekit.io/7xgikoq8o/1.png",
      alt: "Beautiful couple portraits",
      category: "Pre-Wedding"
    }
  ]); 

  // Categories
  const categories = useMemo(() => {
    const allCategories = [...new Set(galleryImages.map(img => img.category))];
    return ["All", ...allCategories.filter(category => 
      !["Cinematic", "Family", "Details", "Candid"].includes(category)
    )];
  }, [galleryImages]);

  // Filtered and displayed images
  const { filteredImages, displayedImages, hasMoreImages } = useMemo(() => {
    const filtered = galleryState.activeCategory === "All" 
      ? galleryImages 
      : galleryImages.filter(img => img.category === galleryState.activeCategory);
    
    const displayed = filtered.slice(0, galleryState.displayedCount);
    const hasMore = galleryState.displayedCount < filtered.length;
    
    return {
      filteredImages: filtered,
      displayedImages: displayed,
      hasMoreImages: hasMore
    };
  }, [galleryImages, galleryState.activeCategory, galleryState.displayedCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 relative mb-20">
      {/* Optimized CSS */}
      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        
        .gallery-item {
          contain: layout style paint;
          content-visibility: auto;
          contain-intrinsic-size: 200px;
        }
        
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
          touch-action: none !important;
        }
        
        .lightbox-image {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        .columns-2 { column-count: 2; column-gap: 0.75rem; }
        @media (min-width: 640px) { .sm\\:columns-2 { column-count: 2; } }
        @media (min-width: 768px) { .md\\:columns-3 { column-count: 3; } }
        @media (min-width: 1024px) { .lg\\:columns-4 { column-count: 4; } }
        @media (min-width: 1280px) { .xl\\:columns-5 { column-count: 5; } }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      <AnimatedPatterns />
      
      <div className="relative z-10 pt-20 pb-15" ref={galleryRef}>
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
          <div>
            <div className="inline-block mb-2">
              <h1 className="font-dancing text-3xl sm:text-5xl lg:text-5xl leading-[1.3] pt-5 pb-8 text-transparent bg-clip-text bg-gradient-to-r from-chocolate via-primary to-chocolate-light">
                Gallery 
              </h1>
              <div className="h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-transparent via-chocolate to-transparent rounded-full"></div>
            </div>

            <p className="font-playfair text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our collection of cinematic wedding moments
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <CategoryFilter 
            categories={categories}
            activeCategory={galleryState.activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-muted-foreground font-poppins text-sm">
              Showing <span className="font-semibold text-chocolate">{displayedImages.length}</span> of <span className="font-semibold text-chocolate">{filteredImages.length}</span> moments
              {galleryState.activeCategory !== "All" && (
                <span className="text-chocolate"> in {galleryState.activeCategory}</span>
              )}
            </p>
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
            {displayedImages.map((photo, index) => (
              <div key={photo.id} data-image-id={photo.id}>
                <GalleryImage
                  photo={photo}
                  index={index}
                  onClick={handleImageClick}
                  isVisible={visibleImages.has(photo.id)}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>

          <LoadMoreButton 
            onClick={handleLoadMore}
            loading={galleryState.loading}
            hasMore={hasMoreImages}
          />
        </div>
      </div>

      {/* Enhanced Lightbox with Swipe Support */}
      {galleryState.selectedImage && (
        <div 
          ref={lightboxRef}
          className="lightbox-container bg-black/95 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 z-60 bg-black/50 px-4 py-3 flex items-center justify-between">
            <span className="text-white text-sm">
              {galleryState.selectedIndex + 1} / {displayedImages.length}
            </span>
            
            <button
              onClick={handleCloseModal}
              className="text-white/80 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation buttons - hidden on mobile for swipe */}
          <button
            onClick={handlePrevImage}
            disabled={galleryState.selectedIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 disabled:opacity-50 hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main image container */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <img
              ref={imageRef}
              src={galleryState.selectedImage}
              alt={displayedImages[galleryState.selectedIndex]?.alt}
              className="lightbox-image max-h-[85vh] max-w-[85vw] object-contain"
              style={{
                transform: `scale(${lightboxState.zoomLevel}) translate(${lightboxState.dragPosition.x / lightboxState.zoomLevel}px, ${lightboxState.dragPosition.y / lightboxState.zoomLevel}px)`,
              }}
              onDoubleClick={() => lightboxState.isZoomed ? handleZoomOut() : handleZoomIn()}
              draggable={false}
            />
            
            {/* Mobile swipe indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full sm:hidden">
              {lightboxState.isZoomed ? 'Double tap to reset zoom' : 'Swipe left/right to navigate'}
            </div>
            
            {/* Visual swipe feedback */}
            {swipeState.isSwiping && (
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 text-white/50 text-4xl transition-all duration-200 ${
                    swipeState.swipeDirection === 'right' 
                      ? 'left-8 animate-pulse' 
                      : 'right-8 animate-pulse'
                  }`}
                >
                  {swipeState.swipeDirection === 'right' ? '←' : '→'}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNextImage}
            disabled={galleryState.selectedIndex === displayedImages.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 disabled:opacity-50 hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 px-4 py-2 rounded-full">
            <button
              onClick={handleZoomOut}
              disabled={lightboxState.zoomLevel <= 1}
              className="text-white/80 hover:text-white disabled:text-white/40 p-1"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-white text-sm min-w-[50px] text-center">
              {Math.round(lightboxState.zoomLevel * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              disabled={lightboxState.zoomLevel >= 3}
              className="text-white/80 hover:text-white disabled:text-white/40 p-1"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <SocialFloatingButton />
    </div>
  );
};

export default Gallery;
