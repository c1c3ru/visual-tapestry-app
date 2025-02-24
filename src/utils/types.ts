export type Rating = 1 | 2 | 3 | 4 | 5;

export type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

export interface Player {
  id: number;
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean;
  sport: Sport;
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
  newPlayer: Omit<Player, 'id' | 'createdAt'>;
  errors: {
    name: boolean;
    isGuest: boolean;
    selectedPositions: boolean;
    rating: boolean;
  };
  editingPlayer: { id: number } | null;
  editValue: string;
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerState['errors']>) => void;
  resetForm: () => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: { id: number } | null) => void;
  setEditValue: (value: string) => void;
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

export interface TournamentState {
  tournamentName: string;
  tournamentType: 'league' | 'worldCup' | 'homeAway';
  teamName: string;
  responsible: string;
  teams: Team[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: 'league' | 'worldCup' | 'homeAway') => void;
  setTeamName: (name: string) => void;
  setResponsible: (name: string) => void;
  addTeam: (team: Team) => void;
  removeTeam: (id: string) => void;
  generateMatches: () => { success: boolean; error?: string };
}

export interface SettingsState {
  guestHighlight: string;
  ratingSystem: string;
  setGuestHighlight: (highlight: string) => void;
  setRatingSystem: (system: string) => void;
}

export interface StatisticsState {
  statistics: Array<{
    id: number;
    name: string;
    date: string;
    attendanceCount: number;
    lastUpdated: string;
    pointRecords: Array<{
      points: number;
      date: string;
    }>;
  }>;
  updateStatistic: (index: number, statistic: any) => void;
  removeStatistic: (index: number) => void;
}

export interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  namingOption: string;
  matchups: string[];
  setMatchups: (matchups: string[]) => void;
}
