import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Team } from './types';

interface TournamentFormProps {
  tournamentName: string;
  teamName: string;
  responsible: string;
  teams: Team[];
  onTournamentNameChange: (value: string) => void;
  onTeamNameChange: (value: string) => void;
  onResponsibleChange: (value: string) => void;
  onAddTeam: (team: Team) => void;
}

export const TournamentForm: React.FC<TournamentFormProps> = ({
  tournamentName,
  teamName,
  responsible,
  teams,
  onTournamentNameChange,
  onTeamNameChange,
  onResponsibleChange,
  onAddTeam,
}) => {
  const handleAddTeam = () => {
    const newTeam: Team = {
      id: (teams.length + 1).toString(),
      name: teamName,
      responsible: responsible,
    };
    onAddTeam(newTeam);
    onTeamNameChange('');
    onResponsibleChange('');
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tournamentName">Nome do Campeonato</Label>
        <Input
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => onTournamentNameChange(e.target.value)}
          placeholder="Digite o nome do campeonato"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="teamName">Nome do Time</Label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => onTeamNameChange(e.target.value)}
            placeholder="Digite o nome do time"
          />
        </div>
        <div>
          <Label htmlFor="responsible">Responsável</Label>
          <Input
            id="responsible"
            value={responsible}
            onChange={(e) => onResponsibleChange(e.target.value)}
            placeholder="Digite o nome do responsável"
          />
        </div>
        <div className="col-span-2">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddTeam}
          >
            Adicionar Time
          </button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Times Cadastrados</h3>
          <ul className="space-y-2">
            {teams.map((team, index) => (
              <li key={team.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{team.name}</span>
                <span className="text-gray-600">{team.responsible}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};