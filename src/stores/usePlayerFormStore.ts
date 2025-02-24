
import { create } from 'zustand';
import { Player, SportEnum, PlayerState, RatingEnum } from '@/utils/types';

const initialErrors = {
  name: { hasError: false, message: '' },
  isGuest: { hasError: false, message: '' },
  selectedPositions: { hasError: false, message: '' },
  rating: { hasError: false, message: '' }
};

export const usePlayerFormStore = create<PlayerState>((set) => ({
  newPlayer: {
    name: "",
    nickname: "",
    birthDate: "",
    isGuest: false,
    sport: SportEnum.FOOTBALL,
    selectedPositions: [],
    rating: RatingEnum.ONE,
    includeInDraw: false,
    present: false,
    paid: false,
    registered: true,
    selected: false,
  },
  errors: initialErrors,
  players: [],
  editingPlayer: null,
  editValue: '',
  addPlayer: (player) => set((state) => ({ 
    players: [...state.players, player] 
  })),
  setNewPlayer: (player) => set((state) => ({
    newPlayer: { ...state.newPlayer, ...player }
  })),
  setErrors: (errors) => set((state) => ({
    errors: { ...state.errors, ...errors }
  })),
  resetForm: () => set({
    newPlayer: {
      name: "",
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: SportEnum.FOOTBALL,
      selectedPositions: [],
      rating: RatingEnum.ONE,
      includeInDraw: false,
      present: false,
      paid: false,
      registered: true,
      selected: false,
    },
    errors: initialErrors,
  }),
  updatePlayer: (id, updatedPlayer) => set((state) => ({
    players: state.players.map((player) =>
      player.id === id ? { ...player, ...updatedPlayer } : player
    ),
  })),
  removePlayer: (id) => set((state) => ({
    players: state.players.filter((player) => player.id !== id),
  })),
  setPlayers: (players) => set({ players }),
  setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
  setEditValue: (editValue) => set({ editValue }),
}));
