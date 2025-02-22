
export enum SportEnum {
  FUTSAL = "FUTSAL",
  FOOTBALL = "FOOTBALL",
  VOLLEYBALL = "VOLLEYBALL",
  BASKETBALL = "BASKETBALL",
  HANDBALL = "HANDBALL"
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
  editValue?: string;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerState['errors']>) => void;
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

export interface TournamentState {
  tournamentName: string;
  tournamentType: "league" | "worldCup" | "homeAway";
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  matches: Match[];
  generateGroups: () => Group[];
  generateKnockoutStage: (qualifiedTeams: Team[]) => KnockoutMatches;
  scheduleMatch: (team1: Team, team2: Team, date: Date) => Match;
  updateMatchResult: (matchId: string, score1: number, score2: number) => void;
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

export interface TournamentBracketProps {
  match: Match;
}
