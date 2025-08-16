import GridSkeleton from "@/components/common/grid-skeleton";
import { Container } from "@/components/ui/container";
import React, { Suspense } from "react";
import AgencyContent from "@/components/agency/main-content";
import AgencyStats from "@/components/agency/agency-stats";

const AgencyPage = () => {
  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
            <span>Professional Portfolio</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent">
            Agency Work
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            Pragmatic web engineering for startups and small teams — from first
            ship to growth. Confidentiality-first and implementation-focused.
          </p>
        </div>

        <AgencyStats />


        <Suspense fallback={<GridSkeleton />}>
          <AgencyContent />
        </Suspense>
      </div>
    </Container>
  );
};

export default AgencyPage;
