import React from 'react';
import { Label } from "@/components/ui/label";

interface Scale5RatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const Scale5Rating: React.FC<Scale5RatingProps> = ({ rating, onRatingChange }) => {
  const color = rating <= 2 ? 'text-red-500' : rating <= 4 ? 'text-green-500' : 'text-blue-500';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 5) {
      onRatingChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="rating">Avaliação (1-5)</Label>
      <input
        id="rating"
        type="number"
        value={rating}
        min={1}
        max={5}
        onChange={handleChange}
        className={`w-full p-2 border rounded-md ${color}`}
      />
      <span className={`text-sm ${color}`}>Nota atual: {rating}</span>
    </div>
  );
};

export default Scale5Rating;