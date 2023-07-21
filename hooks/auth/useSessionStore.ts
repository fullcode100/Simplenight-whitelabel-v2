import { create } from 'zustand';

export interface SessionStore {
  token: string | null;
  setToken: (token: string) => void;
  clear(): void;
}

export const useSessionStore = create<SessionStore>()((set) => ({
  token: null,
  setToken: (token: string) => {
    set(() => ({
      token: token,
    }));
  },
  clear: () => set(() => ({ token: null })),
}));
