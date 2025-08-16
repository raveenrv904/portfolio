import client from "./sanity";
import {
  agencyProjectsQuery,
  featuredAgencyProjectsQuery,
  featuredProjectsQuery,
  projectsQuery,
} from "./sanity-queries";

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery);
}

export async function getFeaturedAgencyProjects() {
  return await client.fetch(featuredAgencyProjectsQuery);
}

export async function getProjects() {
  return await client.fetch(projectsQuery);
}

export async function getAgencyProjects() {
  return await client.fetch(agencyProjectsQuery);
}
