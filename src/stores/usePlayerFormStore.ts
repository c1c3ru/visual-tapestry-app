import { create } from 'zustand';
import { Player, PlayerState, SportEnum } from '@/utils/types';

const initialState = {
  newPlayer: {
    name: "",
    nickname: "",
    birthDate: new Date().toISOString(),
    isGuest: false,
    sport: SportEnum.FOOTBALL,
    selectedPositions: [],
    rating: 3,
    includeInDraw: false,
    present: false,
    paid: false,
    registered: true,
    selected: false,
  },
  errors: {
    name: { hasError: false, message: '' },
    isGuest: { hasError: false, message: '' },
    selectedPositions: { hasError: false, message: '' },
    rating: { hasError: false, message: '' },
  },
  editingPlayer: null,
  editValue: '',
  players: [],
};

export const usePlayerFormStore = create<PlayerState>((set) => ({
  ...initialState,
  setNewPlayer: (player) => set((state) => ({
    newPlayer: { ...state.newPlayer, ...player },
  })),
  setErrors: (errors) => set((state) => ({
    errors: { ...state.errors, ...errors },
  })),
  resetForm: () => set({
    newPlayer: {
      name: "",
      nickname: "",
      birthDate: new Date().toISOString(),
      isGuest: false,
      sport: SportEnum.FOOTBALL,
      selectedPositions: [],
      rating: 3,
      includeInDraw: false,
      present: false,
      paid: false,
      registered: true,
      selected: false,
    },
    errors: {
      name: { hasError: false, message: '' },
      isGuest: { hasError: false, message: '' },
      selectedPositions: { hasError: false, message: '' },
      rating: { hasError: false, message: '' },
    },
  }),
  updatePlayer: (id, updatedPlayer) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id ? { ...player, ...updatedPlayer } : player
      ),
    })),
  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    })),
  setPlayers: (players) => set({ players }),
  setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
}));
