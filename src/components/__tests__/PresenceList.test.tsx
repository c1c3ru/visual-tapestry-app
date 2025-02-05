import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PresenceList from '../PresenceList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';
import { PlayerState, SettingsState } from '@/utils/types';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

const mockUsePlayerStore = usePlayerStore as jest.MockedFunction<typeof usePlayerStore>;
const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;

describe('PresenceList', () => {
  const mockPlayers = [{
    id: 1,
    name: 'Test Player',
    nickname: 'Test',
    birthDate: '2000-01-01',
    isGuest: false,
    sport: 'futsal',
    selectedPositions: ['Goleiro'],
    rating: 5,
    includeInDraw: true,
    createdAt: '2024-01-01',
    selected: false,
    present: true,
    paid: true,
    registered: true
  }];

  const mockPlayerStore = {
    players: mockPlayers,
    updatePlayer: jest.fn(),
    removePlayer: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (mockUsePlayerStore as jest.Mock).mockReturnValue(mockPlayerStore as PlayerState);
    (mockUseSettingsStore as jest.Mock).mockReturnValue({
      guestHighlight: 'orange',
    } as SettingsState);
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  test('renders player list correctly', () => {
    render(<PresenceList />);
    expect(screen.getByText('Test Player')).toBeInTheDocument();
  });

  test('toggles player presence', async () => {
    const mockUpdatePlayer = jest.fn();
    (mockUsePlayerStore as jest.Mock).mockReturnValue({
      ...mockPlayerStore,
      updatePlayer: mockUpdatePlayer,
    } as PlayerState);

    render(<PresenceList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Ausente/i));
    });

    expect(mockUpdatePlayer).toHaveBeenCalledWith(1, { present: false });
  });

  test('toggles payment status', async () => {
    const mockUpdatePlayer = jest.fn();
    (mockUsePlayerStore as jest.Mock).mockReturnValue({
      ...mockPlayerStore,
      updatePlayer: mockUpdatePlayer,
    } as PlayerState);

    render(<PresenceList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Pendente/i));
    });

    expect(mockUpdatePlayer).toHaveBeenCalledWith(1, { paid: false });
  });
});