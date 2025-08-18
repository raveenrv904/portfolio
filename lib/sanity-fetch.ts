import client from "./sanity";
import {
  agencyProjectsQuery,
  educationQuery,
  experienceQuery,
  featuredAgencyProjectsQuery,
  featuredProjectsQuery,
  projectsQuery,
  siteSettingsQuery,
  skillsQuery,
} from "./sanity-queries";

export async function getSiteSettings() {
  return await client.fetch(siteSettingsQuery);
}

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

export async function getSkills() {
  return await client.fetch(skillsQuery);
}

export async function getEducation() {
  return await client.fetch(educationQuery);
}

export async function getExperience() {
  return await client.fetch(experienceQuery);
}
