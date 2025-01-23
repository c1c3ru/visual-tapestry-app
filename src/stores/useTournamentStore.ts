import {create} from 'zustand';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';

interface TournamentState {
  tournamentName: string;
  tournamentType: 'league' | 'worldCup' | 'homeAway';
  teamName: string;
  responsible: string;
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: 'league' | 'worldCup' | 'homeAway') => void;
  setTeamName: (name: string) => void;
  setResponsible: (name: string) => void;
  addTeam: (team: Team) => void;
  removeTeam: (id: string) => void;
  generateMatches: () => void;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  tournamentName: '',
  tournamentType: 'league',
  teamName: '',
  responsible: '',
  teams: [],
  groups: [],
  knockoutMatches: null,
  setTournamentName: (name) => set({ tournamentName: name }),
  setTournamentType: (type) => set({ tournamentType: type }),
  setTeamName: (name) => set({ teamName: name }),
  setResponsible: (name) => set({ responsible: name }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  removeTeam: (id) => set((state) => ({ teams: state.teams.filter((team) => team.id !== id) })),
  generateMatches: () => {
    // Implementar a lógica para gerar partidas
  },
}));