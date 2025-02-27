import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Trophy, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentBracket } from '../TournamentBracket';
import { TournamentType } from '@/utils/enums';
import { TournamentForm } from '../tournament/TournamentForm';
import TeamList from '../tournament/TeamList';
import BackToDashboard from '../BackToDashboard';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { Separator } from "@/components/ui/separator";

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

    const teamExists = teams.some(team => 
      team.name.toLowerCase() === teamName.toLowerCase()
    );

    if (teamExists) {
      toast({
        title: "Time duplicado",
        description: "Já existe um time com este nome.",
        variant: "destructive"
      });
      return;
    }

    const newTeam = {
      id: Date.now().toString(),
      name: teamName.trim(),
      responsible: responsible.trim(),
      players: [],
      ranking: 0,
      stats: {
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0
      }
    };

    addTeam(newTeam);
    setTeamName('');
    setResponsible('');
    
    toast({
      title: "Time adicionado",
      description: `${newTeam.name} foi registrado com sucesso`,
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

    const result = generateMatches();
    
    if (!result.success) {
      toast({
        title: "Erro",
        description: result.error || "Erro ao gerar partidas.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Partidas geradas com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Campeonato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {validationError && (
              <Alert variant="destructive">
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

            <Separator className="my-4" />

            <div className="space-y-4">
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
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Adicionar Time
              </Button>
            </div>

            <Separator className="my-4" />
            <TeamList teams={teams} onRemoveTeam={removeTeam} />
            
            <Button 
              onClick={handleGenerateMatches}
              disabled={teams.length < 4}
              className="w-full"
              variant="secondary"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Gerar Partidas
            </Button>

            {groups.length > 0 && (
              <div className="mt-8">
                <TournamentBracket groups={groups} knockoutMatches={knockoutMatches} tournamentType={TournamentType.LEAGUE} />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Championship;