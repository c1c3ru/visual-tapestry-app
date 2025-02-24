
import { create } from 'zustand';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';
import { generateTournamentMatches, generateGroups, generateKnockoutMatches } from '@/utils/tournament';

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
  addTeam: (team: Team) => { success: boolean; error?: string };
  removeTeam: (id: string) => void;
  generateMatches: () => { success: boolean; error?: string };
}

export const useTournamentStore = create<TournamentState>((set, get) => ({
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
      if (tournamentType === 'worldCup') {
        const groups = generateGroups(teams);
        set({ groups, knockoutMatches: null });
      } else if (tournamentType === 'homeAway') {
        const knockoutMatches = generateKnockoutMatches(teams);
        set({ groups: [], knockoutMatches });
      } else {
        const matches = generateTournamentMatches(teams, tournamentType);
        set({ groups: [{ name: 'Liga', matches }], knockoutMatches: null });
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Erro ao gerar partidas. Tente novamente."
      };
    }
  },
}));
