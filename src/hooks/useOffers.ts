// hooks/useOffers.js
import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export const useOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Only fetch published offers (exclude drafts)
        const query = `*[_type == "offer" && !(_id in path("drafts.**"))]{
          _id,
          title,
          description,
          price,
          date,
          image
        } | order(date desc)`;
        
        const data = await client.fetch(query);
        console.log('Fetched offers:', data); // Debug log
        setOffers(data || []);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
};
