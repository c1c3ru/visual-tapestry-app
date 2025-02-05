import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Statistics from '../Statistics';
import { useStatisticsStore } from '@/stores/useStatisticsStore';
import { useToast } from '@/hooks/use-toast';
import { StatisticsState } from '@/utils/types';

jest.mock('@/stores/useStatisticsStore');
jest.mock('@/hooks/use-toast');

const mockUseStatisticsStore = useStatisticsStore as jest.MockedFunction<typeof useStatisticsStore>;

describe('Statistics', () => {
  const mockStore = {
    statistics: [
      {
        id: 1,
        name: 'Torneio 1',
        date: '2024-01-01',
        attendanceCount: 10,
        lastUpdated: '2024-01-02',
        pointRecords: [
          { points: 3, date: '2024-01-01' },
          { points: 2, date: '2024-01-02' },
        ],
      },
    ],
    updateStatistic: jest.fn(),
    removeStatistic: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (mockUseStatisticsStore as jest.Mock).mockReturnValue(mockStore as StatisticsState);
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
    (mockUseStatisticsStore as jest.Mock).mockReturnValue({
      ...mockStore,
      updateStatistic: mockUpdateStatistic,
    } as StatisticsState);

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
    (mockUseStatisticsStore as jest.Mock).mockReturnValue({
      ...mockStore,
      removeStatistic: mockRemoveStatistic,
    } as StatisticsState);

    render(<Statistics />);
    
    await act(async () => {
      const removeButton = screen.getByRole('button', { name: /trash/i });
      fireEvent.click(removeButton);
    });

    expect(mockRemoveStatistic).toHaveBeenCalledWith(0);
  });
});