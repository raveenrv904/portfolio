import GridSkeleton from "@/components/common/grid-skeleton";
import TitleCard from "@/components/common/title-card";
import ProjectContent from "@/components/projects/main-content";
import { Container } from "@/components/ui/container";
import React, { Suspense } from "react";

const Projects = () => {
  return (
    <Container className="md:py-8">
      <TitleCard
        title="Personal Projects"
        description="A collection of projects I've built to solve problems, learn new technologies, and push the boundaries of what's possible on the web."
        className="max-w-2xl"
      />

      <div className="mt-8 lg:mt-12">
        <Suspense fallback={<GridSkeleton />}>
          <ProjectContent />
        </Suspense>
      </div>
    </Container>
  );
};

export default Projects;
