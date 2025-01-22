import { create } from 'zustand';
import { Tournament, Team, Match, Group } from '@/utils/types';
import { generateGroups, generateKnockoutMatches } from '@/utils/tournament';

interface TournamentState {
  tournament: Tournament | null;
  teams: Team[];
  groups: Group[];
  knockoutMatches: Match[];
  setTournament: (tournament: Tournament) => void;
  addTeam: (team: Team) => void;
  removeTeam: (teamId: string) => void;
  generateMatches: () => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  tournament: null,
  teams: [],
  groups: [],
  knockoutMatches: [],
  setTournament: (tournament) => set({ tournament }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  removeTeam: (teamId) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== teamId),
    })),
  generateMatches: () =>
    set((state) => {
      const groups = generateGroups(state.teams.map(team => team.name));
      const knockoutMatches = generateKnockoutMatches(state.teams);
      return { groups, knockoutMatches };
    }),
  updateMatch: (matchId, score1, score2) =>
    set((state) => {
      // Implementation for updating match scores
      // This would need to be implemented based on your specific requirements
      return state;
    }),
}));