import { create } from 'zustand';
import { generateGroups, generateKnockoutMatches } from '@/utils/tournament';
import { TournamentState, Team } from '@/types/types';

export const useTournamentStore = create<TournamentState>((set) => ({
  tournament: null,
  teams: [],
  groups: [],
  knockoutMatches: null,
  name: '',
  type: 'league',
  matches: [],

  // Métodos para manipular o estado
  setTournament: (tournament) => set({ tournament }),

  setTournamentName: (name) => set({ name }),

  setTournamentType: (type: 'league' | 'worldCup' | 'homeAway') => set({ type }),


  addTeam: (team) =>
    set((state) => ({ teams: [...state.teams, team] })),

  editTeam: (id, updatedTeam) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === id ? { ...team, ...updatedTeam } : team
      ),
    })),

  removeTeam: (id) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== id),
    })),

  generateMatches: (teams, type) =>
    set((state) => {
      const groups = generateGroups(teams.map((team) => team.name));
      const knockoutMatches = type === 'worldCup' ? generateKnockoutMatches(teams) : null;
      return { ...state, groups, knockoutMatches };
    }),

  updateMatch: (matchId, score1, score2) =>
    set((state) => ({
      matches: state.matches.map((match) =>
        match.id === matchId ? { ...match, score1, score2 } : match
      ),
    })),
}));
