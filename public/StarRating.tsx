import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleStarClick = (star: number) => {
    onRatingChange(star);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="icon"
              onClick={() => handleStarClick(star)}
              className="hover:bg-accent"
            >
              {rating >= star ? (
                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              ) : (
                <StarHalf className="h-6 w-6 text-yellow-500" />
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StarRating;