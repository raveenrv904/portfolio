import React from "react";
import { getSkills } from "@/lib/sanity-fetch";
import SkillList from "@/components/skills/skill-list";
import TitleCard from "@/components/common/title-card";
import { Container } from "@/components/ui/container";

// export const revalidate = 60;

const SkillsPage = async () => {
  const skills = await getSkills();

  return (
    <Container>
      <TitleCard
        title="Skills"
        description="A comprehensive overview of my technical skills, tools, and technologies I work with to build exceptional digital experiences."
      />

      <section className="relative">
        <div className="max-w-7xl mx-auto pb-20">
          <SkillList skills={skills} />
        </div>
      </section>
    </Container>
  );
};

export default SkillsPage;
