import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';

interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  editingPlayer: { id: number } | null;
  setEditingPlayer: (player: { id: number } | null) => void;
  editValue: string;
  setEditValue: (value: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<{ id: number } | null>(null);
  const [editValue, setEditValue] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  const savePlayersToLocalStorage = (updatedPlayers: Player[]) => {
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const addPlayer = (player: Player) => {
    const updatedPlayers = [...players, player];
    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);
    toast({
      title: "Jogador Adicionado",
      description: "O jogador foi adicionado com sucesso.",
    });
  };

  const updatePlayer = (id: number, updatedPlayer: Partial<Player>) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, ...updatedPlayer } : player
    );
    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);
  };

  const removePlayer = (id: number) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        addPlayer,
        updatePlayer,
        removePlayer,
        editingPlayer,
        setEditingPlayer,
        editValue,
        setEditValue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};