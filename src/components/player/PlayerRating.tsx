
import React from 'react';
import { Rating } from "@/utils/types";
import { RatingInput } from "./RatingInput";

interface PlayerRatingProps {
  rating: Rating;
  ratingSystem: string;
  onRatingChange: (rating: Rating) => void;
  error: boolean;
}

export const PlayerRating: React.FC<PlayerRatingProps> = ({
  rating,
  ratingSystem,
  onRatingChange,
  error
}) => {
  return (
    <div>
      <RatingInput
        ratingSystem={ratingSystem}
        rating={rating}
        onRatingChange={onRatingChange}
      />
      {error && <p className="text-red-500">Avaliação é obrigatória.</p>}
    </div>
  );
};
