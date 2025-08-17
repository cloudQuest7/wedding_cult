import { useEffect, useState } from "react";

type Offer = {
  id: number;
  title: string;
  description: string;
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API call
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        // map API data to your Offer type
        const formatted = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.body,
        }));
        setOffers(formatted);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-10">Loading offers...</p>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">🎉 Special Offers</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-600">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
