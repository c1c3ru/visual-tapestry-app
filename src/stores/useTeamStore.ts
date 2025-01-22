import { create } from 'zustand';

interface Player {
  id: number;
  name: string;
  rating: number;
  position: string;
  includeInDraw: boolean;
}

interface TeamState {
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

export const useTeamStore = create<TeamState>((set) => ({
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