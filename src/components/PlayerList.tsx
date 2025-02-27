
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayerCard } from "@/components/player/PlayerCard";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerListContainer } from "./player/PlayerListContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Plus, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { springConfig } from '../utils/animations';
import { useToast } from "@/hooks/use-toast";

const PlayerList = () => {
  const { players, updatePlayer, removePlayer, setEditingPlayer, editingPlayer, editValue, setEditValue } = usePlayerStore();
  const { ratingSystem, guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterGuests, setFilterGuests] = useState<boolean | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleEdit = (id: string) => {
    const player = players.find(p => p.id === id);
    if (player) {
      setEditingPlayer(player);
      setEditValue(player.name);
    }
  };

  const handleDelete = (id: string) => {
    removePlayer(id);
    toast({
      title: "Jogador removido",
      description: "O jogador foi removido com sucesso."
    });
  };

  const handleEditSave = (id: string, newValue: string) => {
    updatePlayer(id, { name: newValue });
    setEditingPlayer(null);
    toast({
      title: "Jogador atualizado",
      description: "O nome do jogador foi atualizado com sucesso."
    });
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (player.nickname && player.nickname.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGuestFilter = filterGuests === null || player.isGuest === filterGuests;

    return matchesSearch && matchesGuestFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar jogadores..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={toggleFilters}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                  <Link to="/player/new">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Jogador
                    </Button>
                  </Link>
                </div>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Status</h3>
                        <div className="flex gap-2">
                          <Button
                            variant={filterGuests === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterGuests(null)}
                          >
                            Todos
                          </Button>
                          <Button
                            variant={filterGuests === false ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterGuests(false)}
                          >
                            Registrados
                          </Button>
                          <Button
                            variant={filterGuests === true ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterGuests(true)}
                          >
                            Convidados
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="min-h-[600px]">
          <PlayerListContainer 
            players={filteredPlayers}
            guestHighlight={guestHighlight}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editingPlayer={editingPlayer}
            editValue={editValue}
            onEditSave={handleEditSave}
            setEditValue={setEditValue}
          >
            {filteredPlayers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <p className="text-gray-500 mb-4">
                  Nenhum jogador encontrado. Tente ajustar os filtros ou adicione
                  novos jogadores.
                </p>
                <Link to="/player/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Jogador
                  </Button>
                </Link>
              </motion.div>
            )}
          </PlayerListContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerList;
