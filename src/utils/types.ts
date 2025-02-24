
import { RatingEnum } from "./enums";

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

export type Rating = RatingEnum;

export interface DashboardState {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export interface Team {
  id: string;
  name: string;
  responsible: string;
  players: Player[];
  rating: number;
  ranking?: number;
  stats?: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  birthDate: Date;
  isGuest: boolean;
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  rating: Rating;
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
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerState['errors']>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
  editValue?: string;
  setEditValue?: (value: string) => void;
}

export interface SettingsState {
  ratingSystem: 'stars' | 'numbers' | 'points';
  guestHighlight: 'color' | 'badge' | 'icon';
  setRatingSystem: (system: 'stars' | 'numbers' | 'points') => void;
  setGuestHighlight: (highlight: 'color' | 'badge' | 'icon') => void;
}

export interface StatisticsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

export interface TeamDrawState {
  selectedPlayers: Player[];
  teams: Team[];
  setSelectedPlayers: (players: Player[]) => void;
  setTeams: (teams: Team[]) => void;
}

export interface TournamentState {
  tournamentName: string;
  tournamentType: 'league' | 'worldCup' | 'homeAway';
  teams: Team[];
  groups: Group[];
  matches: Match[];
  knockoutMatches: KnockoutMatches | null;
  generateGroups: (teams: Team[], groupSize?: number) => Group[];
  generateKnockoutStage: (qualifiedTeams: Team[]) => KnockoutMatches;
  scheduleMatch: (team1: Team, team2: Team, date: Date) => Match;
  updateMatchResult: (matchId: string, score1: number, score2: number) => void;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  date: Date;
  location?: string;
  round?: string;
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

export interface TournamentBracketProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}
