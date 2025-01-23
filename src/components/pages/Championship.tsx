import React from "react";
import { motion } from "framer-motion";
import { Save, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';
import { generateKnockoutMatches, generateTournamentMatches } from '@/utils/tournament';
import TournamentHeader from '../tournament/TournamentHeader';
import { TournamentForm } from '../tournament/TournamentForm';
import TeamList from '../tournament/TeamList';
import { BackToDashboard } from '../BackToDashboard';
import { useToast } from "@/hooks/use-toast";
import { useTournamentStore } from '@/stores/useTournamentStore';

const Championship = () => {
  const { toast } = useToast();
  const {
    tournamentName,
    tournamentType,
    teamName,
    responsible,
    teams,
    groups,
    knockoutMatches,
    setTournamentName,
    setTournamentType,
    setTeamName,
    setResponsible,
    addTeam,
    removeTeam,
    generateMatches,
  } = useTournamentStore();

  const handleAddTeam = () => {
    if (!teamName || !responsible) {
      toast({
        title: "Erro ao adicionar time",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName,
      responsible,
    };

    addTeam(newTeam);
    setTeamName('');
    setResponsible('');
    toast({
      title: "Time Adicionado",
      description: "Novo time foi adicionado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <TournamentHeader />
        <TournamentForm
          tournamentName={tournamentName}
          tournamentType={tournamentType}
          onTournamentNameChange={setTournamentName}
          onTournamentTypeChange={setTournamentType}
        />
        <div className="space-y-4">
          <div>
            <Label htmlFor="tournamentName">Nome do Campeonato</Label>
            <Input
              id="tournamentName"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Digite o nome do campeonato"
            />
          </div>
          <div>
            <Label htmlFor="tournamentType">Tipo de Campeonato</Label>
            <select
              id="tournamentType"
              value={tournamentType}
              onChange={(e) => setTournamentType(e.target.value as 'league' | 'worldCup' | 'homeAway')}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="league">Liga</option>
              <option value="worldCup">Copa do Mundo</option>
              <option value="homeAway">Ida e Volta</option>
            </select>
          </div>
          <div>
            <Label htmlFor="teamName">Nome do Time</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Digite o nome do time"
            />
          </div>
          <div>
            <Label htmlFor="responsible">Responsável</Label>
            <Input
              id="responsible"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Digite o nome do responsável"
            />
          </div>
          <Button onClick={handleAddTeam}>
            <Save className="mr-2 h-4 w-4" />
            Adicionar Time
          </Button>
        </div>
        <TeamList teams={teams} onRemoveTeam={removeTeam} />
        <Button onClick={generateMatches}>
          <Trophy className="mr-2 h-4 w-4" />
          Gerar Partidas
        </Button>
        {groups.length > 0 && <TournamentBracket groups={groups} knockoutMatches={knockoutMatches} />}
      </motion.div>
    </div>
  );
};

export default Championship;