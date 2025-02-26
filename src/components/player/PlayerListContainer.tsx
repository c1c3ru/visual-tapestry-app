import { motion, AnimatePresence } from "framer-motion";
import { PlayerCard } from "./PlayerCard";
import { Player } from "@/utils/types";
import { AlertCircle } from "lucide-react";
import { springConfig } from '../../utils/animations';


interface PlayerListContainerProps {
  players: Player[];
  guestHighlight: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  editingPlayer: Player | null;
  editValue: string;
  onEditSave: (id: string, newValue: string) => void;
  setEditValue: (value: string) => void;
  onEditPlayer: (id: string) => void;
  onCancelEdit: () => void;
  onUpdatePlayer: (id: string, newValue: string) => void;
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      aria-label="Lista de jogadores"
    >
      <AnimatePresence mode="popLayout">
        {players.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center p-8 text-center text-gray-500"
          >
            <AlertCircle className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-lg">Nenhum jogador cadastrado</p>
          </motion.div>
        ) : (
          players.map((player, index) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ ...springConfig, delay: index * 0.05 }}
              className="hover:shadow-sm transition-shadow"
              role="listitem"
              aria-labelledby={`player-${player.id}-name`}
            >
              <PlayerCard
                player={player}
                guestHighlight={guestHighlight}
                onEdit={() => onEdit(player.id.toString())}
                onDelete={() => onDelete(player.id.toString())}
                isEditing={editingPlayer?.id === player.id}
                editValue={editValue}
                onEditSave={(newValue) => onEditSave(player.id.toString(), newValue)}
                setEditValue={setEditValue}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};