
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Championship from '../pages/Championship';
import { useTournamentStore } from '@/stores/useTournamentStore';
import { useToast } from '@/hooks/use-toast';
import { TournamentState, TournamentType } from '@/utils/types';

jest.mock('@/stores/useTournamentStore');
jest.mock('@/hooks/use-toast');

describe('Championship', () => {
  const mockStore: Partial<TournamentState> = {
    tournamentName: '',
    tournamentType: TournamentType.LEAGUE,
    teamName: '',
    responsible: '',
    teams: [],
    groups: [],
    matches: [],
    knockoutMatches: null,
    setTournamentName: jest.fn(),
    setTournamentType: jest.fn(),
    setTeamName: jest.fn(),
    setResponsible: jest.fn(),
    addTeam: jest.fn(),
    removeTeam: jest.fn(),
    generateMatches: jest.fn(),
    generateGroups: jest.fn(),
    generateKnockoutStage: jest.fn(),
    scheduleMatch: jest.fn(),
    updateMatchResult: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (useTournamentStore as jest.Mock).mockReturnValue(mockStore as TournamentState);
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  test('renders championship form', () => {
    render(<Championship />);
    expect(screen.getByText(/Campeonato/i)).toBeInTheDocument();
  });

  test('validates tournament name input', async () => {
    render(<Championship />);
    const nameInput = screen.getByLabelText(/Nome do Torneio/i);
    await act(async () => {
      await userEvent.type(nameInput, '');
    });
    expect(mockStore.addTeam).not.toHaveBeenCalled();
  });

  test('adds team successfully', async () => {
    render(<Championship />);
    const teamNameInput = screen.getByLabelText(/Nome do Time/i);
    const responsibleInput = screen.getByLabelText(/Responsável/i);
    const addButton = screen.getByText(/Adicionar Time/i);

    await act(async () => {
      await userEvent.type(teamNameInput, 'Time Teste');
      await userEvent.type(responsibleInput, 'Responsável Teste');
      fireEvent.click(addButton);
    });

    expect(mockStore.addTeam).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Time Teste',
      responsible: 'Responsável Teste',
    }));
  });
});
