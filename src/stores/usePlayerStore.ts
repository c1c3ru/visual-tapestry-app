import { create } from 'zustand';
import { Player } from '@/utils/types';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';

interface PlayerState {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  setPlayers: (players: Player[]) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: getFromLocalStorage('players') || [],
  addPlayer: (player) => 
    set((state) => {
      const updatedPlayers = [...state.players, player];
      saveToLocalStorage('players', updatedPlayers);
      return { players: updatedPlayers };
    }),
  updatePlayer: (id, updatedPlayer) =>
    set((state) => {
      const updatedPlayers = state.players.map((player) =>
        player.id === id ? { ...player, ...updatedPlayer } : player
      );
      saveToLocalStorage('players', updatedPlayers);
      return { players: updatedPlayers };
    }),
  removePlayer: (id) =>
    set((state) => {
      const updatedPlayers = state.players.filter((player) => player.id !== id);
      saveToLocalStorage('players', updatedPlayers);
      return { players: updatedPlayers };
    }),
  setPlayers: (players) => {
    saveToLocalStorage('players', players);
    set({ players });
  },
}));