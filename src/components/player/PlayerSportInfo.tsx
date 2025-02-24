import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { SportEnum } from "@/utils/types";
import { PlayerPositions } from './PlayerPositions';
import { PlayerSportSelection } from './PlayerSportSelection';
import { AlertTriangle } from "lucide-react";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface PlayerSportInfoProps {
  sport: SportEnum;
  selectedPositions: string[];
  onSportChange: (value: string) => void;
  onPositionChange: (position: string, checked: boolean) => void;
  errors: {
    selectedPositions: boolean;
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <PlayerSportSelection
          sport={sport}
          onSportChange={onSportChange}
        />
      </motion.div>

      <motion.fieldset
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.2 }}
        className="space-y-4"
      >
        <legend className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
          Posições do Jogador
          {errors.selectedPositions && (
            <span className="text-red-500">*</span>
          )}
        </legend>

        <PlayerPositions
          sport={sport}
          selectedPositions={selectedPositions}
          onPositionChange={onPositionChange}
        />

        <AnimatePresence>
          {errors.selectedPositions && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-2 mt-2 p-3 bg-red-50 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-600">
                Selecione pelo menos uma posição
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.fieldset>
    </motion.div>
  );
};