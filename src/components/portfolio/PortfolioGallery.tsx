import { useState } from "react";

const PortfolioGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  // Portfolio photos - curated selection (initial display)
  const portfolioPhotos = [{
    id: 1,
    url: "https://ik.imagekit.io/7xgikoq8o/17.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }, {
    id: 2,
    url: "https://ik.imagekit.io/7xgikoq8o/16.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }, {
    id: 3,
    url: "https://ik.imagekit.io/7xgikoq8o/15.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }, {
    id: 4,
    url: "https://ik.imagekit.io/7xgikoq8o/8.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }, {
    id: 5,
    url: "https://ik.imagekit.io/7xgikoq8o/6.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }, {
    id: 6,
    url: "https://ik.imagekit.io/7xgikoq8o/4.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }, {
    id: 7,
    url: "https://ik.imagekit.io/7xgikoq8o/2.png",
    alt: "Wedding portfolio image",
    category: "Portfolio"
  }];

  // Additional gallery images for "Show More" - All remaining original + new photos
  const allGalleryImages = [
    // Remaining original portfolio images (completing the series)
    {
      id: 8,
      url: "https://ik.imagekit.io/7xgikoq8o/1.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 9,
      url: "https://ik.imagekit.io/7xgikoq8o/3.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 10,
      url: "https://ik.imagekit.io/7xgikoq8o/5.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 11,
      url: "https://ik.imagekit.io/7xgikoq8o/7.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 12,
      url: "https://ik.imagekit.io/7xgikoq8o/9.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 13,
      url: "https://ik.imagekit.io/7xgikoq8o/10.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 14,
      url: "https://ik.imagekit.io/7xgikoq8o/11.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 15,
      url: "https://ik.imagekit.io/7xgikoq8o/12.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 16,
      url: "https://ik.imagekit.io/7xgikoq8o/13.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    {
      id: 17,
      url: "https://ik.imagekit.io/7xgikoq8o/14.png",
      alt: "Wedding portfolio image",
      category: "Portfolio"
    },
    // New gallery images from your request (39 images)
    {
      id: 101,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000495.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 102,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17095927.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 103,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17095931.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 104,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17095947.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 105,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17133420.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 106,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17133423.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 107,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-piyush-saroj-706149430-30915944.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 108,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32862200.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 109,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32862216.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 110,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32927613.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 111,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32927617.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 112,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-thevisionaryvows-32927615.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 113,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32495350.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 114,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32495403.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 115,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32495434.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 116,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32501788.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 117,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32495368.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 118,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32501689.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 119,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hasmukh-abchung-413074376-32495602.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 120,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ankur-kumar-2067233-3872603.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 121,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-royaljatin-27516989.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 122,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-royaljatin-11171098.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 123,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-royaljatin-27516987.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 124,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-royaljatin-11171095.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 125,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-royaljatin-27516991.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 126,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-17284333.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 127,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-camera-treasure-928922-17261993.jpg",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 128,
      url: "https://ik.imagekit.io/7xgikoq8o/2(1).png",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 129,
      url: "https://ik.imagekit.io/7xgikoq8o/3(1).png",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 130,
      url: "https://ik.imagekit.io/7xgikoq8o/4(1).png",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 131,
      url: "https://ik.imagekit.io/7xgikoq8o/5(1).png",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 132,
      url: "https://ik.imagekit.io/7xgikoq8o/6(1).png",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 133,
      url: "https://ik.imagekit.io/7xgikoq8o/1(1).png",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    // New images from user's request
    {
      id: 134,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theshortguyfilms-29187422.jpg?updatedAt=1752122328713",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 135,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theshortguyfilms-29187414.jpg?updatedAt=1752218469371",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 136,
      url: "https://ik.imagekit.io/7xgikoq8o/39.png?updatedAt=1752477062526",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 137,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ajay-donga-1113836-2250589.jpg?updatedAt=1752917491508",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 138,
      url: "https://ik.imagekit.io/7xgikoq8o/36.png?updatedAt=1752477059597",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 139,
      url: "https://ik.imagekit.io/7xgikoq8o/32.png?updatedAt=1752477058456",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 140,
      url: "https://ik.imagekit.io/7xgikoq8o/25.png?updatedAt=1752916498862",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 141,
      url: "https://ik.imagekit.io/7xgikoq8o/24.png?updatedAt=1752477050272",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 142,
      url: "https://ik.imagekit.io/7xgikoq8o/26.png?updatedAt=1752477052309",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 143,
      url: "https://ik.imagekit.io/7xgikoq8o/23.png?updatedAt=1752477047636",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 144,
      url: "https://ik.imagekit.io/7xgikoq8o/22.png?updatedAt=1752477047079",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 145,
      url: "https://ik.imagekit.io/7xgikoq8o/19.png?updatedAt=1752477046708",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 146,
      url: "https://ik.imagekit.io/7xgikoq8o/20.png?updatedAt=1752477046923",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 147,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-17284578.jpg?updatedAt=1752916088458",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 148,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-17901803.jpg?updatedAt=1752916088515",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 149,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144257.jpg?updatedAt=1752916088999",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 150,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-aadil-1934780.jpg?updatedAt=1752916088633",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 151,
      url: "https://ik.imagekit.io/7xgikoq8o/30.png?updatedAt=1752477058298",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 155,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-gursher-gill-63702010-18633036.jpg?updatedAt=1752218493332",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 156,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-gursher-gill-63702010-18633036.jpg?updatedAt=1752218493332",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 157,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-amit-chowdhury-2402860-18077025.jpg?updatedAt=1752218490697",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 158,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-909646465-31600968.jpg?updatedAt=1752218490957",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 159,
      url: "https://ik.imagekit.io/7xgikoq8o/Nilkeshi%20+%20Saevesh%20Cinematic.00_03_32_15.Still007.png?updatedAt=1752122785655",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 160,
      url: "https://ik.imagekit.io/7xgikoq8o/Nilkeshi%20+%20Saevesh%20Cinematic.00_06_24_13.Still024.png?updatedAt=1752122785580",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 161,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144255.jpg?updatedAt=1752122336598",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 162,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-theindiaweddings-28144266.jpg?updatedAt=1752122336295",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 163,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-suraj-galgale-1822752-16196490.jpg?updatedAt=1752122329114",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 164,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-fotographiya-wedding-photography-823737813-29492597.jpg?updatedAt=1752122327991",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 165,
      url: "https://ik.imagekit.io/7xgikoq8o/Ruturaj%20&%20Krutika%20Wedding%20Cinematic.00_05_19_18.Still001.jpg?updatedAt=1752122993055",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 166,
      url: "https://ik.imagekit.io/7xgikoq8o/Ruturaj%20&%20Krutika%20Wedding%20Cinematic.00_05_23_10.Still007_PhotoGrid(1)(1).jpg?updatedAt=1752122992588",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 167,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000480.jpg?updatedAt=1752122335536",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 168,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000471.jpg?updatedAt=1752122333713",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 169,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000478.jpg?updatedAt=1752122333445",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 170,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000488%20(1).jpg?updatedAt=1752122331255",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 171,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-hassanshoots1-27107899.jpg?updatedAt=1752122331181",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 172,
      url: "https://ik.imagekit.io/7xgikoq8o/wedding-photography-8443234.jpg?updatedAt=1752218451592",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 173,
      url: "https://ik.imagekit.io/7xgikoq8o/couple-9210801.jpg?updatedAt=1752218451384",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 174,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000484.jpg?updatedAt=1752218488535",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 175,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000464.jpg?updatedAt=1752218486011",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 176,
      url: "https://ik.imagekit.io/7xgikoq8o/pexels-ids-fotowale-1416063-17000479.jpg?updatedAt=1752218483021",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 177,
      url: "https://ik.imagekit.io/7xgikoq8o/Ruturaj%20&%20Krutika%20Wedding%20Cinematic.00_06_07_20.Still024_PhotoGrid.png?updatedAt=1752122993106",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 178,
      url: "https://ik.imagekit.io/7xgikoq8o/Ruturaj%20&%20Krutika%20Wedding%20Cinematic.00_07_01_07.Still013.jpg?updatedAt=1752122993088",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 179,
      url: "https://ik.imagekit.io/7xgikoq8o/Ruturaj%20&%20Krutika%20Wedding%20Cinematic.00_07_34_06.Still017.jpg?updatedAt=1752122993128",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 180,
      url: "https://ik.imagekit.io/7xgikoq8o/indian-wedding-8471667.jpg?updatedAt=1752218452169",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 181,
      url: "https://ik.imagekit.io/7xgikoq8o/haldi-8457512.jpg?updatedAt=1752218452812",
      alt: "Wedding portfolio",
      category: "Portfolio"
    },
    {
      id: 182,
      url: "https://ik.imagekit.io/7xgikoq8o/happy-couple-8457514.jpg?updatedAt=1752218453664",
      alt: "Wedding portfolio",
      category: "Portfolio"
    }
  ];

  // Get images to display based on state
  const imagesToDisplay = showAllImages 
    ? [...portfolioPhotos, ...allGalleryImages] 
    : portfolioPhotos;

  return (
    <>
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-amsterdam text-4xl text-chocolate mb-4 animate-fade-in-up mx-0 my-[19px] px-0 py-0">
              Photo Gallery
            </h2>
            <p className="font-playfair text-lg text-muted-foreground animate-fade-in-up" style={{
              animationDelay: "0.2s"
            }}>
              Cinematic moments captured with luxury and elegance
            </p>
          </div>

          {/* Responsive Photo Grid - 3 columns desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
            {imagesToDisplay.map((photo, index) => (
              <div
                key={photo.id}
                className="group cursor-pointer animate-fade-in-up hover:scale-105 transition-smooth"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => setSelectedImage(photo.url)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-romantic">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-smooth"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/20 transition-smooth" />
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-smooth">
                    <span className="bg-cream text-chocolate px-2 py-1 rounded text-xs font-poppins">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="inline-block bg-chocolate text-cream px-8 py-3 rounded-lg font-poppins font-medium hover:bg-chocolate-light transition-smooth shadow-soft hover:shadow-glow"
            >
              {showAllImages ? 'Show Less Gallery' : 'Show More Gallery'}
            </button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedImage}
              alt="Portfolio image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-romantic"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-chocolate text-cream p-2 rounded-full hover:bg-chocolate-light transition-smooth"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioGallery;