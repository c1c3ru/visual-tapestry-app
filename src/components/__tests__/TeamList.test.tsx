
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeamList from '../tournament/TeamList';
import { createMockTeam } from './test-utils';

describe('TeamList Component', () => {
  const mockTeams = [
    createMockTeam(),
    { ...createMockTeam(), id: '2', name: 'Time 2', responsible: 'Resp 2' }
  ];

  const mockOnRemoveTeam = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders team list correctly', () => {
    render(<TeamList teams={mockTeams} onRemoveTeam={mockOnRemoveTeam} />);
    expect(screen.getByText('Time 1')).toBeInTheDocument();
    expect(screen.getByText('Time 2')).toBeInTheDocument();
  });

  test('calls onRemoveTeam when remove button is clicked', () => {
    render(<TeamList teams={mockTeams} onRemoveTeam={mockOnRemoveTeam} />);
    const removeButtons = screen.getAllByRole('button');
    fireEvent.click(removeButtons[0]);
    expect(mockOnRemoveTeam).toHaveBeenCalledWith('1');
  });

  test('renders empty state when no teams', () => {
    render(<TeamList teams={[]} onRemoveTeam={mockOnRemoveTeam} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
