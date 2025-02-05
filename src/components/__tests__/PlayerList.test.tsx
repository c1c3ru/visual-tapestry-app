import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PlayerList from '../PlayerList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';
import { PlayerState, SettingsState, Player } from '@/utils/types';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

const mockUsePlayerStore = usePlayerStore as jest.MockedFunction<typeof usePlayerStore>;
const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;

const mockPlayers: Player[] = [
  {
    id: 1,
    name: 'João',
    nickname: 'Jo',
    birthDate: '1990-01-01',
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
  }
];

describe('PlayerList', () => {
  const mockPlayerStore: Partial<PlayerState> = {
    players: mockPlayers,
    updatePlayer: jest.fn(),
    removePlayer: jest.fn(),
  };

  const mockSettingsStore: Partial<SettingsState> = {
    guestHighlight: 'orange',
    ratingSystem: 'stars',
  };

  beforeEach(() => {
    mockUsePlayerStore.mockReturnValue(mockPlayerStore as PlayerState);
    mockUseSettingsStore.mockReturnValue(mockSettingsStore as SettingsState);
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders player list correctly', () => {
    render(<PlayerList />);
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText(/Goleiro/i)).toBeInTheDocument();
  });

  test('edits player name', async () => {
    const mockUpdatePlayer = jest.fn();
    const mockSetEditingPlayer = jest.fn();
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
      updatePlayer: mockUpdatePlayer,
      editingPlayer: { id: 1 },
      setEditingPlayer: mockSetEditingPlayer,
      editValue: 'João Silva',
      setEditValue: jest.fn(),
    });

    render(<PlayerList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Editar/i));
    });

    expect(mockSetEditingPlayer).toHaveBeenCalledWith({ id: 1 });
  });

  test('removes player', async () => {
    const mockRemovePlayer = jest.fn();
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
      removePlayer: mockRemovePlayer,
      editingPlayer: null,
      setEditingPlayer: jest.fn(),
      editValue: '',
      setEditValue: jest.fn(),
    });

    render(<PlayerList />);
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Remover/i));
    });

    expect(mockRemovePlayer).toHaveBeenCalledWith(1);
  });
});