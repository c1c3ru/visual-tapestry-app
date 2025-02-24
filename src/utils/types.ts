import { SportEnum, PositionEnum, RatingEnum, TournamentType, MatchType, MatchStatus, ErrorMessages } from "./enums";

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
  editValue: string;
  setEditValue: (value: string) => void;
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerState['errors']>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
  
}

export interface Team {
  id: string;
  name: string;
  responsible: string;
  players: string[];
  ranking: number;
  group?: string;
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  date: Date;
  location?: string;
  type: MatchType;
  status: MatchStatus;
  isHomeGame: boolean;
  round?: "roundOf16" | "quarterFinals" | "semiFinals" | "final" | "thirdPlace";
}

export interface Group {
  id: string;
  name: string;
  teams: Team[];
  matches: Match[];
  standings?: TeamStanding[];
}

export interface TeamStanding {
  teamId: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface KnockoutMatches {
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
  thirdPlace: Match;
}

export interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  startDate: Date;
  endDate: Date;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}