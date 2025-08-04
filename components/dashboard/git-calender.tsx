/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGitHubContributions } from "@/hooks/use-github-data";
import { useUIStore } from "@/store/ui-store";
import gsap from "gsap";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import BaseWidget from "./base-widget";

const Calender = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
    </div>
  ),
});

const GitCalender = () => {
  const { username, loading, error } = useGitHubContributions();
  const { theme } = useUIStore();
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const currentTheme =
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    if (!calendarContainerRef.current || !username || loading) return;

    const container = calendarContainerRef.current;

    gsap.set(container, {
      opacity: 0,
      y: 20,
    });

    const tl = gsap.timeline();

    tl.to(container, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2,
    });

    const handleCalendarLoad = () => {
      setTimeout(() => {
        const calendarBlocks = container.querySelectorAll("[data-level]");
        if (calendarBlocks.length > 0) {
          gsap.fromTo(
            calendarBlocks,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: {
                amount: 1.2,
                from: "start",
                ease: "power2.out",
              },
              ease: "back.out(1.2)",
            }
          );
        }
      }, 100);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          const hasCalendarContent = container.querySelector("[data-level]");
          if (hasCalendarContent) {
            handleCalendarLoad();
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      tl.kill();
      observer.disconnect();
    };
  }, [username, loading]);

  useEffect(() => {
    if (!calendarContainerRef.current) return;

    const calendarBlocks =
      calendarContainerRef.current.querySelectorAll("[data-level]");
    if (calendarBlocks.length > 0) {
      gsap.fromTo(
        calendarBlocks,
        { opacity: 0.7 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.01,
          ease: "power2.out",
        }
      );
    }
  }, [currentTheme]);

  return (
    <BaseWidget
      title="GitHub Contributions"
      description="Your contribution activity over the past year"
      loading={loading}
      error={error}
      className="col-span-3"
    >
      {username && (
        <div
          ref={calendarContainerRef}
          className="overflow-x-auto opacity-0 will-change-transform"
        >
          <div ref={calendarRef}>
            <Calender
              username={username}
              theme={{
                light: calendarTheme.light,
                dark: calendarTheme.dark,
              }}
              colorScheme={currentTheme === "dark" ? "dark" : "light"}
              fontSize={12}
              blockSize={12}
              blockMargin={2}
              transformData={(data: any[]) => {
                return data.filter((activity) => {
                  return activity.count > 0 || Math.random() > 0.8;
                });
              }}
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
};

export default GitCalender;
