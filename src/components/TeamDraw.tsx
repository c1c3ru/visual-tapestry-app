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
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

const TeamDraw = () => {
  const {
    players,
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

  const { toast } = useToast();
  const MAX_ATTEMPTS = 10;

  useEffect(() => {
    const savedPlayers = getFromLocalStorage('players') || [];
    setPlayers(savedPlayers);
  }, [setPlayers]);

  // Funções para manipular o estado dos jogadores e equipes...


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        {/* Conteúdo do componente TeamDraw */}
      </motion.div>

    </div>
  );
};

export default TeamDraw;