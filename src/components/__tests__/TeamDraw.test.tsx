import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import TeamDraw from '../TeamDraw';
import { useTeamDrawStore } from '@/stores/useTeamDrawStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/stores/useTeamDrawStore');
jest.mock('@/stores/usePlayerStore');
jest.mock('@/hooks/use-toast');

describe('TeamDraw', () => {
  const mockPlayers = [
    {
      id: 1,
      name: 'João',
      selectedPositions: ['Goleiro'],
      rating: 5,
      includeInDraw: true,
      isGuest: false,
      nickname: '',
      birthDate: '',
      sport: 'futebol',
      createdAt: '',
      present: true,
      paid: true,
      registered: true,
      selected: false,
    },
    {
      id: 2,
      name: 'Pedro',
      selectedPositions: ['Atacante'],
      rating: 4,
      includeInDraw: true,
      isGuest: false,
      nickname: '',
      birthDate: '',
      sport: 'futebol',
      createdAt: '',
      present: true,
      paid: true,
      registered: true,
      selected: false,
    }
  ];

  beforeEach(() => {
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
    });
    (useTeamDrawStore as jest.Mock).mockReturnValue({
      playersPerTeam: 5,
      teams: [],
      setTeams: jest.fn(),
      setPlayersPerTeam: jest.fn(),
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  test('renders team draw interface', () => {
    render(<TeamDraw />);
    expect(screen.getByText(/Sorteio de Times/i)).toBeInTheDocument();
    expect(screen.getByText(/Jogadores por Time/i)).toBeInTheDocument();
  });

  test('generates teams', async () => {
    const mockSetTeams = jest.fn();
    (useTeamDrawStore as jest.Mock).mockReturnValue({
      playersPerTeam: 2,
      teams: [],
      setTeams: mockSetTeams,
      setPlayersPerTeam: jest.fn(),
    });

    render(<TeamDraw />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Sortear Times/i));
    });

    expect(mockSetTeams).toHaveBeenCalled();
  });

  test('changes players per team', async () => {
    const mockSetPlayersPerTeam = jest.fn();
    (useTeamDrawStore as jest.Mock).mockReturnValue({
      playersPerTeam: 5,
      teams: [],
      setTeams: jest.fn(),
      setPlayersPerTeam: mockSetPlayersPerTeam,
    });

    render(<TeamDraw />);
    
    const select = screen.getByRole('combobox');
    await act(async () => {
      fireEvent.change(select, { target: { value: '4' } });
    });

    expect(mockSetPlayersPerTeam).toHaveBeenCalledWith(4);
  });

  test('displays generated teams', () => {
    const mockTeams = [
      [mockPlayers[0]],
      [mockPlayers[1]]
    ];
    
    (useTeamDrawStore as jest.Mock).mockReturnValue({
      playersPerTeam: 1,
      teams: mockTeams,
      setTeams: jest.fn(),
      setPlayersPerTeam: jest.fn(),
    });

    render(<TeamDraw />);
    
    expect(screen.getByText('Time 1')).toBeInTheDocument();
    expect(screen.getByText('Time 2')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Pedro')).toBeInTheDocument();
  });
});