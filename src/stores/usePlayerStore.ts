import { create } from 'zustand';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { Player, Rating } from '@/utils/types';

interface PlayerState {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: getFromLocalStorage('players') || [
    { id: 1, name: "Bale", rating: 4, selected: true },
    { id: 2, name: "Betinho", rating: 1, selected: true },
    { id: 3, name: "Buffon", rating: 5, selected: true },
    { id: 4, name: "Coutinho", rating: 4, selected: true },
    { id: 5, name: "Ronaldinho", rating: 5, selected: true },
    { id: 6, name: "Dembele", rating: 3, selected: false },
    { id: 7, name: "Egídio", rating: 1, selected: true },
    { id: 8, name: "Messi", rating: 5, selected: true },
    { id: 9, name: "Ronaldo", rating: 5, selected: true },
    { id: 10, name: "Ronaldinho", rating: 5, selected: true },
    { id: 11, name: "Zidane", rating: 5, selected: true },
    { id: 12, name: "Redondo", rating: 4, selected: true },
    { id: 13, name: "Guardiola", rating: 4, selected: true },
    { id: 14, name: "R.Carlos", rating: 5, selected: true },
    { id: 15, name: "L.Figo", rating: 5, selected: true },
    { id: 16, name: "C.Ronaldo", rating: 5, selected: true },
    { id: 17, name: "Materazzi", rating: 3, selected: true },
  ],
  setPlayers: (players) => {
    saveToLocalStorage('players', players);
    set({ players });
  },
  updatePlayer: (id, updatedPlayer) =>
    set((state) => {
      const updatedPlayers = state.players.map((player) =>
        player.id === id ? { ...player, ...updatedPlayer } : player
      );
      saveToLocalStorage('players', updatedPlayers);
      return { players: updatedPlayers };
    }),
  addPlayer: (player) =>
    set((state) => {
      const updatedPlayers = [...state.players, player];
      saveToLocalStorage('players', updatedPlayers);
      return { players: updatedPlayers };
    }),
  removePlayer: (id) =>
    set((state) => {
      const updatedPlayers = state.players.filter((player) => player.id !== id);
      saveToLocalStorage('players', updatedPlayers);
      return { players: updatedPlayers };
    }),
}));