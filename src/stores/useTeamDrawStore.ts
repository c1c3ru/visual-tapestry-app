
import { create } from 'zustand';
import { Player } from '@/utils/types';
import { PositionEnum } from '@/utils/enums';

interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  namingOption: string;
  matchups: string[];
  setMatchups: (matchups: string[]) => void;
  clearTeams: () => void;
  generateTeams: (players: Player[], playersPerTeam?: number) => { success: boolean; error?: string };
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
  generateTeams: (players, playersPerTeamOverride) => {
    const { playersPerTeam } = get();
    const actualPlayersPerTeam = playersPerTeamOverride || playersPerTeam;
    
    console.log(`Generating teams with ${actualPlayersPerTeam} players per team`);
    
    // Filtrar apenas jogadores disponíveis
    const availablePlayers = players.filter(p => p.includeInDraw && p.present);
    console.log(`Available players: ${availablePlayers.length}`);
    
    if (availablePlayers.length < actualPlayersPerTeam * 2) {
      return {
        success: false,
        error: `São necessários no mínimo ${actualPlayersPerTeam * 2} jogadores para formar times.`
      };
    }

    // Separar goleiros e jogadores de linha
    const goalkeepers = availablePlayers.filter(p => 
      p.selectedPositions.includes(PositionEnum.GOALKEEPER)
    );
    const fieldPlayers = availablePlayers.filter(p => 
      !p.selectedPositions.includes(PositionEnum.GOALKEEPER)
    );

    console.log(`Goalkeepers: ${goalkeepers.length}, Field Players: ${fieldPlayers.length}`);

    // Calcular número de times
    const numTeams = Math.floor(availablePlayers.length / actualPlayersPerTeam);
    console.log(`Number of teams: ${numTeams}`);
    
    // Verificar se há goleiros suficientes - só se houver goleiros no jogo
    if (goalkeepers.length > 0 && goalkeepers.length < numTeams) {
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

    // Distribuir goleiros primeiro (se houver)
    if (goalkeepers.length > 0) {
      shuffledGoalkeepers.forEach((goalkeeper, index) => {
        if (index < numTeams) {
          newTeams[index].push(goalkeeper);
        }
      });
    }

    // Distribuir jogadores de linha usando método "serpentina" para equilibrar os times
    let goingForward = true;
    let currentIndex = 0;
    
    for (const player of sortedFieldPlayers) {
      // Determinar o índice do time baseado na direção atual
      let teamIndex;
      if (goingForward) {
        teamIndex = currentIndex % numTeams;
      } else {
        teamIndex = numTeams - 1 - (currentIndex % numTeams);
      }
      
      // Adicionar o jogador se o time não estiver completo
      if (newTeams[teamIndex].length < actualPlayersPerTeam) {
        newTeams[teamIndex].push(player);
        
        // Incrementar o índice
        currentIndex++;
        
        // Alternar direção a cada rodada completa
        if (currentIndex % numTeams === 0) {
          goingForward = !goingForward;
        }
      }
    }

    // Calcular equilíbrio dos times
    const teamStrengths = newTeams.map(team => ({
      strength: team.reduce((acc, player) => acc + player.rating, 0) / team.length,
      numPlayers: team.length
    }));

    console.log("Team strengths:", teamStrengths);

    // Verificar se todos os times têm o número adequado de jogadores
    const teamsWithNotEnoughPlayers = newTeams.filter(team => team.length < actualPlayersPerTeam);
    if (teamsWithNotEnoughPlayers.length > 0) {
      console.log(`Warning: ${teamsWithNotEnoughPlayers.length} teams have less than ${actualPlayersPerTeam} players`);
    }

    // Atualizar o state
    set({ teams: newTeams });
    return { 
      success: true 
    };
  }
}));
