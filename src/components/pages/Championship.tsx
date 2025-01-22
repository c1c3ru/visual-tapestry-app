import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';
import { generateKnockoutMatches, generateTournamentMatches } from '@/utils/tournament';
import { BackToDashboard } from '../BackToDashboard';
import { useToast } from "@/hooks/use-toast";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { TournamentHeader } from '../tournament/TournamentHeader';
import { TournamentForm } from '../tournament/TournamentForm';
import { TeamList } from '../tournament/TeamList';

const Championship = () => {
  const { toast } = useToast();
  const { addTournament, setCurrentTournament } = useTournamentStore();
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState<'league' | 'worldCup' | 'homeAway'>('league');
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [matches, setMatches] = useState<Group[]>([]);
  const [generatedKnockoutMatches, setGeneratedKnockoutMatches] = useState<KnockoutMatches | undefined>();

  const addTeam = () => {
    if (!teamName || !responsible) {
      toast({
        title: "Erro ao adicionar time",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    const newTeam: Team = { id: Date.now().toString(), name: teamName, responsible };
    setTeams([...teams, newTeam]);
    setTeamName("");
    setResponsible("");
  };

  const removeTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId));
  };

  const saveTournament = async () => {
    try {
      const tournament: Tournament = {
        id: Date.now().toString(),
        name: tournamentName,
        type: tournamentType,
        teams: teams,
        matches: matches,
        knockoutMatches: generatedKnockoutMatches
      };

      addTournament(tournament);
      setCurrentTournament(tournament);

      toast({
        title: "Torneio Salvo",
        description: "O torneio foi salvo com sucesso!",
      });

    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar o torneio.",
        variant: "destructive"
      });
    }
  };

  const generateMatches = () => {
    const generatedMatches = generateTournamentMatches(teams, tournamentType);
    const groupedMatches: Group[] = [{
      name: 'Todos os Jogos',
      matches: generatedMatches
    }];
    setMatches(groupedMatches);
    setGeneratedKnockoutMatches(undefined);
  };

  const mockTeams: Team[] = [
    { id: '1', name: 'Flamengo', responsible: 'João' },
    { id: '2', name: 'Palmeiras', responsible: 'Maria' },
    { id: '3', name: 'Santos', responsible: 'Pedro' },
    { id: '4', name: 'São Paulo', responsible: 'Ana' },
    { id: '5', name: 'Corinthians', responsible: 'Carlos' },
    { id: '6', name: 'Grêmio', responsible: 'Paulo' },
    { id: '7', name: 'Internacional', responsible: 'Lucas' },
    { id: '8', name: 'Atlético-MG', responsible: 'Julia' },
  ];

  useEffect(() => {
    if (tournamentType === 'worldCup' && mockTeams.length > 0) {
      const knockoutMatches = generateKnockoutMatches(mockTeams);
      setGeneratedKnockoutMatches(knockoutMatches);
    }
  }, [tournamentType]);

  return (
    <div className="container mx-auto p-4 space-y-8 bg-gray-50 min-h-screen">
      <BackToDashboard />
      <TournamentHeader />

      <div className="grid md:grid-cols-2 gap-8">
        <TournamentForm
          tournamentName={tournamentName}
          tournamentType={tournamentType}
          teamName={teamName}
          responsible={responsible}
          onTournamentNameChange={setTournamentName}
          onTournamentTypeChange={setTournamentType}
          onTeamNameChange={setTeamName}
          onResponsibleChange={setResponsible}
          onAddTeam={addTeam}
        />

        <div className="space-y-6">
          <TeamList teams={teams} onRemoveTeam={removeTeam} />

          <div className="flex gap-4 flex-wrap">
            <Button 
              onClick={saveTournament} 
              className="gap-2 bg-tournament-bg hover:bg-tournament-bg/90"
            >
              <Trophy className="h-4 w-4" />
              Salvar
            </Button>
            <Button 
              onClick={generateMatches} 
              className="gap-2 bg-tournament-bg hover:bg-tournament-bg/90" 
              disabled={teams.length < 2}
            >
              <Trophy className="h-4 w-4" />
              Gerar Confrontos
            </Button>
          </div>
        </div>
      </div>

      {(matches.length > 0 || generatedKnockoutMatches) && (
        <motion.div
          className="mt-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Confrontos do Campeonato</h2>
          <TournamentBracket 
            groups={matches} 
            knockoutMatches={generatedKnockoutMatches}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Championship;