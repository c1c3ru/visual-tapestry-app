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
  const mockPlayerStore: Partial<PlayerState> = {
    players: [],
    updatePlayer: jest.fn(),
    removePlayer: jest.fn(),
  };

  const mockSettingsStore: Partial<SettingsState> = {
    guestHighlight: 'orange',
    ratingSystem: 'stars',
  };

  beforeEach(() => {
    (mockUsePlayerStore as jest.Mock).mockImplementation(() => mockPlayerStore);
    (mockUseSettingsStore as jest.Mock).mockImplementation(() => mockSettingsStore);
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders player list correctly', () => {
    render(<PresenceList />);
    expect(screen.getByText('João')).toBeInTheDocument();
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
