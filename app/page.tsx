import Skeleton from "@/components/common/skeleton";
import TitleCard from "@/components/common/title-card";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { Container } from "@/components/ui/container";
import React, { Suspense } from "react";

const Dashboard = () => {
  return (
    <Container className="md:py-8">
      <TitleCard
        title="Dashboard"
        description="Welcome back! Here's an overview of your development activity
            and portfolio."
      />

      <Suspense fallback={<Skeleton />}>
        <DashboardContent />
      </Suspense>
    </Container>
  );
};

export default Dashboard;
