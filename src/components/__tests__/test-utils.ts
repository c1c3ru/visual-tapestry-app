
import { Team, Player, SportEnum, PositionEnum, RatingEnum } from '@/utils/types';

export const createMockTeam = (): Team => ({
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
  ranking: 1
});

export const createMockPlayer = (): Player => ({
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
  registered: true
});
