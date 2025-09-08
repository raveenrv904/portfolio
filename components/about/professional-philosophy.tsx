"use client";
import { Users, TrendingUp, Globe, Code2 } from "lucide-react";
import { useGsapStagger } from "@/lib/gsap-helpers";

const contributions = [
  {
    icon: Users,
    title: "Client Success Stories",
    narrative:
      "Through TheNetSense agency, I've delivered 15+ websites that helped small businesses establish their online presence and grow their customer base.",
    achievements: [
      "50% average increase in client inquiries",
      "Improved mobile experience for 10+ businesses",
      "Reduced page load times by 60%",
      "100% client satisfaction rate",
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance Impact",
    narrative:
      "I focus on building fast, reliable websites that directly impact business metrics. Real results that clients can measure.",
    achievements: [
      "Average 3s page load improvement",
      "95+ Lighthouse performance scores",
      "Cross-browser compatibility testing",
      "SEO optimization for better rankings",
    ],
  },
  {
    icon: Globe,
    title: "Modern Tech Implementation",
    narrative:
      "I bring cutting-edge technology to traditional businesses, helping them compete in the digital marketplace with modern solutions.",
    achievements: [
      "React & Next.js for dynamic experiences",
      "Headless CMS for easy content management",
      "API integrations for business automation",
      "Responsive design for all devices",
    ],
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    narrative:
      "End-to-end development solutions covering frontend interfaces, backend APIs, database design, and deployment strategies.",
    achievements: [
      "Node.js & Express backend development",
      "MySQL database optimization",
      "Authentication & user management",
      "Cloud deployment & hosting solutions",
    ],
  },
];

export function ContributionsImpact() {
  const ref = useGsapStagger("[data-contribution]");

  return (
    <section
      ref={ref}
      className="mb-12 rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 
      bg-white/90 dark:bg-neutral-900/90 
      p-6 sm:p-10 shadow-lg backdrop-blur-md transition-colors"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          Real-World Impact
        </h2>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          Contributions and results from projects that made a difference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contributions.map(({ icon: Icon, title, narrative, achievements }) => (
          <div
            key={title}
            data-contribution
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
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                  <span className="font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
