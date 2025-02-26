
import React, { createContext, useContext, useState, useEffect } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { Player } from "@/utils/types";

interface PlayerContextProps {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

interface PlayerProviderProps {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    // Initialize with proper type casting and key
    const savedPlayers = getFromLocalStorage<Player[]>("players", []);
    return savedPlayers;
  });

  useEffect(() => {
    saveToLocalStorage("players", players);
  }, [players]);

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };

  const updatePlayer = (id: string, updatedPlayer: Partial<Player>) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === id ? { ...player, ...updatedPlayer } : player
      )
    );
  };

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
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
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
