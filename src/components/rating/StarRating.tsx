
import React from 'react';
import { Star } from 'lucide-react';
import { Rating } from '@/utils/types';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleStarClick = (value: number) => {
    onRatingChange(value as Rating);
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleStarClick(value)}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            size={32}
            className={`${
              rating >= value
                ? "fill-yellow-500 text-yellow-500"
                : "fill-gray-200 text-gray-200"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
