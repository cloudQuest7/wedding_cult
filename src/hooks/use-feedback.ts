import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export interface Feedback {
  _id: string;
  name: string;
  message: string;
  rating: number;
  dateSubmitted: string;
}

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const query = `*[_type == "feedback" && status == "approved"] | order(dateSubmitted desc) {
          _id,
          name,
          message,
          rating,
          dateSubmitted
        }`;
        const result = await client.fetch(query);
        setFeedbacks(result);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Could not load feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const submitFeedback = async (feedback: {
    name: string;
    message: string;
    rating: number;
  }) => {
    try {
      await client.create({
        _type: 'feedback',
        ...feedback,
        dateSubmitted: new Date().toISOString(),
        status: 'pending'
      });
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  return {
    feedbacks,
    loading,
    error,
    submitFeedback,
    stats: {
      total: feedbacks.length,
      averageRating: feedbacks.length > 0 
        ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
        : "0"
    }
  };
};
