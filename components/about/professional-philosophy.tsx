"use client";

import { Rocket, Gauge, Accessibility, ShieldCheck } from "lucide-react";
import { useGsapStagger } from "@/lib/gsap-helpers";

const philosophyStories = [
  {
    icon: Gauge,
    title: "Performance First",
    narrative:
      "I build websites that load fast and run smooth. Every piece of code matters, and I make sure nothing slows things down.",
    principles: [
      "Small bundles for faster loading",
      "Smart code splitting",
      "Optimized images",
      "Smart caching",
    ],
  },
  {
    icon: Accessibility,
    title: "Built for Everyone",
    narrative:
      "I create websites that work for all people. Everyone should be able to use what I build, no matter their abilities.",
    principles: [
      "Good color contrast",
      "Keyboard navigation",
      "Screen reader friendly",
      "Respect for motion preferences",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Reliable & Stable",
    narrative:
      "When things go wrong, my websites handle it gracefully. Users always know what's happening and feel in control.",
    principles: [
      "Smart error handling",
      "Predictable user experience",
      "Network failure backup",
      "Clear feedback",
    ],
  },
  {
    icon: Rocket,
    title: "Smart Choices",
    narrative:
      "I choose the right tools for each job. I focus on what works well and keeps projects simple to maintain.",
    principles: [
      "Right tool for the job",
      "Data-driven decisions",
      "Keep it simple",
      "Easy to maintain",
    ],
  },
];

export function ProfessionalPhilosophy() {
  const ref = useGsapStagger("[data-story]");

  return (
    <section
      ref={ref}
      className="mb-12 rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 
      bg-white/90 dark:bg-neutral-900/90 
      p-6 sm:p-10 shadow-lg backdrop-blur-md transition-colors"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          How I Build
        </h2>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          These principles guide every project I work on.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {philosophyStories.map(
          ({ icon: Icon, title, narrative, principles }) => (
            <div
              key={title}
              data-story
              className="group rounded-2xl border border-neutral-300/60 dark:border-neutral-600/60 bg-white dark:bg-neutral-900 p-6 sm:p-8 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border border-neutral-300/60 dark:border-neutral-600/60 shadow-lg">
                  <Icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {title}
                  </h3>
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {narrative}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                    <span className="font-medium">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
