import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamDrawStore } from "@/stores/useTeamDrawStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import BackToDashboard from "./BackToDashboard";
import clsx from "clsx";

const TeamDraw = () => {
  const { players } = usePlayerStore();
  const { toast } = useToast();
  const { playersPerTeam, setPlayersPerTeam, teams, setTeams } = useTeamDrawStore();

  const calculateTeamStrength = (team: typeof players) => {
    return team.reduce((acc, player) => acc + player.rating, 0) / team.length;
  };

  const generateTeams = () => {
    const availablePlayers = players.filter(p => p.includeInDraw);
    
    if (availablePlayers.length < playersPerTeam) {
      toast({
        title: "Erro no Sorteio",
        description: `São necessários no mínimo ${playersPerTeam} jogadores selecionados para formar times.`,
        variant: "destructive",
      });
      return;
    }

    // Separate goalkeepers
    const goalkeepers = availablePlayers.filter(p => 
      p.selectedPositions.includes("Goleiro")
    );

    // Other players
    const fieldPlayers = availablePlayers.filter(p => 
      !p.selectedPositions.includes("Goleiro")
    );

    // Shuffle players
    const shuffledFieldPlayers = [...fieldPlayers].sort(() => Math.random() - 0.5);
    const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);
    
    // Calculate number of teams
    const numTeams = Math.floor(availablePlayers.length / playersPerTeam);
    let newTeams: typeof players[] = Array(numTeams).fill(null).map(() => []);

    // Distribute goalkeepers first
    shuffledGoalkeepers.forEach((goalkeeper, index) => {
      if (index < numTeams) {
        newTeams[index].push(goalkeeper);
      }
    });

    // Distribute remaining players
    let currentTeamIndex = 0;
    shuffledFieldPlayers.forEach(player => {
      if (newTeams[currentTeamIndex].length < playersPerTeam) {
        newTeams[currentTeamIndex].push(player);
      } else {
        currentTeamIndex = (currentTeamIndex + 1) % numTeams;
        if (currentTeamIndex < numTeams) {
          newTeams[currentTeamIndex].push(player);
        }
      }
    });

    setTeams(newTeams);
    toast({
      title: "Times Gerados",
      description: `${numTeams} times foram sorteados com sucesso!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6"
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
            <Button onClick={generateTeams}>
              <Shuffle className="mr-2 h-4 w-4" />
              Sortear Times
            </Button>
          </div>
        </div>

        {teams.length > 0 && (
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
                          player.selectedPositions.includes("Goleiro")
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
        )}
      </div>
    </motion.div>
  );
};

export default TeamDraw;
