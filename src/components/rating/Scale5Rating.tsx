
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Scale5RatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const Scale5Rating: React.FC<Scale5RatingProps> = ({ rating, onRatingChange }) => {
  const getProgressColor = (rating: number) => {
    if (rating <= 2) return 'bg-destructive';
    if (rating <= 4) return 'bg-primary';
    return 'bg-blue-500';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 5) {
      onRatingChange(value);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Label htmlFor="rating">Avaliação (1-5)</Label>
          <Input
            id="rating"
            type="number"
            value={rating}
            min={1}
            max={5}
            onChange={handleChange}
            className={rating <= 2 ? 'text-destructive' : rating <= 4 ? 'text-primary' : 'text-blue-500'}
          />
          <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
            <div 
              className={`h-6 ${getProgressColor(rating)}`} 
              style={{ width: `${(rating / 5) * 100}%` }}
            />
          </div>
          <span className={rating <= 2 ? 'text-destructive' : rating <= 4 ? 'text-primary' : 'text-blue-500'}>
            Nota atual: {rating}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Scale5Rating;
