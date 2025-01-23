import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Rating } from '@/utils/types';

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
  const handleStarClick = (e: React.MouseEvent, value: number) => {
    e.preventDefault(); // Previne o comportamento de submit do formulário
    e.stopPropagation(); // Previne a propagação do evento
    onRatingChange(value as Rating);
  };

  if (ratingSystem === 'halfStars') {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((starNumber) => {
          const isFullStarFilled = rating >= starNumber;
          const isHalfStarFilled = rating === starNumber - 0.5;
          
          return (
            <div key={starNumber} className="relative">
              {/* Área para meia estrela (metade esquerda) */}
              <button
                onClick={(e) => handleStarClick(e, starNumber - 0.5)}
                className="absolute left-0 w-1/2 h-full z-10 focus:outline-none"
                type="button"
              />
              {/* Área para estrela completa (metade direita) */}
              <button
                onClick={(e) => handleStarClick(e, starNumber)}
                className="absolute right-0 w-1/2 h-full z-10 focus:outline-none"
                type="button"
              />
              {/* Renderização da estrela */}
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
  }

  // Outros sistemas de avaliação
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={(e) => handleStarClick(e, value)}
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