import { RatingEnum } from "./enums";

export { RatingEnum };

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

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface PlayerBasicInfoErrors {
  name: boolean;
  isGuest: boolean;
}

export interface PlayerSportInfoErrors {
  selectedPositions: boolean;
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean;
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  rating: Rating;
  includeInDraw: boolean;
  createdAt: string;
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

export interface PlayerFormErrors {
  name: ErrorState;
  isGuest: ErrorState;
  selectedPositions: ErrorState;
  rating: ErrorState;
}

export interface Team {
  id: string;
  name: string;
  responsible: string;
  rating: number;
  players: Player[];
  stats?: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  ranking?: number;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  date: string;
  location?: string;
  round?: string;
  isHomeGame?: boolean;
  type?: string;
  status?: string;
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
  type: 'league' | 'worldCup' | 'homeAway';
  startDate: string;
  endDate: string;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
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
  scheduleMatch: (team1: Team, team2: Team, date: string) => Match;
  updateMatchResult: (matchId: string, score1: number, score2: number) => void;
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

export interface PlayerState {
  players: Player[];
  newPlayer: Omit<Player, 'id' | 'createdAt'>;
  errors: PlayerFormErrors;
  editingPlayer: Player | null;
  editValue: string;
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerFormErrors>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
  setEditValue: (editValue: string) => void;
}

export interface TeamDrawState {
  selectedPlayers: Player[];
  teams: Team[];
  setSelectedPlayers: (players: Player[]) => void;
  setTeams: (teams: Team[]) => void;
}

export interface TournamentBracketProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}
