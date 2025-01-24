import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface NumberRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const NumberRating: React.FC<NumberRatingProps> = ({ rating, onRatingChange }) => {
  const color = rating <= 3 ? 'text-destructive' : rating <= 7 ? 'text-primary' : 'text-blue-500';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      onRatingChange(value);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="rating">Avaliação (1-10)</Label>
          <Input
            id="rating"
            type="number"
            value={rating}
            min={1}
            max={10}
            onChange={handleChange}
            className={color}
          />
          <span className={`text-sm ${color}`}>Nota atual: {rating}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NumberRating;