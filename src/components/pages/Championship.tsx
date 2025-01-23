import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Trophy, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';
import { generateKnockoutMatches, generateTournamentMatches, generateGroups } from '@/utils/tournament';
import TournamentHeader from '../tournament/TournamentHeader';
import { TournamentForm } from '../tournament/TournamentForm';
import TeamList from '../tournament/TeamList';
import { BackToDashboard } from '../BackToDashboard';
import { useToast } from "@/hooks/use-toast";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (teams.length < 4) {
      setValidationError("Mínimo de 4 times necessário");
    } else if (teams.length > 64) {
      setValidationError("Máximo de 64 times permitido");
    } else {
      setValidationError(null);
    }
  }, [teams]);

  const handleAddTeam = () => {
    if (!teamName || !responsible) {
      toast({
        title: "Erro ao adicionar time",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (teams.length >= 64) {
      toast({
        title: "Limite excedido",
        description: "Máximo de 64 times permitido.",
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

  const handleGenerateMatches = () => {
    if (teams.length < 4) {
      toast({
        title: "Erro",
        description: "Mínimo de 4 times necessário para gerar partidas.",
        variant: "destructive"
      });
      return;
    }

    generateMatches();
    toast({
      title: "Sucesso",
      description: "Partidas geradas com sucesso!",
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
        
        {validationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <TournamentForm
          tournamentName={tournamentName}
          tournamentType={tournamentType}
          onTournamentNameChange={setTournamentName}
          onTournamentTypeChange={setTournamentType}
        />

        <div className="space-y-4 mt-6">
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
          <Button 
            onClick={handleAddTeam}
            disabled={teams.length >= 64}
          >
            <Save className="mr-2 h-4 w-4" />
            Adicionar Time
          </Button>
        </div>

        <TeamList teams={teams} onRemoveTeam={removeTeam} />
        
        <Button 
          onClick={handleGenerateMatches}
          disabled={teams.length < 4}
          className="mt-4"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Gerar Partidas
        </Button>

        {groups.length > 0 && <TournamentBracket groups={groups} knockoutMatches={knockoutMatches} />}
      </motion.div>
    </div>
  );
};

export default Championship;