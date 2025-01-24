import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Player, Rating } from "@/utils/types";

interface AddPlayerFormProps {
  onAddPlayer: (player: Player) => void;
  players: Player[];
}

export const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAddPlayer, players }) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newPlayerName = form.elements.newPlayerName.value.trim();
    
    if (!newPlayerName) {
      toast({
        title: "Erro",
        description: "O nome do jogador não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    const playerExists = players.find(
      (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
    );

    if (playerExists) {
      toast({
        title: "Erro",
        description: "Jogador já está cadastrado.",
        variant: "destructive",
      });
      return;
    }

    const newPlayer: Player = {
      id: Date.now(),
      name: newPlayerName,
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: "",
      selectedPositions: [],
      rating: 1 as Rating,
      includeInDraw: false,
      createdAt: new Date().toISOString(),
      present: false,
      paid: false,
      registered: true,
      selected: false,
    };

    onAddPlayer(newPlayer);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <Input
          name="newPlayerName"
          placeholder="Digite o nome do novo jogador..."
          className="flex-1"
        />
        <Button type="submit">Adicionar Jogador</Button>
      </div>
    </form>
  );
};