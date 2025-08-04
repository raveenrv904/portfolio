import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface GitHubStats {
  public_repos: number;
  private_repos: number;
  total_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  languages: Record<string, number>;
  avatar_url: string;
  bio: string;
  location: string;
}

interface APIState {
  githubStats: GitHubStats | null;
  githubLoading: boolean;
  githubError: string | null;

  githubLastFetch: number | null;

  setGitHubStats: (stats: GitHubStats) => void;
  setGitHubLoading: (loading: boolean) => void;
  setGitHubError: (error: string | null) => void;
  clearCache: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000;

export const useGitStore = create<APIState>()(
  subscribeWithSelector((set, get) => ({
    githubStats: null,
    githubLoading: false,
    githubError: null,
    githubLastFetch: null,

    setGitHubStats: (stats) => {
      const current = get().githubStats;
      if (!current || JSON.stringify(current) !== JSON.stringify(stats)) {
        set({
          githubStats: stats,
          githubLastFetch: Date.now(),
          githubError: null,
        });
      }
    },

    setGitHubLoading: (loading) => {
      const current = get().githubLoading;
      if (current !== loading) {
        set({ githubLoading: loading });
      }
    },

    setGitHubError: (error) => {
      const current = get().githubError;
      if (current !== error) {
        set({ githubError: error, githubLoading: false });
      }
    },

    clearCache: () => {
      set({
        githubStats: null,
        githubLastFetch: null,
        githubError: null,
      });
    },
  }))
);

export const isCacheValid = (lastFetch: number | null): boolean => {
  if (!lastFetch) return false;
  return Date.now() - lastFetch < CACHE_DURATION;
};
