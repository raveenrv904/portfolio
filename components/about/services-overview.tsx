"use client";

import { Boxes, ServerCog, Coins } from "lucide-react";
import { useGsapStagger } from "@/lib/gsap-helpers";

const services = [
  {
    icon: ServerCog,
    title: "Full-Stack Solutions",
    body: "Complete web solutions with modern frontends, APIs, user authentication, and reliable hosting. Everything works together smoothly.",
  },
  {
    icon: Boxes,
    title: "Content Management",
    body: "I set up content systems with Sanity CMS. Easy for teams to update content without touching code.",
  },
  {
    icon: Coins,
    title: "Web3 Applications",
    body: "Decentralized applications with smart contract integration, wallet connections, and blockchain interactions. Modern crypto experiences.",
  },
];

export function ServicesOverview() {
  const ref = useGsapStagger("[data-service]");

  return (
    <section
      ref={ref}
      className="mb-12 rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 
      bg-white/90 dark:bg-neutral-900/90 
      p-6 sm:p-10 shadow-lg backdrop-blur-md transition-colors"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          What I Work On
        </h2>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          Services I offer to help bring your ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            data-service
            className="group rounded-2xl border border-neutral-300/60 dark:border-neutral-600/60 bg-white dark:bg-neutral-900 p-6 sm:p-8 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border border-neutral-300/60 dark:border-neutral-600/60 shadow-lg">
                <Icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {title}
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
