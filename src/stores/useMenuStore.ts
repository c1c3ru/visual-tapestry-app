
import { create } from 'zustand';

interface MenuState {
  menuTitle: string;
  isAdmin: boolean;
  setMenuTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuTitle: 'Menu',
  isAdmin: false,
  setMenuTitle: (title) => set({ menuTitle: title }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
