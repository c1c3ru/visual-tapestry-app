import { create } from 'zustand';

interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ratingSystem: localStorage.getItem('ratingSystem') || 'stars',
  guestHighlight: localStorage.getItem('guestHighlight') || 'orange',
  setRatingSystem: (system) => {
    localStorage.setItem('ratingSystem', system);
    set({ ratingSystem: system });
  },
  setGuestHighlight: (highlight) => {
    localStorage.setItem('guestHighlight', highlight);
    set({ guestHighlight: highlight });
  },
}));