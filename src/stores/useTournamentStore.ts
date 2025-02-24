
import { create } from 'zustand';
import { TournamentState, TournamentType, Team, Match, Group } from '@/utils/types';
import { generateKnockoutMatches, createGroup } from '@/utils/tournament';

export const useTournamentStore = create<TournamentState>((set) => ({
  tournamentName: '',
  tournamentType: TournamentType.LEAGUE,
  teams: [],
  groups: [],
  matches: [],
  knockoutMatches: null,
  teamName: '',
  responsible: '',
  generateGroups: () => {
    const groups: Group[] = [];
    return groups;
  },
  generateKnockoutStage: (teams) => generateKnockoutMatches(teams),
  scheduleMatch: (team1, team2, date) => {
    const match: Match = {
      id: crypto.randomUUID(),
      team1,
      team2,
      date,
    };
    return match;
  },
  updateMatchResult: (matchId, score1, score2) => {},
  setTournamentName: (name) => set({ tournamentName: name }),
  setTournamentType: (type) => set({ tournamentType: type }),
  setTeamName: (name) => set({ teamName: name }),
  setResponsible: (name) => set({ responsible: name }),
  addTeam: (team) => {
    let success = true;
    let error = '';

    set((state) => ({
      teams: [...state.teams, team]
    }));

    return { success, error };
  },
  removeTeam: (id) => set((state) => ({
    teams: state.teams.filter((team) => team.id !== id)
  })),
  generateMatches: () => ({ success: true })
}));
