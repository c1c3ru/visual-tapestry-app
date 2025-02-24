import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface NumberRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const NumberRating: React.FC<NumberRatingProps> = ({ rating, onRatingChange }) => {
  const getColorClass = (rating: number) => {
    if (rating <= 3) return 'text-destructive';
    if (rating <= 6) return 'text-primary';
    return 'text-blue-500';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 1, 10));
    onRatingChange(value);
  };

  const colorClass = getColorClass(rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold flex items-center justify-between">
              <span>Avaliação (1-10)</span>
              <span className={`text-sm font-normal ${colorClass}`}>
                Nota atual: {rating}
              </span>
            </Label>

            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Input
                id="rating"
                type="number"
                value={rating}
                min={1}
                max={10}
                onChange={handleChange}
                className={`text-2xl font-bold ${colorClass} pr-16`}
                aria-label="Classificação de 1 a 10"
              />
              <span className="absolute right-4 top-3 text-gray-400">/ 10</span>
            </motion.div>

            <div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(rating / 10) * 100}%` }}
                transition={springConfig}
                className={`h-full ${colorClass} rounded-full`}
                role="progressbar"
                aria-valuenow={rating}
                aria-valuemin={1}
                aria-valuemax={10}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NumberRating;