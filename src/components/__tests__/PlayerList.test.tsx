import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PlayerList from '../PlayerList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

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
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
      updatePlayer: jest.fn(),
      removePlayer: jest.fn(),
      editingPlayer: null,
      setEditingPlayer: jest.fn(),
      editValue: '',
      setEditValue: jest.fn(),
    });
    (useSettingsStore as jest.Mock).mockReturnValue({
      guestHighlight: 'orange',
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