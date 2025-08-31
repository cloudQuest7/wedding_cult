import React from "react";
import { useOffers } from "../hooks/useOffers";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity";

const builder = imageUrlBuilder(client);

export default function Offers() {
  const { offers, loading } = useOffers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-chocolate font-semibold">Discovering amazing offers...</p>
        </div>
      </div>
    );
  }

  // Hide the entire component when there are no offers
  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-cream/50 via-background to-beige-warm/30 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <div className="w-3 h-3 bg-chocolate rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 py-2">
            <h1 className="font-amsterdam text-3xl py-4 pb-4 sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-chocolate via-chocolate-light to-chocolate leading-normal pb-2 inline-block">
              Exclusive Offers
            </h1>
            <div className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-chocolate to-transparent rounded-full"></div>
          </div>
          <p className="font-playfair text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our <span className="text-chocolate font-semibold">handpicked deals</span> crafted especially for you
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <article
              key={offer._id}
              className="group cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="bg-gradient-to-br from-white/95 to-cream/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-chocolate/10">
                {/* Image Container */}
                {offer.image && (
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={builder.image(offer.image).width(500).height(300).url()}
                      alt={offer.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-chocolate/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                      Special Offer
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-amsterdam text-2xl text-chocolate mb-3 leading-tight group-hover:text-chocolate-light transition-colors duration-300">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                      {offer.description}
                    </p>
                  </div>

                  {/* Price and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-chocolate/10">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-green-600">
                        ₹{offer.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{Math.floor(offer.price * 1.3).toLocaleString()}
                      </span>
                    </div>
                    <time
                      dateTime={new Date(offer.date).toISOString()}
                      className="text-sm text-muted-foreground bg-beige-warm/50 px-3 py-1 rounded-full"
                    >
                      {new Date(offer.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-chocolate to-chocolate-light text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:from-chocolate-light group-hover:to-chocolate">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
