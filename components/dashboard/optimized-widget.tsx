"use client";
import { memo } from "react";
import GithubStats from "./github-stats";
import GitCalender from "./git-calender";
import LanguageChart from "./language-chart";
import FeaturedProjects from "./featured-projects";
import FeaturedAgencyProjects from "./featured-agency-projects";

export const OptimizedGithubStats = memo(GithubStats);

export const OptimizedGitCalender = memo(GitCalender);

export const OptimizedLanguagesChart = memo(LanguageChart);

export const OptimizedFeaturedProject = memo(FeaturedProjects);

export const OptimizedFeaturedAgencyProject = memo(FeaturedAgencyProjects);
