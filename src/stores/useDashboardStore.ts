
import { create } from 'zustand';
import { DashboardState } from '@/utils/types';

export const useDashboardStore = create<DashboardState>((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),
  dashboardTitle: 'Dashboard',
  isAdmin: true,
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
  setIsAdmin: (isAdmin) => set({ isAdmin })
}));
