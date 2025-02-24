import { generateKnockoutMatches } from '../../utils/tournament';
import { Team, Match } from '../../utils/types';
import '@testing-library/jest-dom';

describe('Tournament Utils', () => {
  const mockTeams: Team[] = [
    { id: '1', name: 'Flamengo', responsible: 'João', players: [], ranking: 1, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '2', name: 'Palmeiras', responsible: 'Maria', players: [], ranking: 2, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '3', name: 'Santos', responsible: 'Pedro', players: [], ranking: 3, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '4', name: 'São Paulo', responsible: 'Ana', players: [], ranking: 4, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '5', name: 'Corinthians', responsible: 'Carlos', players: [], ranking: 5, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '6', name: 'Grêmio', responsible: 'Paulo', players: [], ranking: 6, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '7', name: 'Internacional', responsible: 'Lucas', players: [], ranking: 7, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '8', name: 'Atlético-MG', responsible: 'Julia', players: [], ranking: 8, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
  ];

  test('generateKnockoutMatches should create correct number of matches', () => {
    const matches = generateKnockoutMatches(mockTeams);
    
    expect(matches.quarterFinals.length).toBe(4);
    expect(matches.semiFinals.length).toBe(2);
    expect(matches.final).toBeDefined();
    expect(matches.thirdPlace).toBeDefined();
  });

  test('generateKnockoutMatches should pair teams correctly', () => {
    const matches = generateKnockoutMatches(mockTeams);
    
    matches.quarterFinals.forEach((match: Match) => {
      expect(match.team1.id).not.toBe(match.team2.id);
    });
  });
});