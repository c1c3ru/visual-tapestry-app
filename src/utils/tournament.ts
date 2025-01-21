import { Team, KnockoutMatches, Match, Group } from './types';

export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  return {
    roundOf16: Array(8).fill(null).map(() => ({
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    })),
    quarterFinals: Array(4).fill(null).map(() => ({
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    })),
    semiFinals: Array(2).fill(null).map(() => ({
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    })),
    final: {
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    },
    thirdPlace: {
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    }
  };
};

export const createTeamFromString = (name: string): Team => ({
  id: name.toLowerCase().replace(/\s/g, '-'),
  name: name,
  responsible: ''
});

export const generateGroups = (teams: string[]): Group[] => {
  const groups: Group[] = [];
  const teamsPerGroup = Math.ceil(teams.length / 4);

  for (let i = 0; i < 4; i++) {
    const groupTeams = teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup)
      .map(createTeamFromString);
    const matches: Match[] = [];

    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        matches.push({
          team1: groupTeams[j],
          team2: groupTeams[k]
        });
      }
    }

    groups.push({
      name: `Grupo ${String.fromCharCode(65 + i)}`,
      matches
    });
  }

  return groups;
};