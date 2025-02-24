import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SportEnum, PositionEnum } from "@/utils/enums";
import { SportsIcons } from "@/utils/sportsIcons";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Mapeamento de posições por esporte
const positions: Record<SportEnum, PositionEnum[]> = {
  [SportEnum.FUTSAL]: [
    PositionEnum.GOALKEEPER,
    PositionEnum.FIXO,
    PositionEnum.ALA,
    PositionEnum.PIVO_FUTSAL,
  ],
  [SportEnum.SOCCER]: [
    PositionEnum.GOALKEEPER,
    PositionEnum.DEFENDER,
    PositionEnum.MIDFIELDER,
    PositionEnum.FORWARD,
  ],
  [SportEnum.VOLLEYBALL]: [
    PositionEnum.SETTER,
    PositionEnum.LIBERO,
    PositionEnum.CENTRAL,
    PositionEnum.PONTEIRO,
    PositionEnum.OPOSTO,
  ],
  [SportEnum.BASKETBALL]: [
    PositionEnum.ARMADOR,
    PositionEnum.ALA_BASKET,
    PositionEnum.ALA_PIVO,
    PositionEnum.PIVO_BASKET,
  ],
  [SportEnum.HANDBALL]: [
    PositionEnum.GOALKEEPER,
    PositionEnum.PONTA,
    PositionEnum.CENTRAL_HANDBALL,
    PositionEnum.PIVO_HANDBALL,
  ],
};

interface PlayerPositionsProps {
  sport: SportEnum; // Usando o enum SportEnum
  selectedPositions: string[];
  onPositionChange: (position: string, checked: boolean) => void;
}

export const PlayerPositions: React.FC<PlayerPositionsProps> = ({
  sport,
  selectedPositions,
  onPositionChange,
}) => {
  const handlePositionChange = (checked: boolean, position: string) => {
    onPositionChange(position, checked);
  };

  // Obtém o ícone correspondente ao esporte
  const SportIcon = SportsIcons[sport];

  return (
    <motion.fieldset
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springConfig}
      className="space-y-4"
      aria-labelledby="positions-legend"
    >
      <legend id="positions-legend" className="sr-only">
        Selecione as posições
      </legend>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {positions[sport].map((position, index) => {
          const isSelected = selectedPositions.includes(position);

          return (
            <motion.div
              key={position}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: index * 0.05 }}
            >
              <Label
                htmlFor={position}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                  "hover:bg-gray-50 hover:border-primary",
                  isSelected ? "bg-blue-50 border-primary" : "border-gray-200"
                )}
              >
                <Checkbox
                  id={position}
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handlePositionChange(checked as boolean, position)
                  }
                  className={cn(
                    "border-gray-300 data-[state=checked]:border-primary",
                    "focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                />
                <div style={{ display: "flex", gap: "16px" }}>
                  <SportIcon /> {/* Renderiza o ícone do esporte */}
                  <span className="text-sm font-medium text-gray-700">
                    {position}
                  </span>
                </div>
              </Label>
            </motion.div>
          );
        })}
      </div>
    </motion.fieldset>
  );
};