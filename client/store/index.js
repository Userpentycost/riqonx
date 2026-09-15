import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  logout: () => set({ user: null, token: null }),
}));

export const useAnalysisStore = create((set) => ({
  analyses: [],
  currentAnalysis: null,
  isLoading: false,

  setAnalyses: (analyses) => set({ analyses }),
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  setLoading: (isLoading) => set({ isLoading }),

  addAnalysis: (analysis) => set((state) => ({
    analyses: [analysis, ...state.analyses],
  })),
}));

export const useChannelStore = create((set) => ({
  channels: [],
  currentChannel: null,
  isLoading: false,

  setChannels: (channels) => set({ channels }),
  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setLoading: (isLoading) => set({ isLoading }),

  addChannel: (channel) => set((state) => ({
    channels: [channel, ...state.channels],
  })),
}));
