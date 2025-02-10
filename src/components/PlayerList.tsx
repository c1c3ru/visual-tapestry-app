
import React from "react";
import { motion } from "framer-motion";
import BackToDashboard from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { useToast } from "@/hooks/use-toast";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { PlayerListContainer } from "./player/PlayerListContainer";

const PlayerList = () => {
  const { players, updatePlayer, removePlayer, editingPlayer, setEditingPlayer, editValue, setEditValue } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();

  const handleEdit = (id: number) => {
    const player = players.find((p) => p.id === id);
    if (player) {
      setEditingPlayer({ id });
      setEditValue(player.name);
    }
  };

  const handleDelete = (id: number) => {
    removePlayer(id);
    toast({
      title: "Jogador Removido",
      description: "O jogador foi removido com sucesso.",
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
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>

        <PlayerListContainer
          players={players}
          guestHighlight={guestHighlight}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </motion.div>
  );
};

export default PlayerList;
