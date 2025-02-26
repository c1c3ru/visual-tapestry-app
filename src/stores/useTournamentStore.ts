
import { create } from 'zustand';
import { Team, Group, KnockoutMatches, Match } from '@/utils/types';
import { generateTournamentMatches, generateGroups, generateKnockoutMatches } from '@/utils/tournament';
import { TournamentType } from '@/utils/enums';

export interface TournamentState {
  tournamentName: string;
  tournamentType: 'Liga' | 'Copa' | 'Mata-mata';
  teamName: string;
  responsible: string;
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  matches: Match[];
  setTournamentName: (name: string) => void;
  setTournamentType: (type: 'Liga' | 'Copa' | 'Mata-mata') => void;
  setTeamName: (name: string) => void;
  setResponsible: (name: string) => void;
  addTeam: (team: Team) => { success: boolean; error?: string };
  removeTeam: (id: string) => void;
  generateMatches: () => { success: boolean; error?: string };
  generateGroups: (teams: Team[]) => void;
  generateKnockoutStage: (teams: Team[]) => void;
  scheduleMatch: (match: Match) => void;
  updateMatchResult: (match: Match) => void;
}

export const useTournamentStore = create<TournamentState>((set, get) => ({
  tournamentName: '',
  tournamentType: TournamentType.LEAGUE,
  teamName: '',
  responsible: '',
  teams: [],
  groups: [],
  knockoutMatches: null,
  matches: [],
  setTournamentName: (name) => set({ tournamentName: name }),
  setTournamentType: (type: TournamentType) => set({ tournamentType: type }),
  setTeamName: (name) => set({ teamName: name }),
  setResponsible: (name) => set({ responsible: name }),
  addTeam: (team) => {
    const { teams } = get();
    const teamExists = teams.some(t => t.name.toLowerCase() === team.name.toLowerCase());
    
    if (teamExists) {
      return {
        success: false,
        error: "Já existe um time com este nome."
      };
    }

    set((state) => ({ teams: [...state.teams, team] }));
    return { success: true };
  },
  removeTeam: (id) => set((state) => ({ teams: state.teams.filter((team) => team.id !== id) })),
  generateMatches: () => {
    const { teams, tournamentType } = get();

    if (teams.length < 4) {
      return {
        success: false,
        error: "Mínimo de 4 times necessário para gerar partidas."
      };
    }

    if (teams.length > 64) {
      return {
        success: false,
        error: "Máximo de 64 times permitido."
      };
    }

    try {
      if (tournamentType === 'Copa') {
        const groups = generateGroups(teams);
        set({ groups, knockoutMatches: null });
      } else if (tournamentType === 'Mata-mata') {
        const knockoutMatches = generateKnockoutMatches(teams);
        set({ groups: [], knockoutMatches });
      } else {
        const matches = generateTournamentMatches(teams, TournamentType.LEAGUE);
        set({ groups: [{ id: 'Liga', name: 'Liga', matches, teams }], knockoutMatches: null });
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Erro ao gerar partidas. Tente novamente."
      };
    }
  },
  generateGroups: (teams) => {
    const groups = generateGroups(teams);
    set({ groups });
  },
  generateKnockoutStage: (teams) => {
    const knockoutMatches = generateKnockoutMatches(teams);
    set({ knockoutMatches });
  },
  scheduleMatch: (match) => {
    set((state) => ({ matches: [...state.matches, match] }));
  },
  updateMatchResult: (match) => {
    set((state) => ({
      matches: state.matches.map((m) => (m.id === match.id ? match : m)),
    }));
  },
}));
