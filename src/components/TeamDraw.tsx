import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { Button } from "./ui/button";
import { Shuffle, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TeamNameSelector from "./TeamNameSelector"; // Componente para selecionar nomenclatura
import GenerateMatchupsButton from "./GenerateMatchupsButton"; // Componente para gerar confrontos
import MatchupTable from "./MatchupTable"; // Componente para mostrar confrontos
import ShareButtons from "./ShareButtons"; // Para compartilhar os confrontos


interface Player {
  id: number;
  name: string;
  rating: number;
  position: string;
}

const TeamDraw = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Player[][]>([]);
  const [playersPerTeam, setPlayersPerTeam] = useState(5);
  const [namingOption, setNamingOption] = useState("numeric"); // Nomenclatura dos times
  const [matchups, setMatchups] = useState<string[]>([]); // Confrontos gerados
  const { toast } = useToast();

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
      { id: 12, name: "Reinaldo", rating: 1, selected: true, position: "defensor"},
      { id: 13, name: "Ronaldo", rating: 5, selected: true, position: "atacante" },
      { id: 14, name: "Salah", rating: 4, selected: true, position: "atacante" },
      { id: 15, name: "Sergio Ramos", rating: 5, selected: true, position: "defensor" },
      { id: 16, name: "Thiago Silva", rating: 4, selected: true, position: "defensor" },
      { id: 17, name: "Van Dijk", rating: 5, selected: true, position: "defensor" },
      { id: 18, name: "Mbappé", rating: 5, selected: true, position: "atacante" },
      { id: 19, name: "Haaland", rating: 5, selected: true, position: "atacante" },
      { id: 20, name: "Kante", rating: 4, selected: true, position: "meio" },
      { id: 21, name: "De Bruyne", rating: 5, selected: true, position: "meio" },
      { id: 22, name: "Modric", rating: 5, selected: true, position: "meio" },
      { id: 23, name: "Kimmich", rating: 4, selected: true, position: "meio" },
      { id: 24, name: "Alisson", rating: 5, selected: true, position: "goleiro" },
      { id: 25, name: "Ederson", rating: 4, selected: true, position: "goleiro" },
      { id: 26, name: "Courtois", rating: 5, selected: true, position: "goleiro" },
      { id: 27, name: "Lewandowski", rating: 5, selected: true, position: "atacante" },
      { id: 28, name: "Benzema", rating: 4, selected: true, position: "atacante" },
      { id: 29, name: "Griezmann", rating: 4, selected: true, position: "atacante" },
      { id: 30, name: "Pique", rating: 4, selected: true, position: "defensor" },
      { id: 31, name: "Ramos", rating: 5, selected: true, position: "defensor" },
      { id: 32, name: "Busquets", rating: 4, selected: true, position: "meio" },
      { id: 33, name: "Jordi Alba", rating: 4, selected: true, position: "defensor" },
      { id: 34, name: "Gareth Bale", rating: 4, selected: true, position: "atacante" },
      { id: 35, name: "Lukaku", rating: 4, selected: true, position: "atacante" },
      { id: 36, name: "Son", rating: 4, selected: true, position: "atacante" },
      { id: 37, name: "Hakimi", rating: 4, selected: true, position: "defensor" },
      { id: 38, name: "Rashford", rating: 4, selected: true, position: "atacante" },
      { id: 39, name: "Verratti", rating: 4, selected: true, position: "meio" },
      { id: 40, name: "Rakitic", rating: 4, selected: true, position: "meio" },
      { id: 41, name: "Toni Kroos", rating: 5, selected: true, position: "meio" },
      { id: 42, name: "Pepe", rating: 4, selected: true, position: "defensor" },
      { id: 43, name: "Chiellini", rating: 5, selected: true, position: "defensor" },
      { id: 44, name: "Neymar Jr", rating: 5, selected: true, position: "atacante" },
      { id: 45, name: "Timo Werner", rating: 4, selected: true, position: "atacante" },
      { id: 46, name: "Sergio Busquets", rating: 4, selected: true, position: "meio" },
      { id: 47, name: "Pogba", rating: 5, selected: true, position: "meio" },
      { id: 48, name: "Marcelo", rating: 4, selected: true, position: "defensor" }
    ];
  
    // Filtra jogadores selecionados e remove goleiros
    const filteredPlayers = selectedPlayers.filter(player => player.selected && player.position !== "goleiro");
  
    setPlayers(filteredPlayers);
  }, []);
  
  const drawTeams = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const newTeams = [];
    for (let i = 0; i < shuffledPlayers.length; i += playersPerTeam) {
      newTeams.push(shuffledPlayers.slice(i, i + playersPerTeam));
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

      {/* Componente para escolher a nomenclatura dos times */}
      {teams.length > 0 && <TeamNameSelector onNameFormatChange={setNamingOption} />}
      
      {/* Botão para gerar confrontos */}
      {teams.length > 0 && <GenerateMatchupsButton onGenerate={generateMatchups} />}

      {/* Exibição da tabela de confrontos */}
      {matchups.length > 0 && <MatchupTable matchups={matchups} />}
      
      {/* Botões para compartilhar */}
      {matchups.length > 0 && <ShareButtons />}
    </div>
  );
};

export default TeamDraw;
