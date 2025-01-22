import { create } from 'zustand';
import { Tournament, Team, Match, Group } from '@/utils/types';

interface TournamentState {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  addTournament: (tournament: Tournament) => void;
  setCurrentTournament: (tournament: Tournament | null) => void;
  updateTournament: (id: string, updatedTournament: Partial<Tournament>) => void;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  tournaments: [],
  currentTournament: null,
  addTournament: (tournament) =>
    set((state) => ({
      tournaments: [...state.tournaments, tournament],
    })),
  setCurrentTournament: (tournament) =>
    set(() => ({
      currentTournament: tournament,
    })),
  updateTournament: (id, updatedTournament) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === id ? { ...tournament, ...updatedTournament } : tournament
      ),
    })),
}));