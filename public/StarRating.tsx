// StarRating.tsx
import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleStarClick = (star: number) => {
    onRatingChange(star);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => handleStarClick(star)}>
          {rating >= star ? <Star className="h-6 w-6 text-yellow-500" /> : <StarHalf className="h-6 w-6 text-yellow-500" />}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
    