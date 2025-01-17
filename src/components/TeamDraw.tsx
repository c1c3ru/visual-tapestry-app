import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Shuffle, Users } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Player {
  id: number;
  name: string;
  rating: number;
  selected: boolean;
}

const TeamDraw = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Player[][]>([]);
  const [playersPerTeam, setPlayersPerTeam] = useState(5);
  const { toast } = useToast();

  // Simula os dados dos jogadores selecionados
  useEffect(() => {
    const selectedPlayers = [
      { id: 1, name: "Bale", rating: 4, selected: true },
      { id: 2, name: "Betinho", rating: 1, selected: true },
      { id: 3, name: "Buffon", rating: 5, selected: true },
      { id: 4, name: "Coutinho", rating: 4, selected: true },
      { id: 5, name: "Cristiano Ronaldo", rating: 5, selected: true },
      { id: 7, name: "Egídio", rating: 1, selected: true },
      { id: 8, name: "Messi", rating: 5, selected: true },
      { id: 9, name: "Navas", rating: 3, selected: true },
      { id: 10, name: "Neymar", rating: 5, selected: true },
      { id: 11, name: "Pogba", rating: 4, selected: true },
      { id: 12, name: "Reinaldo", rating: 1, selected: true },
    ];
    setPlayers(selectedPlayers);
  }, []);

  const calculateTeamStrength = (team: Player[]): number => {
    return team.reduce((sum, player) => sum + player.rating, 0);
  };

  const drawTeams = () => {
    if (players.length < playersPerTeam * 2) {
      toast({
        title: "Erro no sorteio",
        description: `São necessários pelo menos ${
          playersPerTeam * 2
        } jogadores selecionados.`,
        variant: "destructive",
      });
      return;
    }

    // Ordena jogadores por rating (do maior para o menor)
    const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);
    const numberOfTeams = Math.floor(players.length / playersPerTeam);
    const newTeams: Player[][] = Array.from({ length: numberOfTeams }, () => []);

    // Distribui os melhores jogadores primeiro
    sortedPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfTeams;
      newTeams[teamIndex].push(player);
    });

    // Verifica se os times estão equilibrados
    const teamStrengths = newTeams.map(calculateTeamStrength);
    const maxStrength = Math.max(...teamStrengths);
    const minStrength = Math.min(...teamStrengths);

    if (maxStrength - minStrength > 2) {
      toast({
        title: "Times desbalanceados",
        description: "Tentando novo sorteio...",
        variant: "destructive",
      });
      drawTeams(); // Tenta novamente
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Sorteio de Times
          </h1>
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
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <div className="bg-primary/10 rounded-t-lg p-3">
              <h2 className="text-lg font-semibold text-primary">
                Time {teamIndex + 1}
              </h2>
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
                  <span>{player.name}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < player.rating
                            ? "text-primary"
                            : "text-gray-300"
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