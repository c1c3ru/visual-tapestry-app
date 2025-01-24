import { create } from 'zustand';
import { types } from 'util';
import { DashboardState } from '../types/types';





export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardTitle: 'Dashboard',
  isAdmin: true,
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));