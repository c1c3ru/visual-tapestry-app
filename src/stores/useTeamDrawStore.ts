import { create } from 'zustand';
import { Player, Rating } from '@/types/types';



interface TeamDrawState {
  players: Player[];
  goalkeepers: Player[];
  teams: Player[][];
  playersPerTeam: number;
  namingOption: string;
  matchups: string[];
  setPlayers: (players: Player[]) => void;
  setGoalkeepers: (goalkeepers: Player[]) => void;
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (playersPerTeam: number) => void;
  setNamingOption: (namingOption: string) => void;
  setMatchups: (matchups: string[]) => void;
}

export const useTeamDrawStore = create<TeamDrawState>((set) => ({
  players: [],
  goalkeepers: [],
  teams: [],
  playersPerTeam: 5,
  namingOption: "numeric",
  matchups: [],
  setPlayers: (players) => set({ players }),
  setGoalkeepers: (goalkeepers) => set({ goalkeepers }),
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setNamingOption: (namingOption) => set({ namingOption }),
  setMatchups: (matchups) => set({ matchups }),
}));