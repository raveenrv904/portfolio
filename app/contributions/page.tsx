import GridSkeleton from "@/components/common/grid-skeleton";
import { Container } from "@/components/ui/container";
import React, { Suspense } from "react";
import AgencyContent from "@/components/agency/main-content";
import TitleCard from "@/components/common/title-card";

const AgencyPage = () => {
  return (
    <Container className="py-12">
      <TitleCard
        title="My Contributions"
        description="Real projects with measurable impact and technical solutions that made a difference."
        className="max-w-2xl"
      />

      <div className="space-y-8">
        <Suspense fallback={<GridSkeleton />}>
          <AgencyContent />
        </Suspense>
      </div>
    </Container>
  );
};

export default AgencyPage;
