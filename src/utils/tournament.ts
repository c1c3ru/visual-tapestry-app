
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
  // Garantir número par de times
  const numTeams = teams.length;
  const numByes = Math.pow(2, Math.ceil(Math.log2(numTeams))) - numTeams;
  
  // Criar array com times e "byes"
  const teamsWithByes = [...teams];
  for (let i = 0; i < numByes; i++) {
    teamsWithByes.push({
      id: `bye-${i}`,
      name: 'Bye',
      responsible: ''
    });
  }

  const shuffledTeams = teamsWithByes.sort(() => Math.random() - 0.5);
  const isHomeAndAway = true;

  const createMatch = (team1: Team, team2: Team): Match => ({
    team1,
    team2,
    isHomeGame: isHomeAndAway,
  });

  const rounds = {
    roundOf16: [] as Match[],
    quarterFinals: [] as Match[],
    semiFinals: [] as Match[],
    final: {} as Match,
    thirdPlace: {} as Match,
  };

  // Gerar chaves com base no número de times
  if (shuffledTeams.length >= 16) {
    // Round of 16
    for (let i = 0; i < 16; i += 2) {
      rounds.roundOf16.push(createMatch(shuffledTeams[i], shuffledTeams[i + 1]));
    }
  }

  // Quarter Finals
  const quarterFinalsTeams = shuffledTeams.length >= 16 ? 
    shuffledTeams.slice(0, 8) : 
    shuffledTeams;

  for (let i = 0; i < Math.min(quarterFinalsTeams.length, 8); i += 2) {
    if (quarterFinalsTeams[i] && quarterFinalsTeams[i + 1]) {
      rounds.quarterFinals.push(createMatch(
        quarterFinalsTeams[i], 
        quarterFinalsTeams[i + 1]
      ));
    }
  }

  // Semi Finals
  const semiFinalTeams = shuffledTeams.slice(0, 4);
  if (semiFinalTeams.length >= 4) {
    rounds.semiFinals = [
      createMatch(semiFinalTeams[0], semiFinalTeams[1]),
      createMatch(semiFinalTeams[2], semiFinalTeams[3]),
    ];

    // Final and Third Place
    rounds.final = createMatch(semiFinalTeams[0], semiFinalTeams[1]);
    rounds.thirdPlace = createMatch(semiFinalTeams[2], semiFinalTeams[3]);
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

    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        matches.push({
          team1: groupTeams[j],
          team2: groupTeams[k],
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
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({ 
            team1: teams[i], 
            team2: teams[j],
            score1: 0,
            score2: 0
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
      break;
  }

  return matches;
};
