import { useEffect, useState } from "react";

export interface Offer {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
  };
  validUntil: string;
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/offers?populate=*`);
        const data = await res.json();
        setOffers(data.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.title,
          description: item.attributes.description,
          image: item.attributes.image?.data?.attributes?.url,
          validUntil: item.attributes.validUntil,
        })));
      } catch (err) {
        console.error("Error fetching offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading };
};
