import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Championship from '../pages/Championship';
import { useTournamentStore } from '@/stores/useTournamentStore';
import { useToast } from '@/hooks/use-toast';
import { Tournament } from '@/utils/types';

jest.mock('@/stores/useTournamentStore');
jest.mock('@/hooks/use-toast');

const mockUseTournamentStore = useTournamentStore as jest.MockedFunction<typeof useTournamentStore>;

describe('Championship', () => {
  const mockStore = {
    tournamentName: '',
    tournamentType: 'league' as const,
    teamName: '',
    responsible: '',
    teams: [],
    groups: [],
    knockoutMatches: null,
    setTournamentName: jest.fn(),
    setTournamentType: jest.fn(),
    setTeamName: jest.fn(),
    setResponsible: jest.fn(),
    addTeam: jest.fn(),
    removeTeam: jest.fn(),
    generateMatches: jest.fn(),
  };

  beforeEach(() => {
    (mockUseTournamentStore as jest.Mock).mockImplementation(() => mockStore as unknown as Tournament);
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