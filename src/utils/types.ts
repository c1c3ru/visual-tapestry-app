import { SportEnum, PositionEnum, RatingEnum, TournamentType, MatchType, MatchStatus } from "./enums";

export { SportEnum, PositionEnum, RatingEnum };

export type Rating = RatingEnum;

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface PlayerFormErrors {
  name: ErrorState;
  isGuest: ErrorState;
  selectedPositions: ErrorState;
  rating: ErrorState;
}

export interface PlayerState {
  players: Player[];
  newPlayer: Omit<Player, 'id' | 'createdAt'>;
  errors: PlayerFormErrors;
  editingPlayer: Player | null;
  editValue: string;
  setEditValue: (value: string) => void;
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerFormErrors>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  birthDate: Date | string;
  isGuest: boolean;
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  rating: RatingEnum;
  includeInDraw: boolean;
  createdAt: string;
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
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
  rating?: number;
}

export interface TeamDrawState {
  teams: Team[];
  playersPerTeam: number;
  setTeams: (teams: Team[]) => void;
  setPlayersPerTeam: (count: number) => void;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  date: Date | string;
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
  startDate: string;
  endDate: string;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

export interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: KnockoutMatches;
  tournamentType: TournamentType;
}

export interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

export interface StatisticsState {
  data: Date | string;
  loading: boolean;
  error: string | null;
  statistics: {
    id: string;
    name: string;
    date: string;
    attendanceCount: number;
    lastUpdated: string;
    pointRecords: { points: number; date: string; }[];
  }[];
  updateStatistic: (id: string, data: Date | string) => void;
  removeStatistic: (id: string) => void;
}

export interface TournamentState {
  tournamentName: string;
  tournamentType: TournamentType;
  teams: Team[];
  matches: Match[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  generateGroups: (teams: Team[]) => void;
  generateKnockoutStage: (teams: Team[]) => void;
  scheduleMatch: (match: Match) => void;
  updateMatchResult: (matchId: string, score1: number, score2: number) => void;
  updateMatchStatus: (matchId: string, status: MatchStatus) => void;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: TournamentType) => void;
  addTeam: (team: Team) => void;
  removeTeam: (id: string) => void;
  generateMatches: () => void;
  setTeams: (teams: Team[]) => void;
  setMatches: (matches: Match[]) => void;
  setGroups: (groups: Group[]) => void;
  setKnockoutMatches: (matches: KnockoutMatches) => void;
}

export interface DashboardState {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}
