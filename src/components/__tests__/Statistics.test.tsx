import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Statistics from '../Statistics';
import { useStatisticsStore } from '@/stores/useStatisticsStore';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/stores/useStatisticsStore');
jest.mock('@/hooks/use-toast');

describe('Statistics', () => {
  const mockStatistics = [
    {
      name: 'Torneio 1',
      date: '2024-01-01',
      attendanceCount: 10,
      pointRecords: [
        { points: 3, date: '2024-01-01' }
      ],
      lastUpdated: '2024-01-01',
    }
  ];

  beforeEach(() => {
    (useStatisticsStore as jest.Mock).mockReturnValue({
      statistics: mockStatistics,
      updateStatistic: jest.fn(),
      removeStatistic: jest.fn(),
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  test('renders statistics correctly', () => {
    render(<Statistics />);
    expect(screen.getByText('Torneio 1')).toBeInTheDocument();
    expect(screen.getByText(/3 pontos/i)).toBeInTheDocument();
  });

  test('edits point record', async () => {
    const mockUpdateStatistic = jest.fn();
    (useStatisticsStore as jest.Mock).mockReturnValue({
      statistics: mockStatistics,
      updateStatistic: mockUpdateStatistic,
    });

    render(<Statistics />);
    
    await act(async () => {
      const editButton = screen.getByRole('button', { name: /edit/i });
      fireEvent.click(editButton);
    });

    const input = screen.getByRole('textbox');
    await act(async () => {
      await userEvent.type(input, '5');
      const saveButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(saveButton);
    });

    expect(mockUpdateStatistic).toHaveBeenCalled();
  });

  test('removes statistic', async () => {
    const mockRemoveStatistic = jest.fn();
    (useStatisticsStore as jest.Mock).mockReturnValue({
      statistics: mockStatistics,
      removeStatistic: mockRemoveStatistic,
    });

    render(<Statistics />);
    
    await act(async () => {
      const removeButton = screen.getByRole('button', { name: /trash/i });
      fireEvent.click(removeButton);
    });

    expect(mockRemoveStatistic).toHaveBeenCalledWith(0);
  });
});