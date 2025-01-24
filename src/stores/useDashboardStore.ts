import { create } from 'zustand';
import { DashboardState } from '../types/types';





export const useDashboardStore = create<DashboardState>((set) => ({
  id: '',
  dashboardTitle: 'Menu Inicial',
  isAdmin: true,
  isEditing: false,
  newTitle: '',
  menuItems: [],
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setNewTitle: (newTitle) => set({ newTitle }),

  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));

