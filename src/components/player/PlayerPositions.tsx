import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePlayerStore } from '@/stores/usePlayerStore';

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

export const PlayerPositions: React.FC = () => {
  const { sport, selectedPositions, togglePosition } = usePlayerStore();

  return (
    <div className="grid grid-cols-2 gap-4">
      {positions[sport].map((position) => (
        <div key={position} className="flex items-center space-x-2">
          <Checkbox
            id={position}
            checked={selectedPositions.includes(position)}
            onCheckedChange={(checked) => togglePosition(position, checked as boolean)}
          />
          <Label htmlFor={position} className="text-sm font-medium leading-none">
            {position}
          </Label>
        </div>
      ))}
    </div>
  );
};