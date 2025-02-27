
import { create } from 'zustand';
import { Player, PositionEnum, RatingEnum } from '@/utils/types';

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
  generatePlayerStats: (players: Player[]) => any[];
  generatePositionStats: (players: Player[]) => any[];
  generateRatingStats: (players: Player[]) => any[];
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
  generatePlayerStats: (players) => {
    // Retorna estatísticas de presença para cada jogador
    return players.map(player => ({
      name: player.name,
      presences: Math.floor(Math.random() * 10) + 1, // Simulação de dados
      absences: Math.floor(Math.random() * 5),       // Simulação de dados
    }));
  },
  generatePositionStats: (players) => {
    // Agrupa jogadores por posição
    const positions: Record<string, number> = {};
    
    players.forEach(player => {
      player.selectedPositions.forEach(position => {
        if (!positions[position]) {
          positions[position] = 0;
        }
        positions[position]++;
      });
    });
    
    // Converte para o formato esperado pelo gráfico
    return Object.entries(positions).map(([position, count]) => ({
      name: position,
      value: count
    }));
  },
  generateRatingStats: (players) => {
    // Agrupa jogadores por rating
    const ratings: Record<string, number> = {};
    
    players.forEach(player => {
      const ratingKey = `Nível ${player.rating}`;
      if (!ratings[ratingKey]) {
        ratings[ratingKey] = 0;
      }
      ratings[ratingKey]++;
    });
    
    // Converte para o formato esperado pelo gráfico
    return Object.entries(ratings).map(([rating, count]) => ({
      name: rating,
      value: count
    }));
  }
}));
