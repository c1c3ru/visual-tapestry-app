import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Player, SportEnum } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';

export interface AddPlayerFormProps {
  onAddPlayer: (player: Player) => void;
  players: Player[];
}

export const AddPlayerForm: FC<AddPlayerFormProps> = ({ onAddPlayer, players }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = newPlayerName.trim();

    if (!trimmedName) {
      toast({
        title: "Erro",
        description: "O nome do jogador não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    const isDuplicate = players.some(
      (player) => player.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      toast({
        title: "Erro",
        description: "Jogador já está cadastrado.",
        variant: "destructive",
      });
      return;
    }

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: trimmedName,
      nickname: "",
      birthDate: new Date().toISOString(),
      isGuest: false,
      sport: SportEnum.FOOTBALL,
      selectedPositions: [],
      rating: 3,
      includeInDraw: false,
      createdAt: new Date().toISOString(),
      present: true,
      paid: false,
      registered: true,
      selected: false,
    };

    onAddPlayer(newPlayer);
    setNewPlayerName('');
    toast({
      title: "Jogador adicionado",
      description: `${trimmedName} foi adicionado à lista.`,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        <motion.div
          key="input-field"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-grow"
        >
          <Input
            type="text"
            placeholder="Digite o nome do novo jogador..."
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Button type="submit">
          Adicionar Jogador
        </Button>
      </motion.div>
    </motion.form>
  );
};
