import { v4 as uuidv4 } from 'uuid';

// ==================== Enums e Tipos Base ====================
export enum TournamentType {
  LEAGUE = 'league',
  WORLD_CUP = 'worldCup',
  HOME_AWAY = 'homeAway'
}

export enum MatchType {
  GROUP_STAGE = 'group',
  KNOCKOUT = 'knockout',
  FINAL = 'final'
}

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export enum ErrorMessages {
  INVALID_TEAMS_NUMBER = 'Número de times inválido para este formato de torneio',
  MIN_TEAMS_REQUIRED = 'Mínimo de 4 times necessários'
}

// ==================== Interfaces Melhoradas ====================
export interface Team {
  id: string;
  name: string;
  responsible: string;
  players: string[]; // IDs dos jogadores
  ranking: number;
  group?: string;
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  date: Date;
  location?: string;
  type: MatchType;
  status: MatchStatus;
  isHomeGame: boolean;
  round?: string;
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
  startDate: Date;
  endDate: Date;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

// ==================== Utilitários ====================
const validateTeams = (teams: Team[], minTeams: number = 4): void => {
  if (teams.length < minTeams) {
    throw new Error(ErrorMessages.MIN_TEAMS_REQUIRED);
  }
};

const createMatch = (team1: Team, team2: Team, type: MatchType): Match => ({
  id: uuidv4(),
  team1,
  team2,
  score1: 0,
  score2: 0,
  date: new Date(),
  type,
  status: MatchStatus.SCHEDULED,
  isHomeGame: true
});

// ==================== Funções Principais Melhoradas ====================
export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  validateTeams(teams);
  
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  const rounds: KnockoutMatches = {
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    final: createMatch(shuffledTeams[0], shuffledTeams[1], MatchType.FINAL),
    thirdPlace: createMatch(shuffledTeams[2], shuffledTeams[3], MatchType.KNOCKOUT)
  };

  // Gerar todas as partidas com IDs únicos
  const generateRoundMatches = (teams: Team[], roundName: keyof KnockoutMatches) => {
    const matches: Match[] = [];
    for (let i = 0; i < teams.length; i += 2) {
      const match = createMatch(teams[i], teams[i + 1], MatchType.KNOCKOUT);
      match.round = roundName;
      matches.push(match);
    }
    return matches;
  };

  if (shuffledTeams.length >= 16) {
    rounds.roundOf16 = generateRoundMatches(shuffledTeams.slice(0, 16), 'roundOf16');
  }

  if (shuffledTeams.length >= 8) {
    rounds.quarterFinals = generateRoundMatches(shuffledTeams.slice(0, 8), 'quarterFinals');
  }

  if (shuffledTeams.length >= 4) {
    rounds.semiFinals = generateRoundMatches(shuffledTeams.slice(0, 4), 'semiFinals');
  }

  return rounds;
};

export const generateGroups = (teams: Team[]): Group[] => {
  validateTeams(teams);
  
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  const numGroups = Math.ceil(teams.length / 4);
  const groups: Group[] = [];

  for (let i = 0; i < numGroups; i++) {
    const groupTeams = shuffledTeams.slice(i * 4, (i + 1) * 4);
    const matches: Match[] = [];

    // Gerar partidas de ida e volta
    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        matches.push(
          createMatch(groupTeams[j], groupTeams[k], MatchType.GROUP_STAGE),
          createMatch(groupTeams[k], groupTeams[j], MatchType.GROUP_STAGE)
        );
      }
    }

    groups.push({
      id: uuidv4(),
      name: `Group ${String.fromCharCode(65 + i)}`,
      teams: groupTeams,
      matches,
      standings: []
    });
  }

  return groups;
};

export const generateTournamentMatches = (
  teams: Team[], 
  tournamentType: TournamentType
): Match[] => {
  validateTeams(teams);
  
  switch (tournamentType) {
    case TournamentType.LEAGUE:
      return generateLeagueMatches(teams);
    
    case TournamentType.WORLD_CUP:
      return generateWorldCupMatches(teams);
    
    case TournamentType.HOME_AWAY:
      return generateHomeAwayMatches(teams);
    
    default:
      throw new Error(ErrorMessages.INVALID_TEAMS_NUMBER);
  }
};

// ==================== Implementações Específicas ====================
const generateLeagueMatches = (teams: Team[]): Match[] => {
  const matches: Match[] = [];
  
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push(
        createMatch(teams[i], teams[j], MatchType.GROUP_STAGE),
        createMatch(teams[j], teams[i], MatchType.GROUP_STAGE)
      );
    }
  }
  
  return matches;
};

const generateWorldCupMatches = (teams: Team[]): Match[] => {
  const groups = generateGroups(teams);
  const groupMatches = groups.flatMap(group => group.matches);
  const knockout = generateKnockoutMatches(teams);
  
  return [
    ...groupMatches,
    ...knockout.roundOf16,
    ...knockout.quarterFinals,
    ...knockout.semiFinals,
    knockout.final,
    knockout.thirdPlace
  ];
};

const generateHomeAwayMatches = (teams: Team[]): Match[] => {
  const knockout = generateKnockoutMatches(teams);
  const matches = [
    ...knockout.roundOf16,
    ...knockout.quarterFinals,
    ...knockout.semiFinals,
    knockout.final,
    knockout.thirdPlace
  ];

  // Duplicar partidas para jogos de volta
  const returnMatches = matches.map(match => ({
    ...createMatch(match.team2, match.team1, MatchType.KNOCKOUT),
    isHomeGame: true
  }));

  return [...matches, ...returnMatches];
};

// ==================== Exemplo de Uso ====================
const sampleTeams: Team[] = Array.from({ length: 16 }, (_, i) => ({
  id: uuidv4(),
  name: `Team ${i + 1}`,
  responsible: `Coach ${i + 1}`,
  players: [],
  ranking: i + 1,
  stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 }
}));

const worldCupMatches = generateTournamentMatches(sampleTeams, TournamentType.WORLD_CUP);
console.log('World Cup Matches:', worldCupMatches);
