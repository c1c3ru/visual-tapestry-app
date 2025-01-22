export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Player {
  id: number;
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean;
  sport: string;
  selectedPositions: string[];
  rating: Rating;
  includeInDraw: boolean;
  createdAt: string;
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
}
export interface PlayerState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
}

export interface Match {
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  isHomeGame?: boolean;
}

export interface Group {
  name: string;
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
}

export interface Tournament {
  id: string;
  name: string;
  type: 'league' | 'worldCup' | 'homeAway';
  teams: Team[];
  matches: Group[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

export interface DashboardState {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export interface DashboardSettingsProps {
  selectedRatingSystem: string;
  guestHighlight: string;
  setGuestHighlight: (highlight: string) => void;
  setSelectedRatingSystem: (system: string) => void;
}

export interface DashboardHeaderProps {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
}

