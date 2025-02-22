
import { create } from 'zustand';
import { Player } from '@/utils/types';

interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  generateTeams: (players: Player[]) => { success: boolean; error?: string };
}

export const useTeamDrawStore = create<TeamDrawState>((set) => ({
  playersPerTeam: 5,
  teams: [],
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (count) => set({ playersPerTeam: count }),
  generateTeams: (players) => {
    if (!players || players.length === 0) {
      return { success: false, error: "Nenhum jogador disponível" };
    }

    const { playersPerTeam } = useTeamDrawStore.getState();
    const availablePlayers = [...players];
    const numTeams = Math.floor(availablePlayers.length / playersPerTeam);

    if (numTeams < 2) {
      return {
        success: false,
        error: `São necessários no mínimo ${playersPerTeam * 2} jogadores para formar times.`
      };
    }

    // Separa goleiros dos demais jogadores
    const goalkeepers = availablePlayers.filter(p => 
      p.selectedPositions.includes("Goleiro")
    );
    const fieldPlayers = availablePlayers.filter(p => 
      !p.selectedPositions.includes("Goleiro")
    );

    // Verifica se há goleiros suficientes
    if (goalkeepers.length < numTeams) {
      return {
        success: false,
        error: `São necessários pelo menos ${numTeams} goleiros para formar ${numTeams} times.`
      };
    }

    // Ordena jogadores por rating
    const sortedFieldPlayers = [...fieldPlayers].sort((a, b) => b.rating - a.rating);
    const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);

    // Cria times vazios
    const teams: Player[][] = Array(numTeams).fill(null).map(() => []);

    // Distribui goleiros
    shuffledGoalkeepers.forEach((goalkeeper, index) => {
      if (index < numTeams) {
        teams[index].push(goalkeeper);
      }
    });

    // Distribui jogadores de linha usando método serpentina
    let currentTeam = 0;
    let direction = 1; // 1 para frente, -1 para trás

    sortedFieldPlayers.forEach((player) => {
      if (teams[currentTeam].length < playersPerTeam) {
        teams[currentTeam].push(player);
      }

      // Atualiza o índice do time atual
      if (direction === 1) {
        if (currentTeam === numTeams - 1) {
          direction = -1;
          currentTeam--;
        } else {
          currentTeam++;
        }
      } else {
        if (currentTeam === 0) {
          direction = 1;
          currentTeam++;
        } else {
          currentTeam--;
        }
      }
    });

    set({ teams });
    return { success: true };
  }
}));
