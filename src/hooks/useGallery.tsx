// hooks/useGallery.ts
import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

// Type definitions
interface GalleryImage {
  _id: string;
  title?: string;
  description?: string;
  category: string;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  tags?: string[];
  featured?: boolean;
  date: string;
}

interface UseGalleryReturn {
  gallery: GalleryImage[];
  loading: boolean;
  error: Error | null;
}

export const useGallery = (): UseGalleryReturn => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGallery = async (): Promise<void> => {
      try {
        // Only fetch published gallery items (exclude drafts)
        const query = `*[_type == "gallery" && !(_id in path("drafts.**"))]{
          _id,
          title,
          description,
          category,
          image,
          tags,
          featured,
          date
        } | order(date desc)`;
        
        const data: GalleryImage[] = await client.fetch(query);
        console.log('Fetched gallery:', data); // Debug log
        setGallery(data || []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError(err as Error);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { gallery, loading, error };
};
