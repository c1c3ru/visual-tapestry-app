import { create } from 'zustand';
import { Tournament, Team, Match, Group, KnockoutMatches } from '@/utils/types';
import { generateGroups, generateKnockoutMatches } from '@/utils/tournament';

interface TournamentState {
  tournament: Tournament | null;
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  setTournament: (tournament: Tournament) => void;
  addTeam: (team: Team) => void;
  removeTeam: (teamId: string) => void;
  generateMatches: (teams: Team[], type: 'league' | 'worldCup' | 'homeAway') => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  tournament: null,
  teams: [],
  groups: [],
  knockoutMatches: null,
  setTournament: (tournament) => set({ tournament }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  removeTeam: (teamId) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== teamId),
    })),
  generateMatches: (teams, type) =>
    set((state) => {
      if (type === 'worldCup') {
        return {
          ...state,
          groups: generateGroups(teams.map(team => team.name)),
          knockoutMatches: generateKnockoutMatches(teams)
        };
      }
      return {
        ...state,
        groups: generateGroups(teams.map(team => team.name)),
        knockoutMatches: null
      };
    }),
  updateMatch: (matchId, score1, score2) =>
    set((state) => {
      // Implementation for updating match scores
      return state;
    }),
}));