
import React from 'react';
import { Star } from 'lucide-react';
import { RatingEnum } from '@/utils/enums';
import NumberRating from '../rating/NumberRating';
import Scale5Rating from '../rating/Scale5Rating';
import StarRating from '../rating/StarRating';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RatingInputProps {
  ratingSystem: string;
  rating: number;
  onRatingChange: (rating: RatingEnum) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  ratingSystem,
  rating,
  onRatingChange,
}) => {
  switch (ratingSystem) {
    case 'numeric10':
      return (
        <Select value={String(rating)} onValueChange={(value) => onRatingChange(Number(value) as RatingEnum)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a avaliação" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case 'numeric5':
      return <Scale5Rating rating={rating} onRatingChange={onRatingChange} />;
    case 'stars':
      return <StarRating rating={rating} onRatingChange={onRatingChange} />;
    default:
      return <StarRating rating={rating} onRatingChange={onRatingChange} />;
  }
};
