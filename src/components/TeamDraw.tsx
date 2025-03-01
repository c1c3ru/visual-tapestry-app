
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamDrawStore } from "@/stores/useTeamDrawStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PositionEnum } from "../utils/enums";
import clsx from "clsx";
import { springConfig } from '../utils/animations';
import BackToDashboard from './BackToDashboard';

const TeamDraw = () => {
  const { players, updatePlayer } = usePlayerStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    playersPerTeam,
    setPlayersPerTeam,
    teams,
    setTeams,
    generateTeams
  } = useTeamDrawStore();

  // Inicializar jogadores para sorteio quando a página carregar
  useEffect(() => {
    const presentPlayers = players.filter(p => p.present);
    
    presentPlayers.forEach(player => {
      if (!player.includeInDraw) {
        updatePlayer(player.id, { includeInDraw: true });
      }
    });
  }, [players, updatePlayer]);

  const calculateTeamStrength = (team) => {
    if (!team || team.length === 0) return 0;
    return team.reduce((acc, player) => acc + player.rating, 0) / team.length;
  };

  const handleGenerateTeams = async () => {
    setIsGenerating(true);
    try {
      const availablePlayers = players.filter(p => p.includeInDraw && p.present);
      
      const result = generateTeams(availablePlayers);

      if (!result.success) {
        toast({
          title: "Erro no Sorteio",
          description: result.error || "Erro ao gerar times",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Times Gerados",
        description: "Times foram sorteados com sucesso!",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen"
    >
      <BackToDashboard />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Sorteio de Times</h1>
          <div className="flex items-center gap-4">
            <Select
              value={String(playersPerTeam)}
              onValueChange={(value) => setPlayersPerTeam(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jogadores por Time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} Jogadores
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleGenerateTeams}
              disabled={isGenerating}
            >
              <Shuffle className="mr-2 h-4 w-4" />
              {isGenerating ? 'Gerando...' : 'Sortear Times'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Time {index + 1}
                  <span className="text-sm">
                    Força: {calculateTeamStrength(team).toFixed(1)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {team.map((player) => (
                    <div
                      key={player.id}
                      className={clsx(
                        "p-3 rounded-lg",
                        player.selectedPositions.includes(PositionEnum.GOALKEEPER)
                          ? "bg-blue-50"
                          : "bg-gray-50"
                      )}
                    >
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-gray-600">
                        {player.selectedPositions.join(", ")}
                      </div>
                      <div className="text-sm text-gray-600">
                        Rating: {player.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamDraw;
