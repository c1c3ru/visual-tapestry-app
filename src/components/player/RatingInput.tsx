import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { Rating } from '@/utils/types';
import NumberRating from '../rating/NumberRating';
import Scale5Rating from '../rating/Scale5Rating';
import StarRating from '../rating/StarRating';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

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
  const renderHalfStars = () => {
    return (
      <div className="flex gap-1" role="radiogroup" aria-label="Classificação por meias estrelas">
        {[1, 2, 3, 4, 5].map((starNumber) => {
          const isFull = rating >= starNumber;
          const isHalf = rating >= starNumber - 0.5 && rating < starNumber;
          const isActive = isFull || isHalf;

          return (
            <motion.div
              key={starNumber}
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRatingChange(isHalf ? starNumber : starNumber - 0.5);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label={`Avaliar ${starNumber - 0.5} estrelas`}
              />
              <div className="relative flex">
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={springConfig}
                >
                  {isHalf ? (
                    <StarHalf
                      size={32}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ) : (
                    <Star
                      size={32}
                      className={`${
                        isFull 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300 fill-gray-100"
                      } transition-colors duration-200`}
                    />
                  )}
                </motion.div>
                {!isFull && !isHalf && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Star
                      size={32}
                      className="text-yellow-400 fill-transparent"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={ratingSystem}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={springConfig}
        className="flex justify-center"
      >
        {ratingSystem === 'numeric10' ? (
          <NumberRating 
            rating={rating} 
            onRatingChange={onRatingChange} 
          />
        ) : ratingSystem === 'numeric5' ? (
          <Scale5Rating 
            rating={rating} 
            onRatingChange={onRatingChange} 
          />
        ) : ratingSystem === 'stars' ? (
          <StarRating 
            rating={rating} 
            onRatingChange={onRatingChange} 
          />
        ) : ratingSystem === 'halfStars' ? (
          renderHalfStars()
        ) : (
          <StarRating 
            rating={rating} 
            onRatingChange={onRatingChange} 
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};