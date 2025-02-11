
import React from "react";
import { motion } from "framer-motion";
import { PlayerCard } from "./PlayerCard";
import { Player } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlayerListContainerProps {
  players: Player[];
  guestHighlight: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  editingPlayer: { id: number } | null;
  editValue: string;
  onEditSave: (id: number, newValue: string) => void;
  setEditValue: (value: string) => void;
}

export const PlayerListContainer = ({ 
  players, 
  guestHighlight, 
  onEdit, 
  onDelete,
  editingPlayer,
  editValue,
  onEditSave,
  setEditValue
}: PlayerListContainerProps) => {
  return (
    <div className="space-y-4">
      {players.map((player) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlayerCard
            player={player}
            guestHighlight={guestHighlight}
            onEdit={onEdit}
            onDelete={onDelete}
            isEditing={editingPlayer?.id === player.id}
            editValue={editValue}
            onEditSave={onEditSave}
            setEditValue={setEditValue}
          />
        </motion.div>
      ))}
    </div>
  );
};
