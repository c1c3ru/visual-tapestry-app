import { useState } from "react";
import { Star, Check, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Player {
  id: number;
  name: string;
  rating: number;
  selected: boolean;
}

const initialPlayers: Player[] = [
  { id: 1, name: "Bale", rating: 4, selected: true },
  { id: 2, name: "Betinho", rating: 1, selected: true },
  { id: 3, name: "Buffon", rating: 5, selected: true },
  { id: 4, name: "Coutinho", rating: 4, selected: true },
  { id: 5, name: "Cristiano Ronaldo", rating: 5, selected: true },
  { id: 6, name: "Dembele", rating: 3, selected: false },
  { id: 7, name: "Egídio", rating: 1, selected: true },
  { id: 8, name: "Messi", rating: 5, selected: true },
  { id: 9, name: "Navas", rating: 3, selected: true },
  { id: 10, name: "Neymar", rating: 5, selected: true },
  { id: 11, name: "Pogba", rating: 4, selected: true },
  { id: 12, name: "Reinaldo", rating: 1, selected: true },
];

export const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = players.filter((player) => player.selected).length;

  const togglePlayer = (id: number) => {
    setPlayers(
      players.map((player) =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Time Equilibrado</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar jogador..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        {selectedCount} jogadores marcados
      </div>

      <div className="space-y-2">
        {filteredPlayers.map((player) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => togglePlayer(player.id)}
                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                  player.selected
                    ? "bg-primary text-white"
                    : "border-2 border-gray-300"
                }`}
              >
                {player.selected && <Check className="h-4 w-4" />}
              </button>
              <span className="text-gray-800 font-medium">{player.name}</span>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < player.rating
                      ? "text-primary fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};