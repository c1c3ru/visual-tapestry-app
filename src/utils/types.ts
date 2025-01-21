export interface Player {
  id: number;
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean;
  sport: string;
  selectedPositions: string[];
  rating: number;
  includeInDraw: boolean;
  createdAt: string;
  present: boolean; // Adicionado
  paid: boolean; // Adicionado
  registered: boolean; // Adicionado
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
  matches: Group[];  // Added this property
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}