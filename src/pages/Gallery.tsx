// Gallery.tsx
import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Share2, Heart, Eye } from "lucide-react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";
import { useGallery } from "../hooks/useGallery";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity";

// Initialize Sanity image builder
const builder = imageUrlBuilder(client);

// Type definitions
interface PhotoItem {
  id: string | number;
  url: string;
  alt: string;
  category: string;
}

interface GalleryState {
  selectedImage: string | null;
  selectedIndex: number;
  activeCategory: string;
  displayedCount: number;
  loading: boolean;
}

interface LightboxState {
  isZoomed: boolean;
  zoomLevel: number;
  dragPosition: { x: number; y: number };
  isDragging: boolean;
  dragStart: { x: number; y: number };
  showImageInfo: boolean;
}

interface SwipeState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
  isSwiping: boolean;
  swipeDirection: string | null;
}

// Component Props Types
interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface GalleryImageProps {
  photo: PhotoItem;
  index: number;
  onClick: (url: string, index: number) => void;
  favorites: (string | number)[];
  toggleFavorite: (imageId: string | number) => void;
}

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
}

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

AnimatedPatterns.displayName = 'AnimatedPatterns';

// Memoized Category Filter
const CategoryFilter = memo<CategoryFilterProps>(({ categories, activeCategory, onCategoryChange }) => {
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

CategoryFilter.displayName = 'CategoryFilter';

// FIXED: Optimized Image Component - removed isVisible dependency
const GalleryImage = memo<GalleryImageProps>(({ photo, index, onClick, favorites, toggleFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(index < 12); // Show first 12 images immediately
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageFailed(true);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClick(photo.url, index);
  }, [photo.url, index, onClick]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(photo.id);
  }, [photo.id, toggleFavorite]);

  // FIXED: Lazy loading with intersection observer for images beyond initial batch
  useEffect(() => {
    if (index < 12 || isInView) return; // Skip observer for initially visible images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [index, isInView]);

  return (
    <div 
      ref={imageRef}
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
          {isInView ? (
            !imageFailed ? (
              <img 
                src={photo.url}
                alt={photo.alt}
                className={`w-full h-auto object-cover transition-opacity duration-200 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={index < 6 ? "eager" : "lazy"} // Load first 6 eagerly
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
            )
          ) : (
            // Placeholder for lazy-loaded images
            <div 
              className="w-full bg-gradient-to-br from-beige-warm/10 to-cream/20"
              style={{ height: '200px' }}
            />
          )}

          {isInView && !imageLoaded && !imageFailed && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-beige-warm/20 to-cream/30">
              <div className="w-4 h-4 border-2 border-chocolate/20 border-t-chocolate/60 rounded-full animate-spin" />
            </div>
          )}

          {isInView && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';

const LoadMoreButton = memo<LoadMoreButtonProps>(({ onClick, loading, hasMore }) => {
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

LoadMoreButton.displayName = 'LoadMoreButton';

const Gallery: React.FC = () => {
  // Add CMS data fetching
  const { gallery: cmsGallery, loading: cmsLoading, error: cmsError } = useGallery();

  // State management
  const [galleryState, setGalleryState] = useState<GalleryState>({
    selectedImage: null,
    selectedIndex: -1,
    activeCategory: "All",
    displayedCount: 12,
    loading: false
  });

  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isZoomed: false,
    zoomLevel: 1,
    dragPosition: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    showImageInfo: false
  });

  // FIXED: Removed visibleImages state - not needed anymore
  const [favorites, setFavorites] = useState<(string | number)[]>([]);
  
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0,
    isSwiping: false,
    swipeDirection: null
  });
  
  // Refs
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  const IMAGES_PER_LOAD = 8;
  const SWIPE_THRESHOLD = 50;
  const SWIPE_VELOCITY_THRESHOLD = 0.3;

  // Transform CMS data to match your existing structure
  const galleryImages = useMemo<PhotoItem[]>(() => {
    if (!cmsGallery || cmsGallery.length === 0) return [];
    
    console.log('CMS Gallery data:', cmsGallery);
    
    return cmsGallery.map((item, index) => {
      const imageUrl = item.image ? builder.image(item.image).width(800).quality(80).url() : '';
      console.log(`Item ${index}:`, { id: item._id, imageUrl, title: item.title });
      
      return {
        id: item._id || (index + 1).toString(),
        url: imageUrl,
        alt: item.title || item.description || `Gallery image ${index + 1}`,
        category: item.category || "Wedding"
      };
    });
  }, [cmsGallery]);

  // Categories
  const categories = useMemo<string[]>(() => {
    if (galleryImages.length === 0) return ["All"];
    
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

  // ALL YOUR EXISTING HANDLERS (unchanged)
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
  }, [galleryState.selectedIndex, displayedImages]);

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
  }, [galleryState.selectedIndex, displayedImages]);

  const handleImageClick = useCallback((url: string, index: number) => {
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

  const handleCategoryChange = useCallback((category: string) => {
    setGalleryState(prev => ({
      ...prev,
      activeCategory: category,
      displayedCount: 12
    }));
  }, []);

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

  const toggleFavorite = useCallback((imageId: string | number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId];
      return newFavorites;
    });
  }, []);

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
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

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (lightboxState.isZoomed) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    if (absDeltaX > 10 && absDeltaX > absDeltaY * 1.5) {
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

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (lightboxState.isZoomed || !swipeState.isSwiping) {
      setSwipeState(prev => ({ ...prev, isSwiping: false }));
      return;
    }
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaTime = Date.now() - swipeState.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;
    
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(touch.clientY - swipeState.startY);
    
    const isValidSwipe = (
      absDeltaX > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD
    ) && absDeltaX > absDeltaY;
    
    if (isValidSwipe) {
      if (deltaX > 0 && galleryState.selectedIndex > 0) {
        handlePrevImage();
      } else if (deltaX < 0 && galleryState.selectedIndex < displayedImages.length - 1) {
        handleNextImage();
      }
    }
    
    setSwipeState(prev => ({ ...prev, isSwiping: false }));
  }, [
    lightboxState.isZoomed, 
    swipeState.isSwiping, 
    swipeState.startX, 
    swipeState.startTime, 
    galleryState.selectedIndex,
    displayedImages.length,
    handlePrevImage,
    handleNextImage
  ]);

  // FIXED: Removed intersection observer useEffect - handled per image now

  // Keyboard navigation
  useEffect(() => {
    if (!galleryState.selectedImage) return;

    let keyTimeout: NodeJS.Timeout;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (keyTimeout) return;
      
      keyTimeout = setTimeout(() => {
        clearTimeout(keyTimeout);
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

  // Loading and error states for CMS
  if (cmsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-chocolate font-semibold">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (cmsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-chocolate font-semibold">Error loading gallery</p>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-chocolate font-semibold">No gallery images found</p>
          <p className="text-muted-foreground">Please add some images to your CMS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 relative mb-20">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <CategoryFilter 
            categories={categories}
            activeCategory={galleryState.activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

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
              <div key={photo.id}>
                <GalleryImage
                  photo={photo}
                  index={index}
                  onClick={handleImageClick}
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

      {galleryState.selectedImage && (
        <div 
          ref={lightboxRef}
          className="lightbox-container bg-black/95 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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

          <button
            onClick={handlePrevImage}
            disabled={galleryState.selectedIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 disabled:opacity-50 hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

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
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full sm:hidden">
              {lightboxState.isZoomed ? 'Double tap to reset zoom' : 'Swipe'}
            </div>
            
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
