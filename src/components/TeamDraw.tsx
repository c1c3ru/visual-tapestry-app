import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Shuffle, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "@/components/DynamicTitle";


interface Player {
  id: number;
  name: string;
  rating: number;
  selected: boolean;
  position: string;
}

const TeamDraw = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Player[][]>([]);
  const [playersPerTeam, setPlayersPerTeam] = useState(5);
  const { toast } = useToast();

  // Simula os dados dos jogadores selecionados
  useEffect(() => {
    const selectedPlayers = [
      { id: 1, name: "Bale", rating: 4, selected: true, position: "atacante" },
      { id: 2, name: "Betinho", rating: 1, selected: true, position: "meio" },
      { id: 3, name: "Buffon", rating: 5, selected: true, position: "goleiro" },
      { id: 4, name: "Coutinho", rating: 4, selected: true, position: "meio" },
      { id: 5, name: "Cristiano", rating: 5, selected: true, position: "atacante" },
      { id: 7, name: "Egídio", rating: 1, selected: true, position: "defensor" },
      { id: 8, name: "Messi", rating: 5, selected: true, position: "atacante" },
      { id: 9, name: "Navas", rating: 3, selected: true, position: "goleiro" },
      { id: 10, name: "Neymar", rating: 5, selected: true, position: "atacante" },
      { id: 11, name: "Pogba", rating: 4, selected: true, position: "meio" },
      { id: 12, name: "Reinaldo", rating: 1, selected: true, position: "defensor" },
    ];
    setPlayers(selectedPlayers.filter(player => player.position !== "goleiro"));
  }, []);

  const calculateTeamStrength = (team: Player[]): number => {
    return team.reduce((sum, player) => sum + player.rating, 0);
  };

  const getPositionDistribution = (numPlayers: number) => {
    const distribution = {
      defensor: Math.floor(numPlayers * 0.3),
      meio: Math.floor(numPlayers * 0.4),
      atacante: Math.floor(numPlayers * 0.3),
    };

    // Ajustar para erros de arredondamento
    const total = distribution.defensor + distribution.meio + distribution.atacante;
    if (total < numPlayers) {
      distribution.meio += numPlayers - total;
    }

    return distribution;
  };

  const drawTeams = () => {
    const nonGoalkeepers = players.filter(p => p.position !== "goleiro");
    
    if (nonGoalkeepers.length < playersPerTeam) {
      toast({
        title: "Erro no sorteio",
        description: `São necessários pelo menos ${playersPerTeam} jogadores de linha.`,
        variant: "destructive",
      });
      return;
    }

    const distribution = getPositionDistribution(playersPerTeam);
    const numberOfCompleteTeams = Math.floor(nonGoalkeepers.length / playersPerTeam);
    const remainingPlayers = nonGoalkeepers.length % playersPerTeam;
    
    // Classificar os jogadores por posição e rating
    const playersByPosition = {
      defensor: nonGoalkeepers.filter(p => p.position === "defensor").sort((a, b) => b.rating - a.rating),
      meio: nonGoalkeepers.filter(p => p.position === "meio").sort((a, b) => b.rating - a.rating),
      atacante: nonGoalkeepers.filter(p => p.position === "atacante").sort((a, b) => b.rating - a.rating),
    };

    const newTeams: Player[][] = Array.from({ length: numberOfCompleteTeams + (remainingPlayers > 0 ? 1 : 0) }, () => []);

    // Distribuir jogadores por posição para times completos
    for (let i = 0; i < numberOfCompleteTeams; i++) {
      // Adicionar defensores
      for (let j = 0; j < distribution.defensor; j++) {
        if (playersByPosition.defensor.length > 0) {
          newTeams[i].push(playersByPosition.defensor.shift()!);
        }
      }
      // Adicionar meio-campistas
      for (let j = 0; j < distribution.meio; j++) {
        if (playersByPosition.meio.length > 0) {
          newTeams[i].push(playersByPosition.meio.shift()!);
        }
      }
      // Adicionar atacantes
      for (let j = 0; j < distribution.atacante; j++) {
        if (playersByPosition.atacante.length > 0) {
          newTeams[i].push(playersByPosition.atacante.shift()!);
        }
      }
    }

    // Gerenciar jogadores restantes
    if (remainingPlayers > 0) {
      const remainingTeamIndex = numberOfCompleteTeams;
      const remainingPlayersList = [
        ...playersByPosition.defensor,
        ...playersByPosition.meio,
        ...playersByPosition.atacante,
      ];
      newTeams[remainingTeamIndex] = remainingPlayersList;
    }

    // Verificar balanceamento de times
    const teamStrengths = newTeams.map(calculateTeamStrength);
    const maxStrength = Math.max(...teamStrengths);
    const minStrength = Math.min(...teamStrengths);

    if (maxStrength - minStrength > 1) {
      toast({
        title: "Times desbalanceados",
        description: "Tentando novo sorteio...",
        variant: "destructive",
      });
      drawTeams(); // Tentar novamente se os times não forem balanceados
      return;
    }

    setTeams(newTeams);
    toast({
      title: "Times sorteados!",
      description: "Os times foram divididos de forma equilibrada.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackToDashboard />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DynamicTitle />
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Jogadores por time:</span>
            <select
              value={playersPerTeam}
              onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={drawTeams} className="gap-2">
            <Shuffle className="h-4 w-4" />
            Sortear Times
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, teamIndex) => (
          <motion.div
            key={teamIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: teamIndex * 0.1 }}
            className={`bg-white rounded-lg shadow-lg p-4 ${
              team.length < playersPerTeam ? "border-2 border-yellow-400" : ""
            }`}
          >
            <div className="bg-primary/10 rounded-t-lg p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primary">
                  Time {teamIndex + 1}
                </h2>
                {team.length < playersPerTeam && (
                  <div className="flex items-center text-yellow-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Time Incompleto
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Força total: {calculateTeamStrength(team)}
              </div>
            </div>
            <ul className="space-y-2 mt-3">
              {team.map((player) => (
                <motion.li
                  key={player.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col">
                    <span>{player.name}</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {player.position}
                    </span>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < player.rating ? "text-primary" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamDraw;
