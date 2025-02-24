
import { Team, Player, SportEnum, PositionEnum, RatingEnum, Match, Group } from '@/utils/types';

export const createMockTeam = (overrides = {}): Team => ({
  id: "1",
  name: "Time Teste",
  responsible: "Responsável Teste",
  rating: 5,
  players: [],
  stats: {
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0
  },
  ranking: 1,
  ...overrides
});

export const createMockPlayer = (overrides = {}): Player => ({
  id: "1",
  name: "Jogador Teste",
  nickname: "Teste",
  birthDate: "2000-01-01",
  isGuest: false,
  sport: SportEnum.FOOTBALL,
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

export const createMockMatch = (overrides = {}): Match => ({
  id: "1",
  team1: createMockTeam(),
  team2: createMockTeam({ id: "2", name: "Time 2" }),
  date: "2024-01-01",
  ...overrides
});

export const createMockGroup = (overrides = {}): Group => ({
  id: "1",
  name: "Grupo A",
  teams: [createMockTeam(), createMockTeam({ id: "2", name: "Time 2" })],
  matches: [createMockMatch()],
  ...overrides
});
