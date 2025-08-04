import Skeleton from "@/components/common/skeleton";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { Container } from "@/components/ui/container";
import React, { Suspense } from "react";

const Dashboard = () => {
  return (
    <Container className="py-8">
      <div className="mb-4">
        <div className="">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Welcome back! Here&apos;s an overview of your development activity
            and portfolio.
          </p>
        </div>
      </div>

      <Suspense fallback={<Skeleton />}>
        <DashboardContent />
      </Suspense>
    </Container>
  );
};

export default Dashboard;
