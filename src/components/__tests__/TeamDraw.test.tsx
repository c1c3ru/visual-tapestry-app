import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import TeamDraw from '../TeamDraw';
import { useTeamDrawStore } from '@/stores/useTeamDrawStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useToast } from '@/hooks/use-toast';
import { PlayerState, TeamDrawState } from '@/utils/types';

jest.mock('@/stores/useTeamDrawStore');
jest.mock('@/stores/usePlayerStore');
jest.mock('@/hooks/use-toast');

const mockUseTeamDrawStore = useTeamDrawStore as jest.MockedFunction<typeof useTeamDrawStore>;
const mockUsePlayerStore = usePlayerStore as jest.MockedFunction<typeof usePlayerStore>;

describe('TeamDraw', () => {
  const mockPlayerStore = {
    players: [],
  } as unknown as PlayerState;

  const mockTeamDrawStore = {
    playersPerTeam: 5,
    teams: [],
    setTeams: jest.fn(),
    setPlayersPerTeam: jest.fn(),
  } as unknown as TeamDrawState;

  beforeEach(() => {
    (mockUsePlayerStore as jest.Mock).mockImplementation(() => mockPlayerStore);
    (mockUseTeamDrawStore as jest.Mock).mockImplementation(() => mockTeamDrawStore);
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
    (mockUseTeamDrawStore as jest.Mock).mockReturnValue({
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
    (mockUseTeamDrawStore as jest.Mock).mockReturnValue({
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
      [{ id: 1, name: 'João', rating: 5 }],
      [{ id: 2, name: 'Maria', rating: 4 }]
    ];
    
    (mockUseTeamDrawStore as jest.Mock).mockReturnValue({
      playersPerTeam: 1,
      teams: mockTeams,
      setTeams: jest.fn(),
      setPlayersPerTeam: jest.fn(),
    });

    render(<TeamDraw />);
    
    expect(screen.getByText('Time 1')).toBeInTheDocument();
    expect(screen.getByText('Time 2')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });
});
