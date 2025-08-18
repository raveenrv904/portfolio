import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    author,
    email,
    social,
    seo
  }
`;

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

export const skillsQuery = groq`
  *[_type == "skill"] | order(order asc, category asc, name asc){
    _id,
    name,
    category,
    description,
    featured,
    icon,
    relatedProjects[]->{
      _id,
      title,
      slug
    },
    relatedExperience[]->{
      _id,
      role,
      company
    }
  }
`;

export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc){
    _id,
    company,
    position,
    description,
    startDate,
    endDate,
    current,
    location,
    employmentType,
    technologies,
    achievements,
    companyLogo
  }
`;

export const educationQuery = groq`
  *[_type == "education"] | order(startDate desc){
    _id,
    institution,
    degree,
    field,
    description,
    startDate,
    endDate,
    current,
    location,
    gpa,
    achievements,
    institutionLogo
  }
`;
