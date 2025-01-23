import React from "react";
import { Star, Check, Search, ArrowUpDown, Edit2, Save, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import clsx from "clsx";

const PlayerList = () => {
  const { players, updatePlayer, removePlayer, editingPlayer, setEditingPlayer, editValue, setEditValue } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();

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

  const handleEdit = (id: number) => {
    setEditingPlayer({ id });
    const player = players.find((player) => player.id === id);
    if (player) {
      setEditValue(player.name);
    }
  };

  const handleSave = () => {
    if (editingPlayer !== null) {
      updatePlayer(editingPlayer.id, { name: editValue });
      setEditingPlayer(null);
      setEditValue('');
      toast({
        title: "Jogador Atualizado",
        description: "O nome do jogador foi atualizado com sucesso.",
      });
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

        <div className="space-y-4">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={getGuestHighlightClass(player.isGuest)}>
                <CardHeader>
                  <CardTitle>{player.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Apelido: {player.nickname}</p>
                    <p>Esporte: {player.sport}</p>
                    <p>Posições: {player.selectedPositions.join(", ")}</p>
                    <p>Avaliação: {player.rating}</p>
                    <p>Status: {player.isGuest ? "Convidado" : "Membro"}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => handleEdit(player.id)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button onClick={() => handleDelete(player.id)} variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerList;