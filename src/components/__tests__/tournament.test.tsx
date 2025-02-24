import { generateKnockoutMatches, generateGroups, generateTournamentMatches, TournamentType } from '../../utils/tournament';
import { Team } from '../../utils/types';

describe('Tournament Utils', () => {
  const mockTeams: Team[] = [
    { id: '1', name: 'Time 1', responsible: 'Resp 1', players: [], ranking: 1, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '2', name: 'Time 2', responsible: 'Resp 2', players: [], ranking: 2, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '3', name: 'Time 3', responsible: 'Resp 3', players: [], ranking: 3, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
    { id: '4', name: 'Time 4', responsible: 'Resp 4', players: [], ranking: 4, stats: { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 } },
  ];

  describe('generateKnockoutMatches', () => {
    test('generates correct knockout structure', () => {
      const result = generateKnockoutMatches(mockTeams);
      expect(result.quarterFinals).toHaveLength(2);
      expect(result.semiFinals).toHaveLength(2);
      expect(result.final).toBeDefined();
      expect(result.thirdPlace).toBeDefined();
    });

    test('handles minimum number of teams', () => {
      const minTeams = mockTeams.slice(0, 4);
      const result = generateKnockoutMatches(minTeams);
      expect(result.quarterFinals).toHaveLength(2);
    });
  });

  describe('generateGroups', () => {
    test('generates correct group structure', () => {
      const groups = generateGroups(mockTeams);
      expect(groups).toHaveLength(1);
      expect(groups[0].matches).toBeDefined();
    });

    test('distributes teams evenly', () => {
      const moreTeams = [...mockTeams, ...mockTeams];
      const groups = generateGroups(moreTeams);
      expect(groups).toHaveLength(2);
    });
  });

  describe('generateTournamentMatches', () => {
    test('generates league matches', () => {
      const matches = generateTournamentMatches(mockTeams, TournamentType.LEAGUE);
      const expectedMatches = (mockTeams.length * (mockTeams.length - 1)) / 2;
      expect(matches).toHaveLength(expectedMatches);
    });

    test('generates world cup matches', () => {
      const matches = generateTournamentMatches(mockTeams, TournamentType.WORLD_CUP);
      expect(matches).toBeDefined();
      expect(matches.length).toBeGreaterThan(0);
    });

    test('generates home and away matches', () => {
      const matches = generateTournamentMatches(mockTeams, TournamentType.HOME_AWAY);
      expect(matches).toBeDefined();
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});