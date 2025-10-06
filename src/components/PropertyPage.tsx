import React, { useEffect, useState } from 'react';
import type { Review } from '../types';
import { fetchReviews, updateReview } from '../services/api';
import ReviewCard from './ReviewCard';

interface PropertyPageProps {
  propertyId: string;
}

const PropertyPage: React.FC<PropertyPageProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(
          data.filter(r => r.propertyId === propertyId && r.approved)
        );
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };
    loadReviews();
  }, [propertyId]);

  const toggleFavorite = async (id: string) => {
    const review = reviews.find(r => r.id === id);
    if (!review) return;

    try {
      const updated = await updateReview(id, { favorite: !review.favorite });
      setReviews(prev => prev.map(r => (r.id === id ? updated : r)));
    } catch (err) {
      console.error('Failed to update favorite', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#064e3b', marginBottom: '20px' }}>
        Property {propertyId} Reviews
      </h1>

      {reviews.length === 0 ? (
        <p>No approved reviews yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {reviews.map(r => (
            <ReviewCard
              key={r.id}
              review={r}
              onFavorite={() => toggleFavorite(r.id)}
              isPublic={true} // hide approve button
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
