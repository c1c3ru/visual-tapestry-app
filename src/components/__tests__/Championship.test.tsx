import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Championship from '../pages/Championship';
import { useTournamentStore } from '@/stores/useTournamentStore';
import { useToast } from '@/hooks/use-toast';
import { TournamentState } from '@/utils/types';

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
    (mockUseTournamentStore as jest.Mock).mockImplementation(() => mockStore);
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
    await userEvent.type(nameInput, '');
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

    expect(mockStore.addTeam).toHaveBeenCalled();
    expect(mockStore.addTeam).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Time Teste',
      responsible: 'Responsável Teste',
    }));
  });

  test('generates matches with minimum teams', async () => {
    const mockTeams = Array(4).fill({ id: '1', name: 'Time', responsible: 'Resp' });
    mockStore.teams = mockTeams;
    (useTournamentStore as jest.Mock).mockReturnValue({
      ...mockStore,
      teams: mockTeams,
    });

    render(<Championship />);
    const generateButton = screen.getByText(/Gerar Partidas/i);
    
    await act(async () => {
      fireEvent.click(generateButton);
    });

    expect(mockStore.generateMatches).toHaveBeenCalled();
  });

  test('prevents adding team when fields are empty', async () => {
    render(<Championship />);
    const addButton = screen.getByText(/Adicionar Time/i);

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(mockStore.addTeam).not.toHaveBeenCalled();
  });

  test('shows validation error when teams count is invalid', async () => {
    mockStore.teams = Array(3).fill({ id: '1', name: 'Time', responsible: 'Resp' });
    (useTournamentStore as jest.Mock).mockReturnValue(mockStore);

    render(<Championship />);
    
    expect(screen.getByText(/Mínimo de 4 times necessário/i)).toBeInTheDocument();
  });
});
