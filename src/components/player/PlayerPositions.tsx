import React from 'react';
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SportsIcons } from "./sportsicons.tsx"; // Assume a custom icon component

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

type Position = {
  [key in Sport]: string[];
};

const positions: Position = {
  futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
  futebol: ["Goleiro", "Defensor", "Meio-campo", "Atacante"],
  volei: ["Levantador", "Líbero", "Central", "Ponteiro", "Oposto"],
  basquete: ["Armador", "Ala", "Ala-pivô", "Pivô"],
  handbol: ["Goleiro", "Ponta", "Central", "Pivô"]
};

interface PlayerPositionsProps {
  sport: Sport;
  selectedPositions: string[];
  onPositionChange: (position: string, checked: boolean) => void;
}

export const PlayerPositions: React.FC<PlayerPositionsProps> = ({
  sport,
  selectedPositions,
  onPositionChange
}) => {
  const handlePositionChange = (checked: boolean, position: string) => {
    onPositionChange(position, checked);
  };

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
                  onCheckedChange={(checked) => handlePositionChange(checked as boolean, position)}
                  className={cn(
                    "border-gray-300 data-[state=checked]:border-primary",
                    "focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                />
                <div className="flex items-center gap-2">
                  <SportsIcons position={position} className="h-5 w-5 text-gray-600" />
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