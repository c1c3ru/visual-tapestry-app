
import React from 'react';
import { Label } from "@/components/ui/label";
import { Sport } from "@/utils/types";
import { PlayerPositions } from './PlayerPositions';
import { PlayerSportSelection } from './PlayerSportSelection';

interface PlayerSportInfoProps {
  sport: Sport;
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
    <div className="space-y-4">
      <PlayerSportSelection
        sport={sport}
        onSportChange={onSportChange}
      />
      
      <div>
        <Label>Posições</Label>
        <PlayerPositions
          sport={sport}
          selectedPositions={selectedPositions}
          onPositionChange={onPositionChange}
        />
        {errors.selectedPositions && (
          <p className="text-red-500">Escolher pelo menos uma posição é obrigatório.</p>
        )}
      </div>
    </div>
  );
};
