import { Group, KnockoutMatches, Match, Team } from "@/utils/types";

const createTeamFromString = (name: string): Team => ({
  id: name.toLowerCase().replace(/\s/g, '-'),
  name: name,
  responsible: ''
});

export const generateGroups = (teams: string[]): Group[] => {
  const groups: Group[] = [];
  const teamsPerGroup = Math.ceil(teams.length / 4);

  for (let i = 0; i < 4; i++) {
    const groupTeams = teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup);
    const matches: Match[] = [];

    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        matches.push({
          team1: createTeamFromString(groupTeams[j]),
          team2: createTeamFromString(groupTeams[k])
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

export const generateKnockoutMatches = (groups: Group[]): KnockoutMatches => {
  return {
    roundOf16: groups.flatMap(group => [{
      team1: createTeamFromString(`${group.name} Winner`),
      team2: createTeamFromString(`${String.fromCharCode(group.name.charCodeAt(6) + 1)} Runner-up`)
    }]),
    quarterFinals: Array(4).fill(null).map(() => ({
      team1: createTeamFromString("TBD"),
      team2: createTeamFromString("TBD")
    })),
    semiFinals: Array(2).fill(null).map(() => ({
      team1: createTeamFromString("TBD"),
      team2: createTeamFromString("TBD")
    })),
    final: {
      team1: createTeamFromString("TBD"),
      team2: createTeamFromString("TBD")
    },
    thirdPlace: {
      team1: createTeamFromString("TBD"),
      team2: createTeamFromString("TBD")
    }
  };
};