import { useState } from "react";
import { Star, Check, Search, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Edit2, Save, Trash2 } from 'lucide-react';
import { usePlayerContext } from "@/context/PlayerContext";

type Rating = 1 | 2 | 3 | 4 | 5;

interface Player {
  id: number;
  name: string;
  rating: Rating;
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

interface PointRecord {
  points: number;
  date: string;
}

interface Statistic {
  name: string;
  date: string;
  attendanceCount: number;
  pointRecords: PointRecord[];
  lastUpdated: string;
}

export const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<"all" | Rating>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const { toast } = useToast();
  const { players: contextPlayers } = usePlayerContext();
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [editingRecord, setEditingRecord] = useState<{index: number, recordIndex: number} | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    const savedStats = contextPlayers.map(player => ({
      name: player.name,
      date: player.createdAt,
      attendanceCount: 0,
      pointRecords: [],
      lastUpdated: player.createdAt
    }));
    setStatistics(savedStats);
  }, [contextPlayers]);

  const handlePointsChange = (index: number, value: number) => {
    if (value < 0) {
      toast({
        title: "Erro",
        description: "Os pontos não podem ser negativos.",
        variant: "destructive",
      });
      return;
    }

    const newRecord = {
      points: value,
      date: new Date().toISOString(),
    };

    const updatedStatistics = [...statistics];
    updatedStatistics[index].pointRecords.push(newRecord);
    updatedStatistics[index].lastUpdated = new Date().toISOString();
    setStatistics(updatedStatistics);

    toast({
      title: "Sucesso",
      description: "Pontos atualizados com sucesso.",
      variant: "default",
    });
  };

  const filteredPlayers = players
    .filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((player) =>
      ratingFilter === "all" ? true : player.rating === ratingFilter
    )
    .sort((a, b) => {
      if (!sortOrder) return 0;
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    });

  const selectedCount = players.filter((player) => player.selected).length;

  const togglePlayer = (id: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  const toggleSort = () => {
    setSortOrder((prevSortOrder) => {
      const orders: ("asc" | "desc" | null)[] = [null, "asc", "desc"];
      const currentIndex = orders.indexOf(prevSortOrder);
      return orders[(currentIndex + 1) % orders.length];
    });
  };

  const handleRatingFilterChange = (value: string) => {
    setRatingFilter(value === "all" ? "all" : Number(value) as Rating);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
          <div className="flex gap-4">
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
            <Select 
              value={ratingFilter.toString()} 
              onValueChange={handleRatingFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    Nível {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={toggleSort}
              className={`p-2 rounded-lg transition-colors ${
                sortOrder ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
              } hover:bg-primary/20`}
              title="Ordenar por nível"
            >
              <ArrowUpDown className="h-5 w-5" />
            </button>
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
    </div>
  );
};