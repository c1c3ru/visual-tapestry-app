
import { Team, Player, SportEnum, RatingEnum } from './types';

export const mockPlayer: Player = {
  id: "1",
  name: "Test Player",
  nickname: "",
  birthDate: new Date().toISOString(),
  isGuest: false,
  sport: SportEnum.FOOTBALL,
  selectedPositions: [],
  rating: RatingEnum.THREE,
  includeInDraw: false,
  createdAt: new Date().toISOString(),
  present: false,
  paid: false,
  registered: true,
  selected: false,
};

export const mockTeam: Team = {
  id: "1",
  name: "Test Team",
  responsible: "Test Responsible",
  players: [],
  rating: 0,
};

export const createMockTeam = (overrides: Partial<Team> = {}): Team => ({
  ...mockTeam,
  ...overrides,
});

export const createMockPlayer = (overrides: Partial<Player> = {}): Player => ({
  ...mockPlayer,
  ...overrides,
});
