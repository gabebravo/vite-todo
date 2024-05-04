import { create } from 'zustand';

type State = {
  theme: string;
};

type Action = {
  toggleTheme: () => void;
};

export const useThemeState = create<State & Action>()((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
