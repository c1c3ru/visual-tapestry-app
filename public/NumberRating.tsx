// NumberRating.tsx
import React from 'react';

interface NumberRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const NumberRating: React.FC<NumberRatingProps> = ({ rating, onRatingChange }) => {
  const color = rating <= 3 ? 'red' : rating <= 7 ? 'green' : 'blue';

  return (
    <div>
      <input
        type="number"
        value={rating}
        min={1}
        max={10}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        style={{ color }}
      />
    </div>
  );
};

export default NumberRating;
