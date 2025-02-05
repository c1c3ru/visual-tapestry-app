import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PlayerList from '../PlayerList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';
import { PlayerState, SettingsState } from '@/utils/types';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

const mockUsePlayerStore = usePlayerStore as jest.MockedFunction<typeof usePlayerStore>;
const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;

describe('PlayerList', () => {
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
    editingPlayer: null,
    setEditingPlayer: jest.fn(),
    editValue: '',
    setEditValue: jest.fn(),
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
    render(<PlayerList />);
    expect(screen.getByText('Test Player')).toBeInTheDocument();
    expect(screen.getByText(/Goleiro/i)).toBeInTheDocument();
  });

  test('edits player name', async () => {
    const mockSetEditingPlayer = jest.fn();
    (mockUsePlayerStore as jest.Mock).mockReturnValue({
      ...mockPlayerStore,
      editingPlayer: { id: 1 },
      setEditingPlayer: mockSetEditingPlayer,
    } as PlayerState);

    render(<PlayerList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Editar/i));
    });

    expect(mockSetEditingPlayer).toHaveBeenCalledWith({ id: 1 });
  });

  test('removes player', async () => {
    const mockRemovePlayer = jest.fn();
    (mockUsePlayerStore as jest.Mock).mockReturnValue({
      ...mockPlayerStore,
      removePlayer: mockRemovePlayer,
    } as PlayerState);

    render(<PlayerList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Remover/i));
    });

    expect(mockRemovePlayer).toHaveBeenCalledWith(1);
  });
});