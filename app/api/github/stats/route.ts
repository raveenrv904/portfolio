/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
      return NextResponse.json(
        { error: "GitHub username not configured" },
        { status: 500 }
      );
    }

    const { data: user } = await octokit.rest.users.getByUsername({
      username,
    });

    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      visibility: "all",
      per_page: 100,
      sort: "updated",
    });

    const publicRepos = repos.filter((repo) => !repo.private).length;
    const privateRepos = repos.filter((repo) => repo.private).length;

    const totalStars = repos.reduce(
      (acc: any, repo: any) => acc + repo.stargazers_count,
      0
    );

    const languages: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const stats = {
      public_repos: publicRepos,
      private_repos: privateRepos,
      total_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      total_stars: totalStars,
      languages,
      avatar_url: user.avatar_url,
      bio: user.bio,
      location: user.location,
    };

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats", main: error },
      { status: 500 }
    );
  }
}
