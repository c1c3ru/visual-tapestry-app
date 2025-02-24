import { Team, Match, KnockoutMatches, Group, TournamentType } from './types';

export type { TournamentBracketProps } from './types';

export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  const numberOfTeams = teams.length;

  if (numberOfTeams < 2) {
    throw new Error("At least two teams are required for a knockout stage.");
  }

  const rounds = Math.ceil(Math.log2(numberOfTeams));
  const matchesPerRound = numberOfTeams / Math.pow(2, rounds - 1);

  const generateRound = (teamsInRound: Team[], roundNumber: number): Match[] => {
    const matches: Match[] = [];
    for (let i = 0; i < teamsInRound.length; i += 2) {
      const team1 = teamsInRound[i];
      const team2 = teamsInRound[i + 1];

      if (team1 && team2) {
        matches.push({
          id: crypto.randomUUID(),
          team1,
          team2,
          date: new Date(),
          score1: 0,
          score2: 0
        });
      } else if (team1) {
        matches.push({
          id: crypto.randomUUID(),
          team1,
          team2: {
            id: crypto.randomUUID(),
            name: "Bye",
            responsible: "N/A",
            players: [],
            rating: 0
          },
          date: new Date(),
          score1: 0,
          score2: 0
        });
      }
    }
    return matches;
  };

  const match: Match = {
    id: crypto.randomUUID(),
    team1: teams[0],
    team2: teams[1],
    date: new Date(),
    score1: 0,
    score2: 0
  };

  return {
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    final: match,
    thirdPlace: match
  };
};

export const createGroup = (name: string, teams: Team[]): Group => {
  return {
    id: crypto.randomUUID(),
    name,
    teams,
    matches: []
  };
};

export const generateTeamStats = (teams: Team[]): Team[] => {
  return teams.map(team => ({
    ...team,
    rating: team.rating || 0
  }));
};
