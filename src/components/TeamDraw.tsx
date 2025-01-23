import { useEffect } from "react";
import { motion } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { Button } from "./ui/button";
import { Shuffle, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TeamNameSelector from "./TeamNameSelector";
import GenerateMatchupsButton from "./GenerateMatchupsButton";
import MatchupTable from "./MatchupTable";
import ShareButtons from "./ShareButtons";
import { useTeamDrawStore } from "@/stores/useTeamDrawStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import clsx from "clsx";

const TeamDraw = () => {
  const {
    players: teamPlayers,
    goalkeepers,
    teams,
    playersPerTeam,
    namingOption,
    matchups,
    setPlayers,
    setGoalkeepers,
    setTeams,
    setPlayersPerTeam,
    setNamingOption,
    setMatchups,
  } = useTeamDrawStore();

  const { players } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();

  useEffect(() => {
    const availablePlayers = players.filter(p => p.includeInDraw);
    setPlayers(availablePlayers);
    
    const availableGoalkeepers = availablePlayers.filter(p => 
      p.selectedPositions.includes("Goleiro")
    );
    setGoalkeepers(availableGoalkeepers);
  }, [players, setPlayers, setGoalkeepers]);

  const getGuestHighlightClass = (isGuest: boolean) => {
    if (!isGuest) return "";
    
    return clsx({
      'bg-orange-100': guestHighlight === 'orange',
      'bg-purple-100': guestHighlight === 'purple',
      'bg-pink-100': guestHighlight === 'pink',
      'font-bold': guestHighlight === 'bold',
      'italic': guestHighlight === 'italic',
    });
  };

  const generateTeams = () => {
    if (teamPlayers.length < playersPerTeam * 2) {
      toast({
        title: "Erro",
        description: "Não há jogadores suficientes para formar times.",
        variant: "destructive",
      });
      return;
    }

    const shuffledPlayers = [...teamPlayers].sort(() => Math.random() - 0.5);
    const numTeams = Math.floor(shuffledPlayers.length / playersPerTeam);
    const newTeams = Array.from({ length: numTeams }, () => []);

    // Distribute goalkeepers first
    const availableGoalkeepers = [...goalkeepers];
    for (let i = 0; i < numTeams && i < availableGoalkeepers.length; i++) {
      newTeams[i].push(availableGoalkeepers[i]);
    }

    // Distribute remaining players
    const remainingPlayers = shuffledPlayers.filter(
      player => !goalkeepers.includes(player)
    );

    let currentTeam = 0;
    for (const player of remainingPlayers) {
      if (newTeams[currentTeam].length < playersPerTeam) {
        newTeams[currentTeam].push(player);
      }
      currentTeam = (currentTeam + 1) % numTeams;
    }

    setTeams(newTeams);
    toast({
      title: "Times Gerados",
      description: "Os times foram sorteados com sucesso!",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <BackToDashboard />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Sorteio de Times</h2>
            <Button onClick={generateTeams}>
              <Shuffle className="mr-2 h-4 w-4" />
              Sortear Times
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Jogadores Disponíveis</h3>
              <div className="space-y-2">
                {teamPlayers.map((player) => (
                  <div
                    key={player.id}
                    className={clsx(
                      "p-3 rounded-lg border",
                      getGuestHighlightClass(player.isGuest)
                    )}
                  >
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-gray-500">
                      {player.selectedPositions.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Times Formados</h3>
              {teams.length > 0 ? (
                <div className="space-y-4">
                  {teams.map((team, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border"
                    >
                      <h4 className="font-medium mb-2">Time {index + 1}</h4>
                      <div className="space-y-2">
                        {team.map((player) => (
                          <div
                            key={player.id}
                            className={clsx(
                              "p-2 rounded",
                              getGuestHighlightClass(player.isGuest)
                            )}
                          >
                            {player.name}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <Users className="mx-auto h-12 w-12 mb-4" />
                  <p>Nenhum time formado ainda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamDraw;
