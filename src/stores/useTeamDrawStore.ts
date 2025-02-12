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
  generateTeams: (players: Player[]) => { success: boolean; error?: string };
}

export const useTeamDrawStore = create<TeamDrawState>((set, get) => ({
  playersPerTeam: 5,
  teams: [],
  namingOption: "numeric",
  matchups: [],
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setMatchups: (matchups) => set({ matchups }),
  clearTeams: () => set({ teams: [] }),
  generateTeams: (players) => {
    const { playersPerTeam } = get();
    
    // Filter available players
    const availablePlayers = players.filter(p => p.includeInDraw && p.present);
    
    if (availablePlayers.length < playersPerTeam * 2) {
      return {
        success: false,
        error: `São necessários no mínimo ${playersPerTeam * 2} jogadores para formar times.`
      };
    }

    // Separate goalkeepers and field players
    const goalkeepers = availablePlayers.filter(p => 
      p.selectedPositions.includes("Goleiro")
    );
    const fieldPlayers = availablePlayers.filter(p => 
      !p.selectedPositions.includes("Goleiro")
    );

    // Shuffle players
    const shuffledFieldPlayers = [...fieldPlayers].sort(() => Math.random() - 0.5);
    const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);
    
    // Calculate number of teams
    const numTeams = Math.floor(availablePlayers.length / playersPerTeam);
    let newTeams: Player[][] = Array(numTeams).fill(null).map(() => []);

    // Distribute goalkeepers first
    shuffledGoalkeepers.forEach((goalkeeper, index) => {
      if (index < numTeams) {
        newTeams[index].push(goalkeeper);
      }
    });

    // Distribute remaining players
    let currentTeamIndex = 0;
    shuffledFieldPlayers.forEach(player => {
      while (newTeams[currentTeamIndex].length >= playersPerTeam) {
        currentTeamIndex = (currentTeamIndex + 1) % numTeams;
      }
      newTeams[currentTeamIndex].push(player);
      currentTeamIndex = (currentTeamIndex + 1) % numTeams;
    });

    set({ teams: newTeams });
    return { 
      success: true 
    };
  }
}));
