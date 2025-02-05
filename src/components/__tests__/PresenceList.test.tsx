import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PresenceList from '../PresenceList';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/stores/usePlayerStore');
jest.mock('@/stores/useSettingsStore');
jest.mock('@/hooks/use-toast');

describe('PresenceList', () => {
  const mockPlayers = [
    {
      id: 1,
      name: 'João',
      present: false,
      paid: false,
      isGuest: false,
      nickname: '',
      birthDate: '',
      sport: 'futebol',
      selectedPositions: [],
      rating: 1,
      includeInDraw: false,
      createdAt: '',
      registered: true,
      selected: false,
    }
  ];

  const mockToast = jest.fn();

  beforeEach(() => {
    (usePlayerStore as jest.Mock).mockReturnValue({
      players: mockPlayers,
      updatePlayer: jest.fn(),
      addPlayer: jest.fn(),
    });
    (useSettingsStore as jest.Mock).mockReturnValue({
      guestHighlight: 'orange',
    });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
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