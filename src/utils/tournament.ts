
import { Team, KnockoutMatches, Match, Group } from './types';

export interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: KnockoutMatches;
}

export interface Tournament {
  id: string;
  name: string;
  type: 'league' | 'worldCup' | 'homeAway';
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  const numTeams = teams.length;
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  
  // Determinar o número de rodadas necessárias
  const numRounds = Math.ceil(Math.log2(numTeams));
  const totalTeamsNeeded = Math.pow(2, numRounds);
  
  // Criar times "bye" se necessário
  const numByes = totalTeamsNeeded - numTeams;
  for (let i = 0; i < numByes; i++) {
    shuffledTeams.push({
      id: `bye-${i}`,
      name: 'Bye',
      responsible: ''
    });
  }

  const createMatch = (team1: Team, team2: Team): Match => ({
    team1,
    team2,
    score1: 0,
    score2: 0,
    isHomeGame: true
  });

  // Inicializar todas as rodadas
  const rounds: KnockoutMatches = {
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    final: {} as Match,
    thirdPlace: {} as Match
  };

  // Gerar partidas para cada fase
  if (shuffledTeams.length >= 16) {
    for (let i = 0; i < 16; i += 2) {
      rounds.roundOf16.push(createMatch(shuffledTeams[i], shuffledTeams[i + 1]));
    }
  }

  const quarterTeams = shuffledTeams.length >= 16 ? shuffledTeams.slice(0, 8) : shuffledTeams;
  for (let i = 0; i < Math.min(quarterTeams.length, 8); i += 2) {
    if (quarterTeams[i] && quarterTeams[i + 1]) {
      rounds.quarterFinals.push(createMatch(quarterTeams[i], quarterTeams[i + 1]));
    }
  }

  if (shuffledTeams.length >= 4) {
    const semiTeams = shuffledTeams.slice(0, 4);
    rounds.semiFinals = [
      createMatch(semiTeams[0], semiTeams[1]),
      createMatch(semiTeams[2], semiTeams[3])
    ];

    rounds.final = createMatch(semiTeams[0], semiTeams[1]);
    rounds.thirdPlace = createMatch(semiTeams[2], semiTeams[3]);
  }

  return rounds;
};

export const generateGroups = (teams: Team[]): Group[] => {
  const groups: Group[] = [];
  const numGroups = Math.ceil(teams.length / 4);
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

  for (let i = 0; i < numGroups; i++) {
    const groupTeams = shuffledTeams.slice(i * 4, (i + 1) * 4);
    const matches: Match[] = [];

    // Gerar partidas do grupo (todos contra todos)
    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        // Ida
        matches.push({
          team1: groupTeams[j],
          team2: groupTeams[k],
          score1: 0,
          score2: 0,
          isHomeGame: true
        });
        // Volta
        matches.push({
          team1: groupTeams[k],
          team2: groupTeams[j],
          score1: 0,
          score2: 0,
          isHomeGame: true
        });
      }
    }

    groups.push({
      name: `Grupo ${String.fromCharCode(65 + i)}`,
      matches,
    });
  }

  return groups;
};

export const generateTournamentMatches = (teams: Team[], tournamentType: string): Match[] => {
  const matches: Match[] = [];

  switch (tournamentType) {
    case 'league':
      // Liga: todos contra todos
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          // Ida
          matches.push({ 
            team1: teams[i], 
            team2: teams[j],
            score1: 0,
            score2: 0,
            isHomeGame: true
          });
          // Volta
          matches.push({ 
            team1: teams[j], 
            team2: teams[i],
            score1: 0,
            score2: 0,
            isHomeGame: true
          });
        }
      }
      break;

    case 'worldCup':
      const groups = generateGroups(teams);
      groups.forEach(group => {
        matches.push(...group.matches);
      });
      break;

    case 'homeAway':
      const knockoutMatches = generateKnockoutMatches(teams);
      if (teams.length <= 8) {
        matches.push(...knockoutMatches.quarterFinals);
      } else {
        matches.push(...knockoutMatches.roundOf16);
      }
      matches.push(...knockoutMatches.semiFinals);
      matches.push(knockoutMatches.final);
      matches.push(knockoutMatches.thirdPlace);
      
      // Duplicar partidas para jogos de volta
      const returnMatches = matches.map(match => ({
        team1: match.team2,
        team2: match.team1,
        score1: 0,
        score2: 0,
        isHomeGame: true
      }));
      matches.push(...returnMatches);
      break;
  }

  return matches;
};
