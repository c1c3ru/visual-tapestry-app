
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PlayerList from '../PlayerList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';
import { PlayerState, SettingsState } from '@/utils/types';
import { createMockPlayer } from './test-utils';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

describe('PlayerList', () => {
  const mockPlayer = createMockPlayer();

  const mockPlayerStore: Partial<PlayerState> = {
    players: [mockPlayer],
    updatePlayer: jest.fn(),
    removePlayer: jest.fn(),
    editingPlayer: null,
    setEditingPlayer: jest.fn(),
    editValue: '',
    setEditValue: jest.fn(),
  };

  const mockSettingsStore: Partial<SettingsState> = {
    ratingSystem: 'stars',
    guestHighlight: 'color',
    setRatingSystem: jest.fn(),
    setGuestHighlight: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (usePlayerStore as unknown as jest.Mock).mockReturnValue(mockPlayerStore);
    (useSettingsStore as unknown as jest.Mock).mockReturnValue(mockSettingsStore);
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  test('renders player list correctly', () => {
    render(<PlayerList />);
    expect(screen.getByText(mockPlayer.name)).toBeInTheDocument();
  });

  test('handles player edit', async () => {
    const setEditingPlayer = jest.fn();
    (usePlayerStore as unknown as jest.Mock).mockReturnValue({
      ...mockPlayerStore,
      setEditingPlayer,
    });

    render(<PlayerList />);
    const editButton = screen.getByText(/Editar/i);
    await act(async () => {
      fireEvent.click(editButton);
    });

    expect(setEditingPlayer).toHaveBeenCalled();
  });
});
