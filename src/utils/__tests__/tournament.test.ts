import { generateKnockoutMatches } from '../tournament';
import { Team, Match } from '../types';
import '@testing-library/jest-dom';

describe('Tournament Utils', () => {
  const mockTeams: Team[] = [
    { id: '1', name: 'Flamengo', responsible: 'João' },
    { id: '2', name: 'Palmeiras', responsible: 'Maria' },
    { id: '3', name: 'Santos', responsible: 'Pedro' },
    { id: '4', name: 'São Paulo', responsible: 'Ana' },
    { id: '5', name: 'Corinthians', responsible: 'Carlos' },
    { id: '6', name: 'Grêmio', responsible: 'Paulo' },
    { id: '7', name: 'Internacional', responsible: 'Lucas' },
    { id: '8', name: 'Atlético-MG', responsible: 'Julia' },
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