
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

    // Embaralhar jogadores
    const shuffledFieldPlayers = [...fieldPlayers].sort(() => Math.random() - 0.5);
    const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);
    
    // Calcular número de times possíveis
    const numTeams = Math.floor(availablePlayers.length / playersPerTeam);
    
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

    // Distribuir jogadores de linha de forma equilibrada
    let currentTeamIndex = 0;
    const maxPlayersPerTeam = Math.floor(availablePlayers.length / numTeams);

    shuffledFieldPlayers.forEach(player => {
      // Encontrar o time com menos jogadores
      currentTeamIndex = newTeams.findIndex(team => team.length < maxPlayersPerTeam);
      if (currentTeamIndex === -1) {
        currentTeamIndex = 0; // Voltar ao primeiro time se necessário
      }
      
      newTeams[currentTeamIndex].push(player);
    });

    // Verificar se todos os times têm número similar de jogadores
    const minPlayers = Math.min(...newTeams.map(team => team.length));
    const maxPlayers = Math.max(...newTeams.map(team => team.length));
    
    if (maxPlayers - minPlayers > 1) {
      // Reequilibrar times se necessário
      const rebalancedTeams = newTeams.map(team => {
        if (team.length > minPlayers + 1) {
          // Mover jogadores excedentes para times com menos jogadores
          const excessPlayers = team.slice(minPlayers + 1);
          team = team.slice(0, minPlayers + 1);
          
          excessPlayers.forEach(player => {
            const smallestTeam = newTeams.find(t => t.length < minPlayers + 1);
            if (smallestTeam) {
              smallestTeam.push(player);
            }
          });
        }
        return team;
      });
      
      newTeams = rebalancedTeams;
    }

    set({ teams: newTeams });
    return { 
      success: true 
    };
  }
}));
