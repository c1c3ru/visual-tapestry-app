
import { create } from 'zustand';
import { Player, PlayerState, SportEnum } from '@/utils/types';

export const usePlayerFormStore = create<PlayerState>((set) => ({
  players: [],
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
    name: { hasError: false, message: "" },
    isGuest: { hasError: false, message: "" },
    selectedPositions: { hasError: false, message: "" },
    rating: { hasError: false, message: "" }
  },
  editingPlayer: null,
  setNewPlayer: (player) => set((state) => ({
    newPlayer: { ...state.newPlayer, ...player }
  })),
  setErrors: (errors) => set((state) => ({
    errors: { ...state.errors, ...errors }
  })),
  resetForm: () => set((state) => ({
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
      name: { hasError: false, message: "" },
      isGuest: { hasError: false, message: "" },
      selectedPositions: { hasError: false, message: "" },
      rating: { hasError: false, message: "" }
    }
  })),
  setEditingPlayer: (player) => set({ editingPlayer: player }),
  addPlayer: (player) => set((state) => ({
    players: [...state.players, player]
  })),
  updatePlayer: (id, updatedFields) => set((state) => ({
    players: state.players.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    )
  })),
  removePlayer: (id) => set((state) => ({
    players: state.players.filter((p) => p.id !== id)
  })),
  setPlayers: (players) => set({ players })
}));
