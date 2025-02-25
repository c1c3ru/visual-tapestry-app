
import { SportEnum, PositionEnum, RatingEnum, TournamentType, MatchType, MatchStatus } from "./enums";

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

export interface Player {
  id: string;
  name: string;
  nickname: string;
  birthDate: string;
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

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  date: string;
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
  data: any[];
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
  updateStatistic: (id: string, data: any) => void;
  removeStatistic: (id: string) => void;
}
