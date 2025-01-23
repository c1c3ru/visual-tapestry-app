import { create } from 'zustand';
interface PointRecord {
  points: number;
  date: string;
}

interface Statistic {
  name: string;
  date: string;
  attendanceCount: number;
  pointRecords: PointRecord[];
  lastUpdated: string;
}

interface StatisticsState {
  statistics: Statistic[];
  setStatistics: (statistics: Statistic[]) => void;
  updateStatistic: (index: number, updatedStatistic: Partial<Statistic>) => void;
  addStatistic: (statistic: Statistic) => void;
  removeStatistic: (index: number) => void;
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
  statistics: [],
  setStatistics: (statistics) => set({ statistics }),
  updateStatistic: (index, updatedStatistic) =>
    set((state) => ({
      statistics: state.statistics.map((stat, i) =>
        i === index ? { ...stat, ...updatedStatistic } : stat
      ),
    })),
  addStatistic: (statistic) =>
    set((state) => ({
      statistics: [...state.statistics, statistic],
    })),
  removeStatistic: (index) =>
    set((state) => ({
      statistics: state.statistics.filter((_, i) => i !== index),
    })),
}));