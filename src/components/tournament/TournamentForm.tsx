import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

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

export const TournamentForm: React.FC<TournamentFormProps> = ({
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
    <motion.div 
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <Label htmlFor="tournamentName">Nome do Torneio</Label>
        <Input
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => onTournamentNameChange(e.target.value)}
          placeholder="Digite o nome do torneio"
          className="border-tournament-bg/20 focus:border-tournament-bg"
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
            className="border-tournament-bg/20 focus:border-tournament-bg"
          />
          <Input
            value={responsible}
            onChange={(e) => onResponsibleChange(e.target.value)}
            placeholder="Responsável"
            className="border-tournament-bg/20 focus:border-tournament-bg"
          />
          <Button onClick={onAddTeam} className="bg-tournament-bg hover:bg-tournament-bg/90 text-white">
            <Users className="mr-2 h-4 w-4" />
            Adicionar Time
          </Button>
        </div>
      </div>
    </motion.div>
  );
};