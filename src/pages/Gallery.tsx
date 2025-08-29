import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";

// Animated Background Pattern Component
const AnimatedPatterns = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Star Dots Pattern */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
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
            <svg width="8" height="8" viewBox="0 0 8 8" className="text-beige-warm/20">
              <path
                d="M4 0L4.854 2.146L7 1.292L5.708 3.292L8 4L5.708 4.708L7 6.708L4.854 5.854L4 8L3.146 5.854L1 6.708L2.292 4.708L0 4L2.292 3.292L1 1.292L3.146 2.146L4 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Reduced floating flowers */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`flower-${i}`}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-primary/10">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Gallery Filter Component
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
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
};

// Optimized Image Component with proper aspect ratio handling
const GalleryImage = ({ photo, index, onClick, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageFailed(true);
  }, []);

  return (
    <div 
      className="group cursor-pointer break-inside-avoid mb-4"
      style={{
        animationDelay: `${index * 0.02}s`,
        animationFillMode: 'both'
      }} 
      onClick={() => onClick(photo.url, index)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
        {/* Natural aspect ratio container - no forced padding */}
        <div className="relative w-full">
          {/* Placeholder that maintains natural dimensions */}
          <div 
            className={`w-full bg-gradient-to-br from-beige-warm/20 to-cream/30 ${
              !imageLoaded && isVisible ? 'h-48' : 'h-auto'
            }`}
            style={{
              backgroundColor: '#f5f5f0'
            }}
          />

          {/* Image with natural aspect ratio */}
          {isVisible && !imageFailed && (
            <img 
              src={photo.url.includes('imagekit.io') 
                ? `${photo.url}${photo.url.includes('?') ? '&' : '?'}tr=w-400,q-75,f-auto`
                : photo.url}
              alt={photo.alt}
              className={`${
                imageLoaded ? 'relative' : 'absolute inset-0'
              } w-full h-auto object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-105 transition-transform duration-500`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              decoding="async"
            />
          )}

          {/* Loading indicator */}
          {isVisible && !imageLoaded && !imageFailed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-chocolate/20 border-t-chocolate/60 rounded-full animate-spin" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/90 text-chocolate px-3 py-1 rounded-full text-xs font-medium">
              {photo.category}
            </span>
          </div>
          
          {/* Photo Title on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-medium text-sm leading-tight">
              {photo.alt}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// Load More Button Component
const LoadMoreButton = ({ onClick, loading, hasMore }) => {
  if (!hasMore) return null;
  
  return (
    <div className="text-center py-12">
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-8 py-4 bg-gradient-to-r from-chocolate to-chocolate-light text-cream rounded-full font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? 'animate-pulse' : 'hover:-translate-y-1'
        }`}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayedCount, setDisplayedCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const galleryRef = useRef(null);
  const scrollPosition = useRef(0);
  const touchStartX = useRef(null);
  
  const IMAGES_PER_LOAD = 15;

  // Fixed intersection observer - images stay visible once loaded
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleImages(prev => {
          const newVisible = new Set(prev);
          entries.forEach((entry) => {
            const imageId = Number(entry.target.getAttribute('data-image-id'));
            if (entry.isIntersecting) {
              newVisible.add(imageId); // Only add, never remove
            }
          });
          return newVisible;
        });
      },
      {
        rootMargin: '200px 0px', // Larger margin for better UX
        threshold: 0.1
      }
    );

    // Observe new images when displayedCount changes
    const images = document.querySelectorAll('[data-image-id]');
    images.forEach(img => observer.observe(img));

    return () => observer.disconnect();
  }, [displayedCount]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (selectedImage) {
        unlockScroll();
      }
    };
  }, [selectedImage]);

  // Reset displayed count when category changes
  useEffect(() => {
    setDisplayedCount(20);
  }, [activeCategory]);

  const lockScroll = useCallback(() => {
    scrollPosition.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.width = '100%';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition.current);
  }, []);

  const handleImageClick = useCallback((imageUrl, index) => {
    setSelectedImage(imageUrl);
    setSelectedIndex(index);
    lockScroll();
  }, [lockScroll]);

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => prev + IMAGES_PER_LOAD);
      setLoading(false);
    }, 300);
  }, []);

  const handlePrevImage = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedImage(displayedImages[selectedIndex - 1].url);
    }
  }, [selectedIndex]);

  const handleNextImage = useCallback(() => {
    if (selectedIndex < displayedImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedImage(displayedImages[selectedIndex + 1].url);
    }
  }, [selectedIndex]);

  // Mobile touch handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next image
        handleNextImage();
      } else {
        // Swipe right - previous image
        handlePrevImage();
      }
      touchStartX.current = null;
    }
  }, [handleNextImage, handlePrevImage]);
  // Memoized gallery images - reduced set for testing
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

  // Memoized categories
  const categories = useMemo(() => {
    const allCategories = [...new Set(galleryImages.map(img => img.category))];
    return ["All", ...allCategories.filter(category => 
      !["Cinematic", "Family", "Details", "Candid"].includes(category)
    )];
  }, [galleryImages]);

  // Memoized filtered and displayed images
  const { filteredImages, displayedImages, hasMoreImages } = useMemo(() => {
    const filtered = activeCategory === "All" 
      ? galleryImages 
      : galleryImages.filter(img => img.category === activeCategory);
    
    const displayed = filtered.slice(0, displayedCount);
    const hasMore = displayedCount < filtered.length;
    
    return {
      filteredImages: filtered,
      displayedImages: displayed,
      hasMoreImages: hasMore
    };
  }, [galleryImages, activeCategory, displayedCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 relative mb-20">
      {/* Simplified animated background */}
      <AnimatedPatterns />
      <FloatingBallBackground />
      
      <div className="relative z-10 pt-20 pb-15" ref={galleryRef}>
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div>
            <div className="inline-block mb-4">
              <h1 className="font-dancing text-3xl sm:text-5xl lg:text-5xl leading-[1.3] pt-5 pb-10 text-transparent bg-clip-text bg-gradient-to-r from-chocolate via-primary to-chocolate-light">
                Gallery 
              </h1>
              <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-chocolate to-transparent rounded-full"></div>
            </div>

            <p className="font-playfair text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our complete collection of cinematic wedding moments, 
              <span className="text-chocolate font-semibold"> captured with love and artistry</span>
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Stats */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-poppins">
              Showing <span className="font-semibold text-chocolate">{displayedImages.length}</span> of <span className="font-semibold text-chocolate">{filteredImages.length}</span> beautiful moments
              {activeCategory !== "All" && (
                <span className="text-chocolate"> in {activeCategory}</span>
              )}
            </p>
          </div>

          {/* Optimized Masonry Grid */}
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {displayedImages.map((photo, index) => (
              <div key={photo.id} data-image-id={photo.id}>
                <GalleryImage
                  photo={photo}
                  index={index}
                  onClick={handleImageClick}
                  isVisible={visibleImages.has(photo.id)}
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <LoadMoreButton 
            onClick={handleLoadMore}
            loading={loading}
            hasMore={hasMoreImages}
          />
        </div>
      </div>

      {/* Lightbox Modal with mobile swipe */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm overscroll-none touch-none" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
              unlockScroll();
            }
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleTouchStart(e);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTouchMove(e);
          }}
        >
          <div className="relative max-w-6xl max-h-full select-none">
            <img 
              src={selectedImage?.includes('imagekit.io') 
                ? `${selectedImage}${selectedImage.includes('?') ? '&' : '?'}tr=w-1200,h-1200,q-85,f-auto`
                : selectedImage} 
              alt="Gallery image" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl" 
              loading="eager"
              draggable="false"
            />

            {/* Close Button */}
            <button 
              onClick={() => {
                setSelectedImage(null);
                unlockScroll();
              }} 
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-chocolate w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg" 
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
              {selectedIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="pointer-events-auto bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              
              {selectedIndex < displayedImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="pointer-events-auto bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <SocialFloatingButton />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(5deg); }
            66% { transform: translateY(5px) rotate(-3deg); }
          }
          
          .animate-twinkle { animation: twinkle linear infinite; }
          .animate-float { animation: float ease-in-out infinite; }

          /* Pinterest-style columns layout */
          .columns-2 { column-count: 2; column-gap: 1rem; }
          
          @media (min-width: 640px) {
            .sm\\:columns-2 { column-count: 2; }
          }
          
          @media (min-width: 768px) {
            .md\\:columns-3 { column-count: 3; }
          }
          
          @media (min-width: 1024px) {
            .lg\\:columns-4 { column-count: 4; }
          }
          
          @media (min-width: 1280px) {
            .xl\\:columns-5 { column-count: 5; }
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;