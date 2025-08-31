import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { Offer } from "../types/offer";

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      const data = await client.fetch<Offer[]>(`*[_type == "offer"]{
        _id,
        title,
        description,
        price,
        date,
        image
      }`);
      setOffers(data);
      setLoading(false);
    };

    fetchOffers();
  }, []);

  return { offers, loading };
};
