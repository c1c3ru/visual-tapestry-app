
import { create } from 'zustand';
import { PlayerState} from '@/utils/types';
import { SportEnum, RatingEnum } from '@/utils/enums';

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
    birthDate: new Date(),
    isGuest: false,
    sport: SportEnum.SOCCER,
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
      birthDate: new Date(),
      isGuest: false,
      sport: SportEnum.SOCCER,
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
  cancelPlayer: (id) => set((state) => ({
    players: state.players.filter((player) => player.id !== id),
  })),
  setPlayers: (players) => set({ players }),
  setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
  setEditValue: (editValue) => set({ editValue }),
}));
