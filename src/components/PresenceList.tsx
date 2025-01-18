import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Check, DollarSign, UserCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Player {
  id: number;
  name: string;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

const PresenceList = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'João', present: true, paid: true, registered: true },
    { id: 2, name: 'Maria', present: false, paid: false, registered: true },
    { id: 3, name: 'Pedro', present: false, paid: true, registered: true },
  ]);
  
  const [newPlayerName, setNewPlayerName] = useState('');
  const { toast } = useToast();

  const togglePresence = (id: number) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, present: !player.present } : player
      )
    );

    toast({
      title: "Presença atualizada",
      description: "Status de presença foi atualizado com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const playerExists = players.find(
      player => player.name.toLowerCase() === newPlayerName.toLowerCase()
    );

    if (!playerExists) {
      toast({
        title: "Erro",
        description: "Jogador não encontrado. Por favor, verifique se está cadastrado.",
        variant: "destructive",
      });
      return;
    }

    setNewPlayerName('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lista de Presença</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <Input
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Digite seu nome..."
              className="flex-1"
            />
            <Button type="submit">
              Marcar Presença
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