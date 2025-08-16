"use client";
import React, { useEffect, useRef } from "react";
import { Target, Rocket, Timer, Workflow } from "lucide-react";
import gsap from "gsap";

type Stat = {
  key: string;
  label: string;
  value: string;
  description?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accentClass: string;
};

const STATS: Stat[] = [
  {
    key: "projects",
    label: "Projects Completed",
    value: "10",
    description: "Shipped and maintained",
    Icon: Rocket,
    accentClass: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  },
  {
    key: "delivery",
    label: "On‑Time Delivery",
    value: "98%",
    description: "Planned > built > shipped",
    Icon: Timer,
    accentClass: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  },
  {
    key: "process",
    label: "Process First",
    value: "Lean",
    description: "Ship → measure → iterate",
    Icon: Workflow,
    accentClass: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300",
  },
  {
    key: "quality",
    label: "Reliability",
    value: "High",
    description: "Tested & observable",
    Icon: Target,
    accentClass: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300",
  },
];

const StatCard = React.memo(function StatCard({ stat }: { stat: Stat }) {
  const { Icon } = stat;
  return (
    <div
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-5 shadow-sm focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-purple-500"
      role="group"
      aria-label={`${stat.label} ${stat.value}`}
      tabIndex={0}
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.accentClass}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate">
            {stat.label}
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {stat.value}
          </div>
        </div>
      </div>
      {stat.description && (
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {stat.description}
        </p>
      )}
    </div>
  );
});

const AgencyStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = Array.from(containerRef.current.querySelectorAll("[data-stat]"));
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "all",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Agency performance statistics"
      className="w-full"
    >
      <div
        ref={containerRef}
        className="
          grid gap-3
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {STATS.map((s) => (
          <div key={s.key} data-stat="">
            <StatCard stat={s} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(AgencyStats);
