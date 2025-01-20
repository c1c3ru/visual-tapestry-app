export interface Match {
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
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
  name: string;
  type: string;
  teams: Team[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}