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
  };

  const mockTeamDrawStore = {
    playersPerTeam: 5,
    teams: [],
    setTeams: jest.fn(),
    setPlayersPerTeam: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (mockUsePlayerStore as jest.Mock).mockReturnValue(mockPlayerStore as PlayerState);
    (mockUseTeamDrawStore as jest.Mock).mockReturnValue(mockTeamDrawStore as TeamDrawState);
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
      ...mockTeamDrawStore,
      setTeams: mockSetTeams,
    } as TeamDrawState);

    render(<TeamDraw />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Sortear Times/i));
    });

    expect(mockSetTeams).toHaveBeenCalled();
  });

  test('changes players per team', async () => {
    const mockSetPlayersPerTeam = jest.fn();
    (mockUseTeamDrawStore as jest.Mock).mockReturnValue({
      ...mockTeamDrawStore,
      setPlayersPerTeam: mockSetPlayersPerTeam,
    } as TeamDrawState);

    render(<TeamDraw />);
    
    const select = screen.getByRole('combobox');
    await act(async () => {
      fireEvent.change(select, { target: { value: '4' } });
    });

    expect(mockSetPlayersPerTeam).toHaveBeenCalledWith(4);
  });
});