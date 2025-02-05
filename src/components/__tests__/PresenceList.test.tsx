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
const mockToast = jest.fn();

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
  } as unknown as PlayerState;

  const mockSettingsStore = {
    guestHighlight: 'orange',
    ratingSystem: 'stars',
  } as unknown as SettingsState;

  beforeEach(() => {
    (mockUsePlayerStore as jest.Mock).mockReturnValue(mockPlayerStore);
    (mockUseSettingsStore as jest.Mock).mockReturnValue(mockSettingsStore);
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders player list correctly', () => {
    render(<PresenceList />);
    expect(screen.getByText('Test Player')).toBeInTheDocument();
  });

  test('toggles player presence', async () => {
    const mockUpdatePlayer = jest.fn();
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
      updatePlayer: mockUpdatePlayer,
    });

    render(<PresenceList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Ausente/i));
    });

    expect(mockUpdatePlayer).toHaveBeenCalledWith(1, { present: true });
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Presença atualizada',
    }));
  });

  test('toggles payment status', async () => {
    const mockUpdatePlayer = jest.fn();
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
      updatePlayer: mockUpdatePlayer,
    });

    render(<PresenceList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Pendente/i));
    });

    expect(mockUpdatePlayer).toHaveBeenCalledWith(1, { paid: true });
  });
});
