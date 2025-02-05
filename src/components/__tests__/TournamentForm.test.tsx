import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TournamentForm } from '../tournament/TournamentForm';

describe('TournamentForm Component', () => {
  const mockOnTournamentNameChange = jest.fn();
  const mockOnTournamentTypeChange = jest.fn();

  const defaultProps = {
    tournamentName: '',
    tournamentType: 'league' as const,
    onTournamentNameChange: mockOnTournamentNameChange,
    onTournamentTypeChange: mockOnTournamentTypeChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tournament form fields', () => {
    render(<TournamentForm {...defaultProps} />);
    expect(screen.getByLabelText(/Nome do Torneio/i)).toBeInTheDocument();
    expect(screen.getByText(/Tipo de Torneio/i)).toBeInTheDocument();
  });

  test('handles tournament name change', () => {
    render(<TournamentForm {...defaultProps} />);
    const input = screen.getByLabelText(/Nome do Torneio/i);
    fireEvent.change(input, { target: { value: 'Novo Torneio' } });
    expect(mockOnTournamentNameChange).toHaveBeenCalledWith('Novo Torneio');
  });

  test('handles tournament type change', () => {
    render(<TournamentForm {...defaultProps} />);
    const worldCupOption = screen.getByLabelText(/Copa do Mundo/i);
    fireEvent.click(worldCupOption);
    expect(mockOnTournamentTypeChange).toHaveBeenCalledWith('worldCup');
  });
});