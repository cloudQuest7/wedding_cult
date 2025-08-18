


import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  date: string;
  imageUrl: string;
}

export default function OffersSection() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/offers?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.data.map((offer: any) => ({
          id: offer.id,
          title: offer.Title,
          description: offer.Description?.[0]?.children?.[0]?.text ?? "",
          price: offer.Price,
          date: offer.Date,
          imageUrl:
            import.meta.env.VITE_API_URL +
            (offer.Image?.[0]?.formats?.small?.url ||
              offer.Image?.[0]?.url ||
              ""),
        }));
        setOffers(formatted);
      })
      .catch((err) => console.error("Error fetching offers:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading our packages...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6 tracking-wide leading-loose">
            Wedding Packages
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-rose-300 to-amber-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Capturing your most precious moments with timeless elegance
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="group relative"
            >
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  {offer.imageUrl && (
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                 
                  {/* Price Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
                      <span className="text-sm font-light">₹</span>
                      <span className="text-lg font-bold">{offer.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Package Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-2 tracking-wide">
                      {offer.title}
                    </h3>
                    <div className="text-sm font-medium text-amber-600 tracking-wider uppercase">
                      Package
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-8 line-clamp-4">
                    {offer.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Available from {new Date(offer.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                   
                    {/* CTA Button */}
                    <button className="group/btn bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-200">
                      <span className="flex items-center gap-2">
                        Inquire Now
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-rose-200 to-transparent rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-tl from-amber-200 to-transparent rounded-full opacity-60"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {offers.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-gray-600 mb-3">No packages available</h3>
            <p className="text-gray-500">Check back soon for our latest wedding photography packages.</p>
          </div>
        )}
      </div>

      {/* Background Decorations */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-200/20 to-transparent rounded-full blur-xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-amber-200/20 to-transparent rounded-full blur-xl pointer-events-none"></div>
    </section>
  );
}
