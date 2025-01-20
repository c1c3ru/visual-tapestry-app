import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingInputProps {
  ratingSystem: string;
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  ratingSystem,
  rating,
  onRatingChange
}) => {
  switch (ratingSystem) {
    case 'stars':
      return (
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={`${
                  rating >= star
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      );
    case 'halfStars':
      return (
        <div className="flex gap-2">
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              {Number.isInteger(star) ? (
                <Star
                  size={32}
                  className={`${
                    rating >= star
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  } transition-colors`}
                />
              ) : (
                <StarHalf
                  size={32}
                  className={`${
                    rating >= star
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  } transition-colors`}
                />
              )}
            </button>
          ))}
        </div>
      );
    case 'numeric10':
      return (
        <div className="flex gap-2">
          {[...Array(10)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onRatingChange(i + 1)}
              className={`w-8 h-8 rounded-full ${
                rating >= i + 1
                  ? i + 1 <= 3
                    ? "bg-red-500"
                    : i + 1 <= 7
                    ? "bg-green-500"
                    : "bg-blue-500"
                  : "bg-gray-200"
              } text-white transition-colors`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    case 'numeric5':
      return (
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onRatingChange(i + 1)}
              className={`w-8 h-8 rounded-full ${
                rating >= i + 1
                  ? i + 1 <= 2
                    ? "bg-red-500"
                    : i + 1 <= 4
                    ? "bg-green-500"
                    : "bg-blue-500"
                  : "bg-gray-200"
              } text-white transition-colors`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    default:
      return null;
  }
};