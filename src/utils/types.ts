import { ReactNode } from 'react';

export enum SportEnum {
  FUTSAL = "FUTSAL",
  FOOTBALL = "FOOTBALL",
  VOLLEYBALL = "VOLLEYBALL",
  BASKETBALL = "BASKETBALL",
  HANDBALL = "HANDBALL"
}

export enum TournamentType {
  LEAGUE = "league",
  WORLD_CUP = "worldCup",
  HOME_AWAY = "homeAway"
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

export type Rating = RatingEnum;
export type Sport = SportEnum;

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface FormErrors {
  name: ErrorState;
  isGuest: ErrorState;
  selectedPositions: ErrorState;
  rating: ErrorState;
}

export interface BasicInfoErrors {
  name: ErrorState;
  isGuest: ErrorState;
}

export interface SportInfoErrors {
  selectedPositions: ErrorState;
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
  players: Player[];
  rating: number;
  ranking?: number;
  stats?: TeamStatistics;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  date: Date;
  location?: string;
  isHomeGame?: boolean;
  round?: string;
  type?: string;
}

export interface Group {
  id: string;
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

export interface TournamentBracketProps {
  match: Match;
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

export interface PlayerState {
  players: Player[];
  newPlayer: Omit<Player, 'id' | 'createdAt'>;
  errors: FormErrors;
  editingPlayer: Player | null;
  editValue?: string;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<FormErrors>) => void;
  resetForm: () => void;
  setEditingPlayer: (player: Player | null) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, updatedFields: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditValue?: (value: string) => void;
}

export interface DashboardState {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

export interface Tournament {
  id: string;
  name: string;
  type: "league" | "worldCup" | "homeAway";
  startDate: Date;
  endDate: Date;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

export interface TournamentState {
  tournamentName: string;
  tournamentType: "league" | "worldCup" | "homeAway";
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  matches: Match[];
  teamName: string;
  responsible: string;
  generateGroups: () => Group[];
  generateKnockoutStage: (qualifiedTeams: Team[]) => KnockoutMatches;
  scheduleMatch: (team1: Team, team2: Team, date: Date) => Match;
  updateMatchResult: (matchId: string, score1: number, score2: number) => void;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: "league" | "worldCup" | "homeAway") => void;
  setTeamName: (name: string) => void;
  setResponsible: (name: string) => void;
  addTeam: (team: Team) => { success: boolean; error?: string };
  removeTeam: (id: string) => void;
  generateMatches: () => { success: boolean; error?: string };
}

export interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setPlayersPerTeam: (count: number) => void;
  generateTeams: (players: Player[]) => { success: boolean; error?: string };
}

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

export interface StatisticsState {
  stats: PlayerStatistics[];
  teamStats: TeamStatistics[];
  updateStats: () => void;
}
