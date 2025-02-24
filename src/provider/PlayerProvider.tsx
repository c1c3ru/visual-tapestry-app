
import React, { createContext, useContext, useState } from 'react';
import { Player } from '@/utils/types';

interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  removePlayer: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);
  };

  const updatePlayer = (id: string, updates: Partial<Player>) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === id ? { ...player, ...updates } : player
      )
    );
  };

  const removePlayer = (id: string) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id));
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, updatePlayer, removePlayer }}>
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
