import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Users } from 'lucide-react';
import { Team } from '@/utils/types';

interface TournamentFormProps {
  tournamentName: string;
  tournamentType: 'league' | 'worldCup' | 'homeAway';
  teamName: string;
  responsible: string;
  onTournamentNameChange: (value: string) => void;
  onTournamentTypeChange: (value: 'league' | 'worldCup' | 'homeAway') => void;
  onTeamNameChange: (value: string) => void;
  onResponsibleChange: (value: string) => void;
  onAddTeam: () => void;
}

const TournamentForm: React.FC<TournamentFormProps> = ({
  tournamentName,
  tournamentType,
  teamName,
  responsible,
  onTournamentNameChange,
  onTournamentTypeChange,
  onTeamNameChange,
  onResponsibleChange,
  onAddTeam,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="tournamentName">Nome do Torneio</Label>
        <Input
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => onTournamentNameChange(e.target.value)}
          placeholder="Digite o nome do torneio"
        />
      </div>

      <div className="space-y-4">
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

      <div className="space-y-4">
        <Label>Adicionar Time</Label>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={teamName}
            onChange={(e) => onTeamNameChange(e.target.value)}
            placeholder="Nome do time"
          />
          <Input
            value={responsible}
            onChange={(e) => onResponsibleChange(e.target.value)}
            placeholder="Responsável"
          />
          <Button onClick={onAddTeam} className="whitespace-nowrap">
            <Users className="mr-2 h-4 w-4" />
            Adicionar Time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentForm;