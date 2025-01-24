import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

interface TournamentFormProps {
  tournamentName: string;
  tournamentType: 'league' | 'worldCup' | 'homeAway';
  onTournamentNameChange: (value: string) => void;
  onTournamentTypeChange: (value: 'league' | 'worldCup' | 'homeAway') => void;
}

export const TournamentForm: React.FC<TournamentFormProps> = ({
  tournamentName,
  tournamentType,
  onTournamentNameChange,
  onTournamentTypeChange,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tournamentName">Nome do Torneio</Label>
          <Input
            id="tournamentName"
            value={tournamentName}
            onChange={(e) => onTournamentNameChange(e.target.value)}
            placeholder="Digite o nome do torneio"
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo de Torneio</Label>
          <RadioGroup
            value={tournamentType}
            onValueChange={onTournamentTypeChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="league" id="league" />
              <Label htmlFor="league">Pontos Corridos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="worldCup" id="worldCup" />
              <Label htmlFor="worldCup">Copa do Mundo (Grupos + Mata-mata)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="homeAway" id="homeAway" />
              <Label htmlFor="homeAway">Mata-mata (Ida e Volta)</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};