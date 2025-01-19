// Scale5Rating.tsx
import React from 'react';

interface Scale5RatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const Scale5Rating: React.FC<Scale5RatingProps> = ({ rating, onRatingChange }) => {
  const color = rating <= 2 ? 'red' : rating <= 4 ? 'green' : 'blue';

  return (
    <div>
      <input
        type="number"
        value={rating}
        min={1}
        max={5}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        style={{ color }}
      />
    </div>
  );
};

export default Scale5Rating;
