
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
    
    // Filtrar apenas jogadores disponíveis
    const availablePlayers = players.filter(p => p.includeInDraw && p.present);
    
    if (availablePlayers.length < playersPerTeam * 2) {
      return {
        success: false,
        error: `São necessários no mínimo ${playersPerTeam * 2} jogadores para formar times.`
      };
    }

    // Separar goleiros e jogadores de linha
    const goalkeepers = availablePlayers.filter(p => 
      p.selectedPositions.includes("Goleiro")
    );
    const fieldPlayers = availablePlayers.filter(p => 
      !p.selectedPositions.includes("Goleiro")
    );

    // Verificar se há goleiros suficientes
    const numTeams = Math.floor(availablePlayers.length / playersPerTeam);
    if (goalkeepers.length < numTeams) {
      return {
        success: false,
        error: `São necessários pelo menos ${numTeams} goleiros para formar ${numTeams} times.`
      };
    }

    // Ordenar jogadores por rating para distribuição equilibrada
    const sortedFieldPlayers = [...fieldPlayers].sort((a, b) => b.rating - a.rating);
    const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);
    
    if (numTeams < 2) {
      return {
        success: false,
        error: "Número insuficiente de jogadores para formar times"
      };
    }
    
    // Inicializar times vazios
    let newTeams: Player[][] = Array(numTeams).fill(null).map(() => []);

    // Distribuir goleiros primeiro
    shuffledGoalkeepers.forEach((goalkeeper, index) => {
      if (index < numTeams) {
        newTeams[index].push(goalkeeper);
      }
    });

    // Distribuir jogadores de linha usando método "serpentina" para equilibrar os times
    let goingForward = true;
    sortedFieldPlayers.forEach((player, index) => {
      if (goingForward) {
        const teamIndex = index % numTeams;
        if (newTeams[teamIndex].length < playersPerTeam) {
          newTeams[teamIndex].push(player);
        }
      } else {
        const teamIndex = numTeams - 1 - (index % numTeams);
        if (newTeams[teamIndex].length < playersPerTeam) {
          newTeams[teamIndex].push(player);
        }
      }
      // Alternar direção a cada rodada completa
      if ((index + 1) % numTeams === 0) {
        goingForward = !goingForward;
      }
    });

    // Calcular e verificar equilíbrio dos times
    const teamStrengths = newTeams.map(team => ({
      strength: team.reduce((acc, player) => acc + player.rating, 0) / team.length,
      numPlayers: team.length
    }));

    const maxStrength = Math.max(...teamStrengths.map(t => t.strength));
    const minStrength = Math.min(...teamStrengths.map(t => t.strength));
    
    // Se a diferença de força for muito grande, tentar rebalancear
    if (maxStrength - minStrength > 1) {
      // Reordenar times para equilibrar forças
      newTeams = balanceTeams(newTeams);
    }

    set({ teams: newTeams });
    return { 
      success: true 
    };
  }
}));

// Função auxiliar para balancear times
const balanceTeams = (teams: Player[][]): Player[][] => {
  const calculateTeamStrength = (team: Player[]) => 
    team.reduce((acc, player) => acc + player.rating, 0) / team.length;

  // Tentar trocar jogadores entre times para equilibrar
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const strengthDiff = Math.abs(
        calculateTeamStrength(teams[i]) - calculateTeamStrength(teams[j])
      );

      if (strengthDiff > 1) {
        // Tentar trocar jogadores não goleiros
        const team1Players = teams[i].filter(p => !p.selectedPositions.includes("Goleiro"));
        const team2Players = teams[j].filter(p => !p.selectedPositions.includes("Goleiro"));

        for (const player1 of team1Players) {
          for (const player2 of team2Players) {
            // Simular troca
            const newTeam1 = [...teams[i]].map(p => p.id === player1.id ? player2 : p);
            const newTeam2 = [...teams[j]].map(p => p.id === player2.id ? player1 : p);

            const newStrengthDiff = Math.abs(
              calculateTeamStrength(newTeam1) - calculateTeamStrength(newTeam2)
            );

            // Se a troca melhorar o equilíbrio, aplicar
            if (newStrengthDiff < strengthDiff) {
              teams[i] = newTeam1;
              teams[j] = newTeam2;
              break;
            }
          }
        }
      }
    }
  }

  return teams;
};
