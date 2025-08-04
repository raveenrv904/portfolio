/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
      return NextResponse.json(
        { error: "GitHub username not configured" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { username },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error: any) {
    console.error("GitHub Contributions API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
