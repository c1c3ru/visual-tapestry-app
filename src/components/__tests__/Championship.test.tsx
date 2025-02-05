import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Championship from '../pages/Championship';
import { useTournamentStore } from '@/stores/useTournamentStore';
import { useToast } from '@/hooks/use-toast';

// Mock dos hooks
jest.mock('@/stores/useTournamentStore');
jest.mock('@/hooks/use-toast');

describe('Championship Component', () => {
  const mockToast = jest.fn();
  const mockAddTeam = jest.fn();
  const mockRemoveTeam = jest.fn();
  const mockGenerateMatches = jest.fn();

  beforeEach(() => {
    (useTournamentStore as jest.Mock).mockReturnValue({
      tournamentName: '',
      tournamentType: 'league',
      teamName: '',
      responsible: '',
      teams: [],
      groups: [],
      knockoutMatches: null,
      setTournamentName: jest.fn(),
      setTournamentType: jest.fn(),
      setTeamName: jest.fn(),
      setResponsible: jest.fn(),
      addTeam: mockAddTeam,
      removeTeam: mockRemoveTeam,
      generateMatches: mockGenerateMatches,
    });

    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
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
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Erro',
      description: 'Nome do torneio é obrigatório',
      variant: 'destructive',
    });
  });

  test('adds team successfully', async () => {
    render(<Championship />);
    const teamNameInput = screen.getByLabelText(/Nome do Time/i);
    const responsibleInput = screen.getByLabelText(/Responsável/i);
    const addButton = screen.getByText(/Adicionar Time/i);

    await userEvent.type(teamNameInput, 'Time Teste');
    await userEvent.type(responsibleInput, 'Responsável Teste');
    fireEvent.click(addButton);

    expect(mockAddTeam).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Time Adicionado',
      description: 'Novo time foi adicionado com sucesso.',
    });
  });

  test('generates matches with minimum teams', async () => {
    (useTournamentStore as jest.Mock).mockReturnValue({
      ...useTournamentStore(),
      teams: Array(4).fill({ id: '1', name: 'Time', responsible: 'Resp' }),
    });

    render(<Championship />);
    const generateButton = screen.getByText(/Gerar Partidas/i);
    fireEvent.click(generateButton);

    expect(mockGenerateMatches).toHaveBeenCalled();
  });
});