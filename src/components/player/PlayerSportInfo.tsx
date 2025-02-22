import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { SportEnum, PositionEnum } from "@/utils/types";
import { PlayerPositions } from './PlayerPositions';
import { PlayerSportSelection } from './PlayerSportSelection';
import { AlertTriangle } from "lucide-react";

interface PlayerSportInfoProps {
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  onSportChange: (sport: SportEnum) => void;
  onPositionChange: (position: PositionEnum, checked: boolean) => void;
  errors: {
    selectedPositions: { hasError: boolean; message: string };
  };
}

export const PlayerSportInfo: React.FC<PlayerSportInfoProps> = ({
  sport,
  selectedPositions,
  onSportChange,
  onPositionChange,
  errors
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="sport" className="text-sm font-medium text-gray-700">
          Esporte *
        </Label>
        <PlayerSportSelection
          sport={sport}
          onSportChange={onSportChange}
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700">
          Posições Selecionadas *
        </Label>
        <PlayerPositions
          selectedPositions={selectedPositions}
          onPositionChange={onPositionChange}
        />
        <AnimatePresence>
          {errors.selectedPositions.hasError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1 mt-1"
              role="alert"
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-600">{errors.selectedPositions.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
