/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEducation, getExperience } from "@/lib/sanity-fetch";
import { TimelineItem } from "@/store/timeline-store";
import React from "react";
import Timeline from "./timeline";

const MainContent = async () => {
  const [experienceData, educationData] = await Promise.all([
    getExperience(),
    getEducation(),
  ]);

  const combinedItems: TimelineItem[] = [
    ...experienceData.map((exp: any) => ({
      ...exp,
      type: "experience" as const,
      title: exp.position,
      subtitle: exp.company,
      logo: exp.companyLogo,
    })),
    ...educationData.map((edu: any) => ({
      ...edu,
      type: "education" as const,
      title: edu.degree,
      subtitle: edu.institution,
      logo: edu.institutionLogo,
    })),
  ].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  return (
    <>
      <Timeline items={combinedItems} />
    </>
  );
};

export default MainContent;
