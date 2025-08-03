import { useState } from "react";
import FloatingBallBackground from "@/components/common/FloatingBallBackground";
import SocialFloatingButton from "@/components/common/SocialFloatingButton";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

const Portfolio = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const portfolioItems = [{
    id: 1,
    couple: "Yash & Kejal",
    location: "Jaipur",
    type: "Pre-Wedding",
    embedId: "ly9ejEF1DqU",
    description: "Pre-wedding in Jaipur"
  }, {
    id: 2,
    couple: "Jobin & Jesline",
    location: "Kerala",
    type: "Wedding Film",
    embedId: "VWkzOkb21UA",
    description: "Malayali wedding with grace and joy"
  }, {
    id: 3,
    couple: "Pranay & Aishwarya",
    location: "Mumbai",
    type: "Pre-Wedding",
    embedId: "II_KVGp3WKM",
    description: "Romantic cinematic pre-wedding"
  }, {
    id: 4,
    couple: "Gaurav & Shikhanshi",
    location: "Himachal",
    type: "Pre-Wedding",
    embedId: "4s3wKpLEZ5w",
    description: "Mountain-side pre-wedding story"
  }, {
    id: 5,
    couple: "Rajvi & Tejas",
    location: "Gujarat",
    type: "Wedding Teaser",
    embedId: "K8LlckrZJxw",
    description: "Gujarati wedding teaser full of tradition"
  }, {
    id: 6,
    couple: "Yash & Kejal",
    location: "Rajasthan",
    type: "Wedding Film",
    embedId: "Mb3u8RnwU6k",
    description: "Royal Rajasthani wedding moments"
  }];

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingBallBackground />
      
      <div className="pt-20 pb-16">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center animate-fade-in-up">
            <h1 className="font-amsterdam text-6xl sm:text-7xl text-chocolate mb-6 lg:text-4xl my-[73px]">
              Our Cinematic Stories
            </h1>
            <p className="font-playfair text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Every love story is different — so is our lens.
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {portfolioItems.map((item, index) => <div key={item.id} className={`group animate-fade-in-up`} style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-romantic transition-smooth">
                  {/* Video Embed with Thumbnail */}
                  <div className="relative w-full h-64 sm:h-80 lg:h-96">
                    {activeVideo === `video-${item.id}` ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${item.embedId}?autoplay=1&rel=0&modestbranding=1`}
                        title={`${item.couple} - ${item.type}`} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                        key={`video-${item.id}-playing`}
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center"
                        style={{
                          backgroundImage: `url(https://img.youtube.com/vi/${item.embedId}/maxresdefault.jpg)`
                        }}
                        onClick={() => handleVideoPlay(`video-${item.id}`)}
                      >
                        <div className="bg-chocolate/80 text-cream p-4 rounded-full hover:bg-chocolate transition-smooth">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-amsterdam text-chocolate mb-2 text-xl py-[18px]">
                          {item.couple}
                        </h3>
                        <p className="font-poppins text-sm text-muted-foreground">
                          {item.location} • {item.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Portfolio Photo Gallery */}
        <PortfolioGallery />

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center animate-fade-in-up">
          <div className="bg-gradient-to-r from-beige-warm to-cream rounded-lg p-8 shadow-soft">
            <h2 className="font-amsterdam text-4xl text-chocolate mb-4 sm:text-2xl">
              Ready to Create Your Story?
            </h2>
            <p className="font-playfair text-lg text-muted-foreground mb-6">
              Let's discuss how we can capture your special moments with the same cinematic beauty.
            </p>
            <a href="/contact" className="inline-block bg-chocolate text-cream px-8 py-3 rounded-lg font-poppins font-medium hover:bg-chocolate-light transition-smooth shadow-soft hover:shadow-glow">
              Let's Begin Your Story
            </a>
          </div>
        </div>
      </div>
      
      {/* Floating Social Media Button - visible on all pages */}
      <SocialFloatingButton />
    </div>
  );
};
export default Portfolio;