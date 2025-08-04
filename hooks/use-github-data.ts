import { isCacheValid, useGitStore } from "@/store/git-store";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGithubStats() {
  const {
    githubStats,
    githubLoading,
    githubError,
    githubLastFetch,
    setGitHubStats,
    setGitHubLoading,
    setGitHubError,
  } = useGitStore();

  const shouldFetch = !githubStats || !isCacheValid(githubLastFetch);

  const { data, error, isLoading } = useSWR(
    shouldFetch ? "/api/github/stats" : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  );

  useEffect(() => {
    if (
      data &&
      !error &&
      JSON.stringify(data) !== JSON.stringify(githubStats)
    ) {
      setGitHubStats(data);
    }
  }, [data, error, githubStats, setGitHubStats]);

  useEffect(() => {
    if (error && !githubError) {
      setGitHubError(error.message);
    }
  }, [error, githubError, setGitHubError]);

  useEffect(() => {
    if (isLoading !== githubLoading) {
      setGitHubLoading(isLoading);
    }
  }, [isLoading, githubLoading, setGitHubLoading]);

  return {
    stats: githubStats,
    loading: isLoading || githubLoading,
    error: error?.message || githubError,
  };
}

export function useGitHubContributions() {
  const { data, error, isLoading } = useSWR(
    "/api/github/contributions",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 3600000,
    }
  );

  return {
    username: data?.username,
    loading: isLoading,
    error: error?.message,
  };
}
