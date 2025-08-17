"use client";
import Image from "next/image";
import { useGsapFadeIn } from "@/lib/gsap-helpers";
import {
  Github,
  Linkedin,
  Globe,
  Twitter,
  Sparkles,
  Code2,
  Zap,
  User,
} from "lucide-react";

type SiteSettings = {
  title?: string;
  author?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  profileImage?: {
    url?: string;
    alt?: string;
  };
};

export function AboutHero({ siteSettings }: { siteSettings: SiteSettings }) {
  const ref = useGsapFadeIn<HTMLDivElement>([
    siteSettings?.title,
    siteSettings?.author,
  ]);

  const socials = [
    { label: "GitHub", href: siteSettings?.social?.github, Icon: Github },
    { label: "LinkedIn", href: siteSettings?.social?.linkedin, Icon: Linkedin },
    { label: "Twitter", href: siteSettings?.social?.twitter, Icon: Twitter },
    { label: "Website", href: siteSettings?.social?.website, Icon: Globe },
  ].filter((s) => !!s.href);

  const hasProfile = Boolean(siteSettings?.profileImage?.url);

  return (
    <section
      ref={ref}
      className="mb-12 rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 
      bg-white/90 dark:bg-neutral-900/90 
      p-6 sm:p-10 shadow-lg backdrop-blur-md transition-colors"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Profile Section */}
        <div className="relative shrink-0">
          {hasProfile ? (
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-3xl overflow-hidden border border-neutral-300/60 dark:border-neutral-700/60 shadow-lg">
              <Image
                src={
                  siteSettings?.profileImage?.url || "/avatar-professional.png"
                }
                alt={siteSettings?.profileImage?.alt || "Profile"}
                fill
                sizes="160px"
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border border-neutral-300/60 dark:border-neutral-600/60 shadow-lg">
              <User className="h-14 w-14 text-neutral-500 dark:text-neutral-300" />
            </div>
          )}

          <div className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              {siteSettings?.author || "Professional User"}
            </h1>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300/60 dark:border-neutral-600/60">
              <Code2 className="h-3 w-3 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Developer
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-6 max-w-2xl mx-auto lg:mx-0">
            {/* <p className="text-lg hidden md:block text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {siteSettings?.title ||
                "Building modern, scalable applications with Next.js, TypeScript, and Web3 technologies."}
            </p> */}
            <p className="text-base font-medium flex items-center justify-center lg:justify-start gap-2 text-primary-600 dark:text-primary-400">
              <Zap className="h-4 w-4 hidden md:block" />
              Aspiring Web3 developer exploring decentralized technologies
            </p>
          </div>

          {socials.length > 0 ? (
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-neutral-300/60 dark:border-neutral-600/60 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  <span className="truncate text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 italic">
              No social links available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
