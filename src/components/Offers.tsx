import { useEffect, useState } from "react";
import { fetchOffers } from "../lib/api";

interface Offer {
  id: number;
  attributes: {
    title: string;
    description: string;
    discount?: number;
    image?: { data: { attributes: { url: string } } };
  };
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetchOffers().then(setOffers).catch(console.error);
  }, []);

  return (
    <section className="p-8 bg-gray-100 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔥 Latest Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white p-4 rounded-xl shadow">
            {offer.attributes.image?.data && (
              <img
                src={`http://localhost:1337${offer.attributes.image.data.attributes.url}`}
                alt={offer.attributes.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            )}
            <h3 className="text-lg font-semibold">{offer.attributes.title}</h3>
            <p className="text-gray-600">{offer.attributes.description}</p>
            {offer.attributes.discount && (
              <span className="text-red-500 font-bold">
                {offer.attributes.discount}% OFF
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
