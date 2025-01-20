import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Check, DollarSign, UserCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

interface Player {
  id: number;
  name: string;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

const PresenceList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedPlayers = getFromLocalStorage('presenceList') || [];
    setPlayers(savedPlayers);
  }, []);

  const savePlayersToStorage = (updatedPlayers: Player[]) => {
    saveToLocalStorage('presenceList', updatedPlayers);
    setPlayers(updatedPlayers);
  };

  const togglePresence = (id: number) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, present: !player.present } : player
    );
    
    savePlayersToStorage(updatedPlayers);

    toast({
      title: "Presença atualizada",
      description: "Status de presença foi atualizado com sucesso.",
    });
  };

  const togglePayment = (id: number) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, paid: !player.paid } : player
    );
    
    savePlayersToStorage(updatedPlayers);

    toast({
      title: "Pagamento atualizado",
      description: "Status de pagamento foi atualizado com sucesso.",
    });
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const playerExists = players.find(
      (player) => player.name.toLowerCase() === newPlayerName.trim().toLowerCase()
    );

    if (playerExists) {
      toast({
        title: "Erro",
        description: "Jogador já está cadastrado.",
        variant: "destructive",
      });
      return;
    }

    const newPlayer = {
      id: Date.now(),
      name: newPlayerName.trim(),
      present: false,
      paid: false,
      registered: true
    };

    const updatedPlayers = [...players, newPlayer];
    savePlayersToStorage(updatedPlayers);
    
    setNewPlayerName('');
    toast({
      title: "Jogador Adicionado",
      description: "Novo jogador foi adicionado com sucesso.",
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
        
        <form onSubmit={handleAddPlayer} className="mb-8">
          <div className="flex gap-4">
            <Input
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Digite o nome do novo jogador..."
              className="flex-1"
            />
            <Button type="submit">
              Adicionar Jogador
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <UserCheck className={`h-5 w-5 ${player.registered ? 'text-primary' : 'text-gray-400'}`} />
                <span className="font-medium text-gray-800">{player.name}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign className={`h-5 w-5 ${player.paid ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm ${player.paid ? 'text-green-500' : 'text-red-500'}`}>
                    {player.paid ? 'Pago' : 'Pendente'}
                  </span>
                </div>
                
                <button
                  onClick={() => togglePresence(player.id)}
                  disabled={!player.registered}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    player.present
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } ${!player.registered && 'opacity-50 cursor-not-allowed'}`}
                >
                  {player.present ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Presente</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4" />
                      <span>Ausente</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PresenceList;