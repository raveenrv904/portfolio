import { Suspense } from "react";
import { getSiteSettings } from "@/lib/sanity-fetch";
import { Container } from "@/components/ui/container";
import { AboutHero } from "@/components/about/about-hero";
import { ProfessionalPhilosophy } from "@/components/about/professional-philosophy";
import { ServicesOverview } from "@/components/about/services-overview";

async function AboutContent() {
  const siteSettings = await getSiteSettings();
  return (
    <>
      <AboutHero siteSettings={siteSettings} />
      <ProfessionalPhilosophy />
      <ServicesOverview />
    </>
  );
}

function AboutSkeleton() {
  return (
    <div className="space-y-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-56 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <Container className="py-12">
      <Suspense fallback={<AboutSkeleton />}>
        <AboutContent />
      </Suspense>
    </Container>
  );
}

export const metadata = {
  title: "About Raveen",
  description:
    "A resilient developer’s journey from setbacks to craft, building performant web experiences with care.",
};
