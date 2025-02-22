// Remove the conflicting import
// import { SportEnum } from './types';

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

// Adding Rating type alias for components that use it
export type Rating = RatingEnum;
export type Sport = SportEnum;

export interface Player {
  id: string;
  name: string;
  nickname: string;
  birthDate: string; // Changed to string for easier form handling
  isGuest: boolean;
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  rating: RatingEnum;
  includeInDraw: boolean;
  createdAt: string; // Changed to string for consistency
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

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
  editValue?: string; // Added for PlayerList component
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerState['errors']>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
  setEditValue?: (value: string) => void; // Added for PlayerList component
}

export interface Team {
  id: string;
  name: string;
  responsible: string;
  players: Player[];
  rating: number;
  ranking?: number; // Made optional
  stats?: TeamStatistics; // Made optional
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
  birthDate: new Date(2000, 0, 1).toISOString(),
  isGuest: false,
  sport: SportEnum.FOOTBALL,
  selectedPositions: [PositionEnum.FORWARD],
  rating: RatingEnum.FOUR,
  includeInDraw: true,
  createdAt: new Date().toISOString(),
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

// Add missing types
export interface DashboardState {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

export interface StatisticsState {
  stats: PlayerStatistics[];
  teamStats: TeamStatistics[];
  updateStats: () => void;
}

export interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  generateTeams: (players: Player[]) => { success: boolean; error?: string };
}
