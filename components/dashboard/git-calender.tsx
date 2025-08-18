import { useGitHubContributions } from "@/hooks/use-github-data";
import { useUIStore } from "@/store/ui-store";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import BaseWidget from "./base-widget";
import GitHubCalendar from "react-github-calendar";

const GitCalender = () => {
  const { username, loading, error } = useGitHubContributions();
  const { theme } = useUIStore();
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const calendarTheme = {
    light: [
      "#f0f0f0", // No contributions - light gray
      "#c6e48b", // Low contributions - light green
      "#7bc96f", // Medium-low contributions - medium green
      "#239a3b", // Medium-high contributions - darker green
      "#196127", // High contributions - darkest green
    ],
    dark: [
      "#0d1117", // No contributions - dark background
      "#0e4429", // Low contributions - dark green
      "#006d32", // Medium-low contributions - medium dark green
      "#26a641", // Medium-high contributions - bright green
      "#39d353", // High contributions - brightest green
    ],
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
          className="opacity-0 will-change-transform"
        >
          <div
            ref={calendarRef}
            className="w-full overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500"
          >
            <div className="block min-w-fit">
              <GitHubCalendar
                username="raveenrv904"
                colorScheme={currentTheme}
                theme={{
                  light: calendarTheme.light,
                  dark: calendarTheme.dark,
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={3}
                hideColorLegend={false}
                hideTotalCount={false}
                showWeekdayLabels={true}
              />
            </div>

            {/* <div className="block sm:hidden min-w-fit pb-2">
              <GitHubCalendar
                username="raveenrv904"
                colorScheme={currentTheme}
                theme={{
                  light: calendarTheme.light,
                  dark: calendarTheme.dark,
                }}
                fontSize={9}
                blockSize={6}
                blockMargin={1.5}
                hideColorLegend={true}
                hideTotalCount={false}
                showWeekdayLabels={false}
              />
            </div>

            <div className="hidden sm:block lg:hidden min-w-fit">
              <GitHubCalendar
                username="raveenrv904"
                colorScheme={currentTheme}
                theme={{
                  light: calendarTheme.light,
                  dark: calendarTheme.dark,
                }}
                fontSize={10}
                blockSize={8}
                blockMargin={2}
                hideColorLegend={false}
                hideTotalCount={false}
                showWeekdayLabels={true}
              />
            </div> */}
          </div>
        </div>
      )}
    </BaseWidget>
  );
};

export default GitCalender;
