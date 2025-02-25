import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddPlayerForm } from '../presence/AddPlayerForm';
import { useToast } from '@/hooks/use-toast';
import { Player, SportEnum } from '@/utils/types';

// Mock do useToast
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('AddPlayerForm', () => {
  const mockOnAddPlayer = jest.fn();
  const existingPlayers: Player[] = [
    {
      id: '1',
      name: "João",
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: SportEnum.SOCCER,
      selectedPositions: [],
      rating: 1,
      includeInDraw: false,
      createdAt: new Date().toISOString(),
      present: false,
      paid: false,
      registered: true,
      selected: false,
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<AddPlayerForm onAddPlayer={mockOnAddPlayer} players={[]} />);
    
    expect(screen.getByPlaceholderText('Digite o nome do novo jogador...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar jogador/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<AddPlayerForm onAddPlayer={mockOnAddPlayer} players={[]} />);
    
    const input = screen.getByPlaceholderText('Digite o nome do novo jogador...');
    fireEvent.change(input, { target: { value: 'Novo Jogador' } });
    
    const submitButton = screen.getByRole('button', { name: /adicionar jogador/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnAddPlayer).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Novo Jogador',
        sport: 'futebol',
      }));
    });
  });

  it('prevents duplicate player names', async () => {
    const { toast } = useToast();
    render(<AddPlayerForm onAddPlayer={mockOnAddPlayer} players={existingPlayers} />);
    
    const input = screen.getByPlaceholderText('Digite o nome do novo jogador...');
    fireEvent.change(input, { target: { value: 'João' } });
    
    const submitButton = screen.getByRole('button', { name: /adicionar jogador/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnAddPlayer).not.toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Erro",
        description: "Jogador já está cadastrado.",
      }));
    });
  });

  it('prevents empty player names', async () => {
    const { toast } = useToast();
    render(<AddPlayerForm onAddPlayer={mockOnAddPlayer} players={[]} />);
    
    const submitButton = screen.getByRole('button', { name: /adicionar jogador/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnAddPlayer).not.toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Erro",
        description: "O nome do jogador não pode estar vazio.",
      }));
    });
  });

  it('trims whitespace from player names', async () => {
    render(<AddPlayerForm onAddPlayer={mockOnAddPlayer} players={[]} />);
    
    const input = screen.getByPlaceholderText('Digite o nome do novo jogador...');
    fireEvent.change(input, { target: { value: '  Novo Jogador  ' } });
    
    const submitButton = screen.getByRole('button', { name: /adicionar jogador/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnAddPlayer).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Novo Jogador',
      }));
    });
  });
});