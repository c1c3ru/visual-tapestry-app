import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { Button } from "./ui/button";
import { Shuffle, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TeamNameSelector from "./TeamNameSelector"; 
import GenerateMatchupsButton from "./GenerateMatchupsButton"; 
import MatchupTable from "./MatchupTable"; 
import ShareButtons from "./ShareButtons"; 
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

interface Player {
  id: number;
  name: string;
  rating: number;
  position: string;
  includeInDraw: boolean;
}

const TeamDraw = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [goalkeepers, setGoalkeepers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Player[][]>([]);
  const [playersPerTeam, setPlayersPerTeam] = useState(5);
  const [namingOption, setNamingOption] = useState("numeric"); 
  const [matchups, setMatchups] = useState<string[]>([]); 
  const { toast } = useToast();
  const MAX_ATTEMPTS = 10;

  useEffect(() => {
    const savedPlayers = getFromLocalStorage('players') || [];
    const filteredPlayers = savedPlayers.filter((p: Player) => p.includeInDraw);
    const filteredGoalkeepers = filteredPlayers.filter((p: Player) => 
      p.position === "goleiro" || p.position === "Goleiro"
    );
    const otherPlayers = filteredPlayers.filter((p: Player) => 
      p.position !== "goleiro" && p.position !== "Goleiro"
    );

    setGoalkeepers(filteredGoalkeepers);
    setPlayers(otherPlayers);
  }, []);

  const drawTeams = () => {
    setTeams([]);
    setMatchups([]);
    
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);
    
    const newTeams = [];
    let currentTeam = [];
    
    // Distribute goalkeepers first
    for (let i = 0; i < shuffledGoalkeepers.length; i++) {
      if (currentTeam.length === playersPerTeam) {
        newTeams.push(currentTeam);
        currentTeam = [];
      }
      currentTeam.push(shuffledGoalkeepers[i]);
    }
    
    // Then distribute other players
    for (let i = 0; i < shuffledPlayers.length; i++) {
      if (currentTeam.length === playersPerTeam) {
        newTeams.push(currentTeam);
        currentTeam = [];
      }
      currentTeam.push(shuffledPlayers[i]);
    }
    
    if (currentTeam.length > 0) {
      newTeams.push(currentTeam);
    }
    
    setTeams(newTeams);
  };

  const generateMatchups = () => {
    const newMatchups = [];
    for (let i = 0; i < teams.length; i += 2) {
      const teamA = `Time ${namingOption === "numeric" ? `0${i + 1}` : String.fromCharCode(65 + i)}`;
      const teamB = `Time ${namingOption === "numeric" ? `0${i + 2}` : String.fromCharCode(65 + i + 1)}`;
      newMatchups.push(`${teamA} vs ${teamB}`);
    }
    setMatchups(newMatchups);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackToDashboard />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Sorteio de Times</h1>
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
                  {namingOption === "numeric" ? `Time ${teamIndex + 1}` : `Time ${String.fromCharCode(65 + teamIndex)}`}
                </h2>
                {team.length < playersPerTeam && (
                  <div className="flex items-center text-yellow-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Time Incompleto
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Força total: {team.reduce((sum, player) => sum + player.rating, 0)}
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
                    <span className="text-xs text-gray-500 capitalize">{player.position}</span>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < player.rating ? "text-primary" : "text-gray-300"}`}
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

      {teams.length > 0 && (
        <TeamNameSelector 
          onNameFormatChange={setNamingOption} 
          value={namingOption}
        />
      )}
      
      {teams.length > 0 && <GenerateMatchupsButton onGenerate={generateMatchups} />}

      {matchups.length > 0 && <MatchupTable matchups={matchups} />}
      
      {matchups.length > 0 && <ShareButtons />}
    </div>
  );
};

export default TeamDraw;