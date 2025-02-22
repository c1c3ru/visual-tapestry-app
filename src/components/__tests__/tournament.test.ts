
import { generateKnockoutMatches } from '../../utils/tournament';
import { Team } from '../../utils/types';
import { mockTeam } from '@/utils/test-utils';
import '@testing-library/jest-dom';

describe('Tournament Utils', () => {
  const mockTeams: Team[] = [
    { ...mockTeam, id: '1', name: 'Flamengo', responsible: 'João' },
    { ...mockTeam, id: '2', name: 'Palmeiras', responsible: 'Maria' },
    { ...mockTeam, id: '3', name: 'Santos', responsible: 'Pedro' },
    { ...mockTeam, id: '4', name: 'São Paulo', responsible: 'Ana' },
    { ...mockTeam, id: '5', name: 'Corinthians', responsible: 'Carlos' },
    { ...mockTeam, id: '6', name: 'Grêmio', responsible: 'Paulo' },
    { ...mockTeam, id: '7', name: 'Internacional', responsible: 'Lucas' },
    { ...mockTeam, id: '8', name: 'Atlético-MG', responsible: 'Julia' },
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
    
    matches.quarterFinals.forEach((match) => {
      expect(match.team1.id).not.toBe(match.team2.id);
    });
  });
});
