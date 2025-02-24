
import { create } from 'zustand';
import { DashboardState } from '@/utils/types';

export const useMenuStore = create<DashboardState>((set) => ({
  currentPage: 'menu',
  setCurrentPage: (page) => set({ currentPage: page }),
  dashboardTitle: 'Menu',
  isAdmin: true,
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
  setIsAdmin: (isAdmin) => set({ isAdmin })
}));
