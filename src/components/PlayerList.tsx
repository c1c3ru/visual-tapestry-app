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


type Rating = 1 | 2 | 3 | 4 | 5;

const PlayerList = () => {
  const { players, updatePlayer, removePlayer, editingPlayer, setEditingPlayer, editValue, setEditValue } = usePlayerStore();
  const { toast } = useToast();

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
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>

        <div className="space-y-4">
          {players.map((player) => (
            <Card key={player.id}>
              <CardHeader>
                <CardTitle>{player.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rating: {player.rating}</p>
                <p>Selected: {player.selected ? "Yes" : "No"}</p>
                <div className="space-y-2">
                  {editingPlayer?.id === player.id ? (
                    <>
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(player.id)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleDelete(player.id)} variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerList;