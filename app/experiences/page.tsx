import TitleCard from "@/components/common/title-card";
import MainContent from "@/components/experience/main-content";
import { Container } from "@/components/ui/container";
import React, { Suspense } from "react";

function TimelineSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`relative flex items-center w-full mb-12 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className="w-5/12 h-40 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}

const ExperiencePage = () => (
  <Container className="py-6 sm:py-8 lg:py-12">
    <TitleCard
      title="Professional Timeline"
      description="A comprehensive overview of my career progression, educational milestones, and the experiences that have defined my professional journey in technology."
      className="max-w-2xl"
    />

    <div className="mt-8">
      <Suspense fallback={<TimelineSkeleton />}>
        <MainContent />
      </Suspense>
    </div>
  </Container>
);

export default ExperiencePage;
