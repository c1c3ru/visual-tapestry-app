import { create } from 'zustand';

interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (color: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ratingSystem: localStorage.getItem('ratingSystem') || 'stars',
  guestHighlight: localStorage.getItem('guestHighlight') || 'orange',
  setRatingSystem: (system) => {
    localStorage.setItem('ratingSystem', system);
    set({ ratingSystem: system });
  },
  setGuestHighlight: (color) => {
    localStorage.setItem('guestHighlight', color);
    set({ guestHighlight: color });
  },
}));