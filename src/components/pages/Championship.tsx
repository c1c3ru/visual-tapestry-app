import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Trophy, Users, AlertTriangle, Loader, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentBracket } from "../TournamentBracket";
import { TournamentForm } from "../tournament/TournamentForm";
import TeamList from "../tournament/TeamList";
import BackToDashboard from "../BackToDashboard";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTournamentStore } from "../../stores/useTournamentStore";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [editTeamId, setEditTeamId] = useState<string | null>(null);

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
    if (!teamName?.trim() || !responsible?.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar um time",
        variant: "destructive",
        icon: <AlertTriangle className="w-4 h-4" />
      });
      return;
    }

    const teamExists = teams.some(team => 
      team.name.toLowerCase() === teamName.toLowerCase().trim()
    );
    
    if (teamExists) {
      toast({
        title: "Time duplicado",
        description: "Já existe um time com este nome",
        variant: "destructive",
        icon: <AlertTriangle className="w-4 h-4" />
      });
      return;
    }

    const newTeam = {
      id: Date.now().toString(),
      name: teamName.trim(),
      responsible: responsible.trim(),
    };

    addTeam(newTeam);
    setTeamName('');
    setResponsible('');
    
    toast({
      title: "Time adicionado",
      description: `${newTeam.name} foi registrado com sucesso`,
      icon: <Users className="w-4 h-4 text-green-600" />
    });
  };

  const handleGenerateMatches = async () => {
    setIsGenerating(true);
    try {
      const result = await generateMatches();
      
      if (!result.success) {
        throw new Error(result.error || "Erro ao gerar partidas");
      }

      toast({
        title: "Partidas geradas",
        description: "O chaveamento do torneio foi criado com sucesso",
        icon: <Trophy className="w-4 h-4 text-blue-600" />
      });
    } catch (error) {
      toast({
        title: "Erro de geração",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
        icon: <AlertTriangle className="w-4 h-4" />
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {tournamentName || "Novo Campeonato"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Requisitos não atendidos</AlertTitle>
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <TournamentForm
              tournamentName={tournamentName}
              tournamentType={tournamentType}
              onTournamentNameChange={setTournamentName}
              onTournamentTypeChange={setTournamentType}
            />

            <Separator className="my-4" />

            <motion.div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Nome do Time</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Ex: Time Alpha"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável</Label>
                  <Input
                    id="responsible"
                    value={responsible}
                    onChange={(e) => setResponsible(e.target.value)}
                    placeholder="Ex: João Silva"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                  />
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      onClick={handleAddTeam}
                      disabled={teams.length >= 64}
                      className="w-full"
                      variant="secondary"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Adicionar Time
                      {teams.length >= 64 && (
                        <span className="ml-2 text-xs">(Máximo atingido)</span>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                {teams.length >= 64 && (
                  <TooltipContent>
                    <p>Limite máximo de 64 times atingido</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </motion.div>

            <Separator className="my-4" />

            <TeamList 
              teams={teams} 
              onRemoveTeam={(id) => {
                removeTeam(id);
                toast({
                  title: "Time removido",
                  description: "O time foi excluído do campeonato",
                  variant: "default",
                  icon: <Trash2 className="w-4 h-4 text-red-600" />
                });
              }}
            />

            <motion.div 
              className="grid gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      onClick={handleGenerateMatches}
                      disabled={teams.length < 4 || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trophy className="mr-2 h-4 w-4" />
                      )}
                      {isGenerating ? "Gerando..." : "Gerar Partidas"}
                    </Button>
                  </div>
                </TooltipTrigger>
                {teams.length < 4 && (
                  <TooltipContent>
                    <p>Adicione pelo menos 4 times para gerar partidas</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </motion.div>

            <AnimatePresence>
              {groups.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <TournamentBracket 
                    groups={groups} 
                    knockoutMatches={knockoutMatches} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Championship;