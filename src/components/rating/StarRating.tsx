
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Rating } from '@/utils/types';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleStarClick = (value: number) => {
    onRatingChange(value as Rating);
  };

  return (
    <div 
      className="flex gap-1"
      role="radiogroup"
      aria-label="Classificação por estrelas"
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = rating >= value;
        const isHalf = rating === value - 0.5;

        return (
          <motion.button
            key={value}
            onClick={() => handleStarClick(value)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={springConfig}
            className="relative focus:outline-none"
            role="radio"
            aria-checked={isFilled}
            type="button"
            aria-label={`Avaliar com ${value} ${value === 1 ? 'estrela' : 'estrelas'}`}
          >
            <AnimatePresence initial={false}>
              {isFilled && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0"
                >
                  <Star
                    size={32}
                    className="text-yellow-400 fill-yellow-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Star
              size={32}
              className={`${
                isFilled 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300 fill-gray-100"
              } transition-colors duration-150`}
            />

            {!isFilled && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.2 }}
              >
                <Star
                  size={32}
                  className="text-yellow-400 fill-transparent"
                />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;
