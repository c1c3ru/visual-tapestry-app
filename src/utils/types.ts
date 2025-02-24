// Tipos básicos melhorados
export enum SportEnum {
  FUTSAL = "futsal",
  FOOTBALL = "futebol",
  VOLLEYBALL = "volei",
  BASKETBALL = "basquete",
  HANDBALL = "handbol"
}

export enum PositionEnum {
  GOALKEEPER = "Goleiro",
  DEFENDER = "Defensor",
  MIDFIELDER = "Meio-campo",
  FORWARD = "Atacante"
}

export enum RatingEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

// Interface Player melhorada
export interface Player {
  id: string; 
  name: string;
  nickname: string;
  birthDate: Date; 
  isGuest: boolean;
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  rating: RatingEnum;
  includeInDraw: boolean;
  createdAt: Date;
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

// Estado do jogador com validação melhorada
export interface PlayerState {
  players: Player[];
  newPlayer: Omit<Player, 'id' | 'createdAt'>;
  errors: {
    name: { hasError: boolean; message: string };
    isGuest: { hasError: boolean; message: string };
    selectedPositions: { hasError: boolean; message: string };
    rating: { hasError: boolean; message: string };
  };
  editingPlayer: Player | null; 
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerState['errors']>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
}

// Torneio com tipagem discriminada
export type Tournament = 
  | {
      type: 'league';
      id: string;
      name: string;
      teams: Team[];
      matches: Match[];
    }
  | {
      type: 'worldCup';
      id: string;
      name: string;
      teams: Team[];
      groups: Group[];
      knockoutMatches: KnockoutMatches;
    }
  | {
      type: 'homeAway';
      id: string;
      name: string;
      teams: Team[];
      matches: Match[];
      isHomeGame: boolean;
    };

// Interfaces de partidas e times
export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  date: Date;
  location?: string;
}

export interface Group {
  name: string;
  teams: Team[];
  matches: Match[];
}

export interface KnockoutMatches {
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
  thirdPlace: Match;
}

export interface Team {
  id: string;
  name: string;
  responsible: string;
  players: Player[];
  rating: number;
}

// Estado do torneio com geração de matches
export interface TournamentState {
  tournamentName: string;
  tournamentType: Tournament['type'];
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  matches: Match[];
  
  generateGroups: () => Group[];
  generateKnockoutStage: (qualifiedTeams: Team[]) => KnockoutMatches;
  scheduleMatch: (team1: Team, team2: Team, date: Date) => Match;
  updateMatchResult: (matchId: string, score1: number, score2: number) => void;
}

// Sistema de estatísticas melhorado
export interface PlayerStatistics {
  playerId: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  averageRating: number;
  lastFiveRatings: RatingEnum[];
}

export interface TeamStatistics {
  teamId: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

// Sistema de configurações ampliado
export interface AppSettings {
  ratingSystem: 'stars' | 'numbers' | 'points';
  guestHighlight: 'color' | 'badge' | 'icon';
  matchDuration: number;
  maxPlayersPerTeam: number;
  pointsPerWin: number;
  pointsPerDraw: number;
}

// Exemplo de uso:
const newPlayer: Player = {
  id: crypto.randomUUID(),
  name: "João Silva",
  nickname: "JS",
  birthDate: new Date(2000, 0, 1),
  isGuest: false,
  sport: SportEnum.FOOTBALL,
  selectedPositions: [PositionEnum.FORWARD],
  rating: RatingEnum.FOUR,
  includeInDraw: true,
  createdAt: new Date(),
  selected: false,
  present: false,
  paid: false,
  registered: true
};

const worldCupTournament: Tournament = {
  type: 'worldCup',
  id: crypto.randomUUID(),
  name: "Copa 2024",
  teams: [],
  groups: [],
  knockoutMatches: {
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    final: {
      id: crypto.randomUUID(),
      team1: { id: '1', name: 'Time A', responsible: 'Coach A', players: [], rating: 0 },
      team2: { id: '2', name: 'Time B', responsible: 'Coach B', players: [], rating: 0 },
      date: new Date(2024, 6, 1)
    },
    thirdPlace: {
      id: crypto.randomUUID(),
      team1: { id: '3', name: 'Time C', responsible: 'Coach C', players: [], rating: 0 },
      team2: { id: '4', name: 'Time D', responsible: 'Coach D', players: [], rating: 0 },
      date: new Date(2024, 6, 1)
    }
  }
};