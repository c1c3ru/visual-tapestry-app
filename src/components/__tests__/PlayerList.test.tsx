import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PlayerList from '../PlayerList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

const mockUsePlayerStore = usePlayerStore as jest.MockedFunction<typeof usePlayerStore>;
const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;

describe('PlayerList', () => {
  const mockPlayers = [
    {
      id: 1,
      name: 'João',
      nickname: 'Jo',
      sport: 'futebol',
      selectedPositions: ['Goleiro'],
      rating: 1,
      isGuest: false,
      birthDate: '',
      includeInDraw: false,
      createdAt: '',
      present: false,
      paid: false,
      registered: true,
      selected: false,
    }
  ];

  beforeEach(() => {
    mockUsePlayerStore.mockReturnValue({
      players: mockPlayers,
      updatePlayer: jest.fn(),
      removePlayer: jest.fn(),
      editingPlayer: null,
      setEditingPlayer: jest.fn(),
      editValue: '',
      setEditValue: jest.fn(),
    });

    mockUseSettingsStore.mockReturnValue({
      guestHighlight: 'orange',
      ratingSystem: 'stars',
      setGuestHighlight: jest.fn(),
      setRatingSystem: jest.fn(),
    });

    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
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