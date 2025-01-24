import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTournamentStore } from '@/stores/useTournamentStore';

export const TournamentForm: React.FC = () => {
  const { tournamentName, tournamentType, setTournamentName, setTournamentType } = useTournamentStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="tournamentName">Nome do Torneio</Label>
        <Input
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          placeholder="Digite o nome do torneio"
        />
      </div>

      <div className="space-y-4">
        <Label>Tipo de Torneio</Label>
        <RadioGroup
          value={tournamentType}
          onValueChange={setTournamentType}
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
    </div>
  );
};