// Define a type for the rating system
export type Rating = 1 | 2 | 3 | 4 | 5;

// Define the Player interface
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

// Define the PlayerState interface
export interface PlayerState {
  id: string;
  players: Player[];
  newPlayer: Omit<Player, "id" | "createdAt">;
  errors: {
    name: boolean;
    isGuest: boolean;
    selectedPositions: boolean;
    rating: boolean;
  };
  editingPlayer: { id: number } | null;
  editValue: string;
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, "id" | "createdAt">>) => void;
  setErrors: (errors: Partial<PlayerState["errors"]>) => void;
  resetForm: () => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: { id: number } | null) => void;
  setEditValue: (value: string) => void;
}
export interface Team {
  id: string;
  name: string;
  responsible: string;
}

export interface TeamState {
  player: Player[];

  goalkeepers: Player[];

  teams: Team[];

  playersPerTeam: number;

  namingOption: string;

  matchups: Match[];

  setPlayers: (players: Player[]) => void;

  setGoalkeepers: (goalkeepers: Player[]) => void;

  setTeams: (teams: Team[]) => void;

  setPlayersPerTeam: (playersPerTeam: number) => void;

  setNamingOption: (namingOption: string) => void;

  setMatchups: (matchups: Match[]) => void;

  addTeam: (team: Team) => void;

  editTeam: (index: number, team: Team) => void;

  removeTeam: (id: string) => void;
}
// Define the Match interface
export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  isHomeGame?: boolean;
}

// Define the Group interface
export interface Group {
  id: string;
  name: string;
  matches: Match[];
}

// Define the Team interface
export interface Team {
  id: string;

  name: string;

  responsible: string;

  addTeam?: () => void;

  editTeam?: () => void;

  removeTeam?: () => void;

}

// Define the KnockoutMatches interface
export interface KnockoutMatches {
  id: string;
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
  thirdPlace: Match;
}

// Define the Tournament interface
export interface Tournament {
  id: string;
  tournament: Tournament | null;
  name: string;
  type: "league" | "worldCup" | "homeAway";
  teams: Team[];
  matches: Group[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
  addTeam: (team: Team) => void;
  editTeam: (id: string, updatedTeam: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: string) => void;
  generateMatches: (
    teams: Team[],
    type: "league" | "worldCup" | "homeAway"
  ) => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
}

// Define the TournamentState interface
export interface TournamentState {
  tournament: Tournament | null;
  name: string;
  type: "league" | "worldCup" | "homeAway";
  teams: Team[];
  matches: Group[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
  addTeam: (team: Team) => void;
  editTeam: (id: string, updatedTeam: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: string) => void;
  generateMatches: (
    teams: Team[],
    type: "league" | "worldCup" | "homeAway"
  ) => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
}

// Define the DashboardState interface
export interface DashboardState {
  id: string;
  dashboardTitle: string;
  isAdmin: boolean;
  menuItems: { title: string; route: string }[];
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

// Define the DashboardSettingsState interface
export interface DashboardSettingsState {
  selectedRatingSystem: string;
  guestHighlight: string;
  setSelectedRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

// Define the DashboardSettingsProps interface
export interface DashboardSettingsProps {
  selectedRatingSystem: string;
  guestHighlight: string;
  setGuestHighlight: (highlight: string) => void;
  setSelectedRatingSystem: (system: string) => void;
}

// Define the DashboardHeaderProps interface
export interface DashboardHeaderProps {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
}

// Define the PointRecord interface
export interface PointRecord {
  date: string;
  points: number;
}

// Define the Statistic interface
export interface Statistic {
  id: string;
  playerName: string;
  date: string;
  attendanceCount: number;
  lastUpdated: string;
  pointRecords: PointRecord[];
}
