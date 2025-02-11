
import { create } from 'zustand';
import { Player } from '@/utils/types';

interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  namingOption: string;
  matchups: string[];
  setMatchups: (matchups: string[]) => void;
  clearTeams: () => void;
}

export const useTeamDrawStore = create<TeamDrawState>((set) => ({
  playersPerTeam: 5,
  teams: [],
  namingOption: "numeric",
  matchups: [],
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setMatchups: (matchups) => set({ matchups }),
  clearTeams: () => set({ teams: [] }),
}));
