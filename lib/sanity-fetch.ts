import client from "./sanity";
import { featuredAgencyProjectsQuery, featuredProjectsQuery } from "./sanity-queries";

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery);
}


export async function getFeaturedAgencyProjects() {
  return await client.fetch(featuredAgencyProjectsQuery);
}
