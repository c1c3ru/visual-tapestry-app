import { create } from 'zustand';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';
import { generateTournamentMatches, generateGroups, generateKnockoutMatches } from '@/utils/tournament';
import { useToast } from '@/hooks/use-toast';

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
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  removeTeam: (id) => set((state) => ({ teams: state.teams.filter((team) => team.id !== id) })),
  generateMatches: () => {
    const { teams, tournamentType } = get();
    const toast = useToast();

    if (teams.length < 4) {
      toast.toast({
        title: "Erro",
        description: "Mínimo de 4 times necessário para gerar partidas.",
        variant: "destructive"
      });
      return;
    }

    if (teams.length > 64) {
      toast.toast({
        title: "Erro",
        description: "Máximo de 64 times permitido.",
        variant: "destructive"
      });
      return;
    }

    if (tournamentType === 'worldCup') {
      const groups = generateGroups(teams);
      set({ groups });
    } else if (tournamentType === 'homeAway') {
      const knockoutMatches = generateKnockoutMatches(teams);
      set({ knockoutMatches });
    } else {
      const matches = generateTournamentMatches(teams, tournamentType);
      set({ groups: [{ name: 'Liga', matches }] });
    }

    toast.toast({
      title: "Sucesso",
      description: "Partidas geradas com sucesso!",
    });
  },
}));