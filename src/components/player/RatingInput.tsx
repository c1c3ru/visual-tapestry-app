
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { RatingEnum } from '@/utils/types';
import NumberRating from '../rating/NumberRating';
import Scale5Rating from '../rating/Scale5Rating';
import StarRating from '../rating/StarRating';

interface RatingInputProps {
  ratingSystem: string;
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  ratingSystem,
  rating,
  onRatingChange,
}) => {
  switch (ratingSystem) {
    case 'numeric10':
      return <NumberRating rating={rating} onRatingChange={onRatingChange} />;
    case 'numeric5':
      return <Scale5Rating rating={rating} onRatingChange={onRatingChange} />;
    case 'stars':
      return <StarRating rating={rating} onRatingChange={onRatingChange} />;
    case 'halfStars':
      return (
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((starNumber) => {
            const isFullStarFilled = rating >= starNumber;
            const isHalfStarFilled = rating === starNumber - 0.5;
            
            return (
              <div key={starNumber} className="relative">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRatingChange(starNumber - 0.5 as RatingEnum);
                  }}
                  className="absolute left-0 w-1/2 h-full z-10 focus:outline-none"
                  type="button"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRatingChange(starNumber as RatingEnum);
                  }}
                  className="absolute right-0 w-1/2 h-full z-10 focus:outline-none"
                  type="button"
                />
                {isHalfStarFilled ? (
                  <StarHalf
                    size={32}
                    className="fill-yellow-500 text-yellow-500 transition-colors"
                  />
                ) : (
                  <Star
                    size={32}
                    className={`${
                      isFullStarFilled
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-200 text-gray-200"
                    } transition-colors`}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    default:
      return <StarRating rating={rating} onRatingChange={onRatingChange} />;
  }
};
