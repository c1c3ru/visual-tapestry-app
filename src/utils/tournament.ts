import { Team, KnockoutMatches, Match, Group } from './types';

export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  // Embaralha os times para criar confrontos aleatórios
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  
  // Cria os jogos das quartas de final
  const quarterFinals: Match[] = [];
  for (let i = 0; i < 8; i += 2) {
    quarterFinals.push({
      team1: shuffledTeams[i],
      team2: shuffledTeams[i + 1],
      score1: Math.floor(Math.random() * 5),
      score2: Math.floor(Math.random() * 5),
    });
  }

  // Times que avançam para as semifinais (simulado)
  const semifinalists = quarterFinals.map(match => 
    match.score1! > match.score2! ? match.team1 : match.team2
  );

  // Cria os jogos das semifinais
  const semiFinals: Match[] = [
    {
      team1: semifinalists[0],
      team2: semifinalists[1],
      score1: Math.floor(Math.random() * 4),
      score2: Math.floor(Math.random() * 4),
    },
    {
      team1: semifinalists[2],
      team2: semifinalists[3],
      score1: Math.floor(Math.random() * 4),
      score2: Math.floor(Math.random() * 4),
    }
  ];

  // Times que avançam para a final e disputa de terceiro lugar
  const finalists = semiFinals.map(match => 
    match.score1! > match.score2! ? match.team1 : match.team2
  );
  const thirdPlaceTeams = semiFinals.map(match => 
    match.score1! > match.score2! ? match.team2 : match.team1
  );

  return {
    roundOf16: [], // Não utilizado neste exemplo
    quarterFinals,
    semiFinals,
    final: {
      team1: finalists[0],
      team2: finalists[1],
      score1: Math.floor(Math.random() * 3),
      score2: Math.floor(Math.random() * 3),
    },
    thirdPlace: {
      team1: thirdPlaceTeams[0],
      team2: thirdPlaceTeams[1],
      score1: Math.floor(Math.random() * 3),
      score2: Math.floor(Math.random() * 3),
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
