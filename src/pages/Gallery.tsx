import { useState, useRef } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";

// Animated Background Pattern Component
const AnimatedPatterns = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Star Dots Pattern */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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
            <svg width="8" height="8" viewBox="0 0 8 8" className="text-beige-warm/30">
              <path
                d="M4 0L4.854 2.146L7 1.292L5.708 3.292L8 4L5.708 4.708L7 6.708L4.854 5.854L4 8L3.146 5.854L1 6.708L2.292 4.708L0 4L2.292 3.292L1 1.292L3.146 2.146L4 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Flowers */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`flower-${i}`}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-primary/20">
              <path
                d="M12 3.5c2.5 0 4.5 2 4.5 4.5 0-2.5 2-4.5 4.5-4.5-2.5 0-4.5-2-4.5-4.5 0 2.5-2 4.5-4.5 4.5zm0 17c-2.5 0-4.5-2-4.5-4.5 0 2.5-2 4.5-4.5 4.5 2.5 0 4.5 2 4.5 4.5 0-2.5 2-4.5 4.5-4.5z"
                fill="currentColor"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="text-chocolate">
          <defs>
            <pattern id="geometric" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.3" />
              <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.2" />
              <circle cx="100" cy="20" r="1" fill="currentColor" opacity="0.2" />
              <circle cx="20" cy="100" r="1" fill="currentColor" opacity="0.2" />
              <circle cx="100" cy="100" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
      </div>
    </div>
  );
};

// Enhanced Gallery Filter Component - EXCLUDES "Cinematic", "Family", "Details"
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-poppins font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
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

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const handleImageClick = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setSelectedIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedImage(filteredImages[selectedIndex - 1].url);
    }
  };

  const handleNextImage = () => {
    if (selectedIndex < filteredImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedImage(filteredImages[selectedIndex + 1].url);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left
        handleNextImage();
      } else {
        // Swipe right
        handlePrevImage();
      }
      touchStartX.current = null;
    }
  };

  const touchStartX = useRef<number | null>(null);

  // Complete Gallery Images - ALL IMAGES INCLUDED
  const galleryImages = [
    // Homepage PhotoGallery images
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
    {
      id: 8,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-sampark-films-samparkfilms-com-1300296201-32081698.jpg?updatedAt=1752122335732",
      alt: "Wedding celebration",
      category: "Portraits"
    },
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
      category: "Wedding" //
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
      category: "Portraits" //
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
      category: "Pre-Wedding" //
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
    {
      id: 28,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ajay-donga-1113836-2235390.jpg?updatedAt=1752218480207",
      alt: "Traditional Indian wedding",
      category: "Pre-Wedding"
    },
    {
      id: 29,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ajay-donga-1113836-2221392.jpg?updatedAt=1752218479074",
      alt: "Wedding rituals captured",
      category: "Pre-Wedding"
    },
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
    {
      id: 37,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theshortguyfilms-29187294.jpg?updatedAt=1752218462738",
      alt: "Cinematic wedding capture",
      category: "Pre-Wedding"
    },
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
      category: "Ceremony"//
    },
    {
      id: 54,
      url: "https://ik.imagekit.io/7xgikoq8o/DSC01828.jpg?updatedAt=1752469017255",
      alt: "Little Moments",
      category: "Ceremony"//
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
  ];

  // UPDATED: Extract unique categories BUT exclude "Cinematic", "Family", "Details"
  const allCategories = [...new Set(galleryImages.map(img => img.category))];
  const categories = ["All", ...allCategories.filter(category => 
    !["Cinematic", "Family", "Details","Candid"].includes(category)
  )];

  // Filter images based on active category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 relative mb-20">
      {/* Animated Background Patterns */}
      <AnimatedPatterns />
      <FloatingBallBackground />
      
      <div className="relative z-10 pt-20 pb-15">
        {/* Enhanced Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block mb-4 overflow-visible">
              <h1 className="font-dancing text-3xl sm:text-5xl lg:text-5xl leading-[1.3] pt-5 pb-10 text-transparent bg-clip-text bg-gradient-to-r from-chocolate via-primary to-chocolate-light drop-shadow-sm">
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

        {/* Category Filter - WITH Cinematic, Family, Details REMOVED */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Enhanced Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Stats */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-poppins">
              Showing <span className="font-semibold text-chocolate">{filteredImages.length}</span> beautiful moments
              {activeCategory !== "All" && (
                <span className="text-chocolate"> in {activeCategory}</span>
              )}
            </p>
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="md:hidden mb-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-chocolate/70 animate-bounce-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
              <span className="text-chocolate/70 text-sm">Slide to explore</span>
              <svg className="w-5 h-5 text-chocolate/70 animate-bounce-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </div>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-max overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {filteredImages.map((photo, index) => {
              // Random height classes for masonry effect
              const heightClasses = [
                "row-span-1", "row-span-2", "row-span-1", "row-span-3", "row-span-1"
              ];
              const randomHeight = heightClasses[index % heightClasses.length];
              
              return (
                <div 
                  key={photo.id} 
                  className={`group cursor-pointer animate-fade-in hover-scale snap-center ${randomHeight}`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'both'
                  }} 
                  onClick={() => handleImageClick(photo.url, index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-700 hover:-translate-y-2 h-full">
                    {/* Image */}
                    <img 
                      src={photo.url} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 filter group-hover:brightness-110 group-hover:contrast-105" 
                      loading="lazy" 
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 opacity-0 group-hover:opacity-40 transition-all duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 transform -translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <span className="bg-gradient-to-r from-cream/95 to-beige-light/95 backdrop-blur-sm text-chocolate px-4 py-2 rounded-full text-xs font-poppins font-semibold shadow-xl border border-white/20">
                        {photo.category}
                      </span>
                    </div>
                    
                    {/* Photo Title on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-200">
                      <h3 className="text-white font-playfair font-semibold text-lg mb-2 leading-tight">
                        {photo.alt}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.5s' }} />
                          <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
                        </div>
                        <span className="text-white/80 text-xs font-poppins">Click to view</span>
                      </div>
                    </div>
                    
                    {/* Hover Border Glow */}
                    <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 group-hover:ring-primary/20 transition-all duration-500" />
                    
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="relative max-w-6xl max-h-full animate-fade-in">
            <img 
              src={selectedImage} 
              alt="Gallery image" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl" 
            />

            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-chocolate w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm" 
              aria-label="Close lightbox"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                   className="pointer-events-auto bg-white/70 hover:bg-white/90 text-chocolate w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
                    aria-label="previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              
              {selectedIndex < filteredImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                    }}
                    className="pointer-events-auto bg-white/70 hover:bg-white/90 text-chocolate w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
                    aria-label="Next image"
                  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>
            
            
          </div>
        </div>
      )}
      
      {/* Floating Social Media Button */}
      <SocialFloatingButton />
      
      {/* Custom CSS for animations */}
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
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes bounce-x {
            0%, 100% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
          }
          
          .animate-twinkle { animation: twinkle linear infinite; }
          .animate-float { animation: float ease-in-out infinite; }
          .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
          .animate-bounce-x { animation: bounce-x 1.5s ease-in-out infinite; }
          .hover-scale { transition: transform 0.3s ease; }
          .hover-scale:hover { transform: scale(1.02); }
          
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .snap-x {
            scroll-snap-type: x mandatory;
          }
          
          .snap-center {
            scroll-snap-align: center;
          }
          
          .grid {
            grid-auto-rows: 200px;
          }
          
          @media (min-width: 768px) {
            .grid {
              grid-auto-rows: 250px;
            }
          }
          
          @media (min-width: 1024px) {
            .grid {
              grid-auto-rows: 220px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;
