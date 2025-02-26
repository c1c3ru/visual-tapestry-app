
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { springConfig } from '../../utils/animations';


interface Scale5RatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const Scale5Rating: React.FC<Scale5RatingProps> = ({ rating, onRatingChange }) => {
  const getColorClass = (rating: number) => {
    if (rating <= 2) return 'text-destructive';
    if (rating <= 4) return 'text-primary';
    return 'text-blue-500';
  };

  const handleChange = (value: number[]) => {
    onRatingChange(value[0]);
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
              <span>Avaliação (1-5)</span>
              <span className={`text-sm font-normal ${colorClass}`}>
                Nota atual: {rating}
              </span>
            </Label>

            <motion.div whileHover={{ scale: 1.05 }} className="relative px-2">
              <Slider
                value={[rating]}
                min={1}
                max={5}
                step={1}
                onValueChange={handleChange}
                className={colorClass}
              />
            </motion.div>

            <div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(rating / 5) * 100}%` }}
                transition={springConfig}
                className={`h-full ${colorClass.replace('text', 'bg')} rounded-full`}
                role="progressbar"
                aria-valuenow={rating}
                aria-valuemin={1}
                aria-valuemax={5}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Scale5Rating;
