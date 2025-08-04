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
