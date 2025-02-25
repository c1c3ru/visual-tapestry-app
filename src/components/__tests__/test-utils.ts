
import { Team, Player, Match, Group } from '@/utils/types';
import { SportEnum, PositionEnum, RatingEnum } from '@/utils/enums';

export const createMockTeam = (overrides = {}): Team => ({
  id: "1",
  name: "Time Teste",
  responsible: "Responsável Teste",
  players: [],
  ranking: 1,
  stats: {
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0
  },
  rating: 5,
  ...overrides
});

export const createMockMatch = (overrides = {}): Match => ({
  id: "1",
  team1: createMockTeam(),
  team2: createMockTeam({ id: "2", name: "Time 2" }),
  score1: 0,
  score2: 0,
  date: "2024-01-01",
  type: "group",
  status: "scheduled",
  isHomeGame: true,
  ...overrides
});

export const createMockPlayer = (overrides = {}): Player => ({
  id: "1",
  name: "Jogador Teste",
  nickname: "Teste",
  birthDate: "2000-01-01",
  isGuest: false,
  sport: SportEnum.SOCCER,
  selectedPositions: [PositionEnum.GOALKEEPER],
  rating: RatingEnum.THREE,
  includeInDraw: true,
  createdAt: "2024-01-01",
  selected: false,
  present: true,
  paid: true,
  registered: true,
  ...overrides
});

export const createMockGroup = (overrides = {}): Group => ({
  id: "1",
  name: "Grupo A",
  teams: [createMockTeam(), createMockTeam({ id: "2", name: "Time 2" })],
  matches: [createMockMatch()],
  ...overrides
});
