
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Championship from '../pages/Championship';
import { useTournamentStore, TournamentState } from '@/stores/useTournamentStore';
import { useToast } from '@/hooks/use-toast';
import { createMockTeam } from './test-utils';

jest.mock('@/stores/useTournamentStore');
jest.mock('@/hooks/use-toast');

describe('Championship', () => {
  const mockStore: Partial<TournamentState> = {
    tournamentName: '',
    tournamentType: 'league',
    teams: [],
    groups: [],
    matches: [],
    knockoutMatches: null,
    generateGroups: jest.fn(),
    generateKnockoutStage: jest.fn(),
    scheduleMatch: jest.fn(),
    updateMatchResult: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (useTournamentStore as unknown as jest.Mock).mockReturnValue(mockStore);
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  test('renders championship form', () => {
    render(<Championship />);
    expect(screen.getByText(/Campeonato/i)).toBeInTheDocument();
  });

  test('adds team successfully', async () => {
    const addTeam = jest.fn();
    (useTournamentStore as unknown as jest.Mock).mockReturnValue({
      ...mockStore,
      addTeam,
    });

    render(<Championship />);
    
    const teamNameInput = screen.getByLabelText(/Nome do Time/i);
    const responsibleInput = screen.getByLabelText(/Responsável/i);
    const addButton = screen.getByText(/Adicionar Time/i);

    await act(async () => {
      await userEvent.type(teamNameInput, 'Time Teste');
      await userEvent.type(responsibleInput, 'Responsável Teste');
      fireEvent.click(addButton);
    });

    expect(addTeam).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Time Teste',
      responsible: 'Responsável Teste',
    }));
  });
});
