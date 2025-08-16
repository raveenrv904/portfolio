import { groq } from "next-sanity";

export const featuredProjectsQuery = groq`
    *[_type == "project" && featured == true] |  order(publishedAtdesc)[0...3]{
    _id,
    title,
    slug,
    description,
    featuredImage,
    technologies,
    githubUrl,
    liveUrl,
    status,
    publishedAt
  }
`;

export const featuredAgencyProjectsQuery = groq`
  *[_type == "agencyProject" && featured == true] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    description,
    featuredImage,
    technologies,
    projectType,
    clientIndustry,
    myRole,
    publishedAt
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc){
    _id,
    title,
    slug,
    description,
    featuredImage,
    technologies,
    githubUrl,
    liveUrl,
    status,
    featured,
    publishedAt
  }
`;


export const agencyProjectsQuery = groq`
  *[_type == "agencyProject"] | order(publishedAt desc){
    _id,
    title,
    slug,
    description,
    featuredImage,
    technologies,
    projectType,
    clientIndustry,
    projectDuration,
    teamSize,
    myRole,
    featured,
    publishedAt
  }
`;
