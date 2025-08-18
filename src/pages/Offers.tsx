import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  date: string;
  imageUrl: string;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);

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
      .catch((err) => console.error("Error fetching offers:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Latest Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            {offer.imageUrl && (
              <img
                src={offer.imageUrl}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
              <p className="mt-2 font-bold text-green-600">
                ₹ {offer.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Release Date: {new Date(offer.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
