/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { useActivePath } from "@/hooks/use-active-path";
import { navigationSections } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/use-responsive";

const NavigationItem = memo(
  ({
    item,
    isActive,
    isSidebarCollapsed,
  }: {
    item: any;
    isActive: boolean;
    isSidebarCollapsed: boolean;
  }) => {
    const itemRef = useRef<HTMLAnchorElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!textRef.current) return;

      if (isSidebarCollapsed) {
        gsap.to(textRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(textRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    }, [isSidebarCollapsed]);

    useEffect(() => {
      if (!badgeRef.current) return;

      if (isSidebarCollapsed) {
        gsap.to(badgeRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(badgeRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: 0.15,
          ease: "back.out(1.2)",
        });
      }
    }, [isSidebarCollapsed]);

    const handleMouseEnter = useCallback(() => {
      if (!itemRef.current) return;

      gsap.to(itemRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });

      if (isSidebarCollapsed && tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }, [isSidebarCollapsed]);

    const handleMouseLeave = useCallback(() => {
      if (!itemRef.current) return;

      gsap.to(itemRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      if (isSidebarCollapsed && tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }, [isSidebarCollapsed]);

    return (
      <Link
        ref={itemRef}
        href={item.href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer will-change-transform",
          "hover:bg-gradient-to-r hover:from-neutral-100 hover:to-neutral-50",
          "dark:hover:from-neutral-800 dark:hover:to-neutral-800/50",
          isActive
            ? "bg-gradient-to-r from-primary-50 to-primary-25 text-primary-700 shadow-sm border border-primary-100/50"
            : "text-neutral-700",
          "dark:text-neutral-300",
          isActive &&
            "dark:from-primary-950/50 dark:to-primary-900/30 dark:text-primary-300 dark:border-primary-800/30"
        )}
      >
        {isActive && (
          <div
            ref={indicatorRef}
            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary-500 to-primary-600"
          />
        )}

        <div className="relative">
          <item.icon
            className={cn(
              "h-5 w-5 flex-shrink-0 transition-colors duration-200",
              isActive
                ? "text-primary-600 dark:text-primary-400"
                : "text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200"
            )}
          />
        </div>

        <span
          ref={textRef}
          className="ml-3 whitespace-nowrap font-medium will-change-transform"
          style={{ opacity: isSidebarCollapsed ? 0 : 1 }}
        >
          {item.name}
        </span>

        {isSidebarCollapsed && (
          <div
            ref={tooltipRef}
            className="absolute left-full ml-2 rounded-lg bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-neutral-100 dark:text-neutral-900 z-50 pointer-events-none whitespace-nowrap will-change-transform"
            style={{ opacity: 0 }}
          >
            {item.name}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-neutral-900 dark:border-r-neutral-100" />
          </div>
        )}
      </Link>
    );
  }
);

NavigationItem.displayName = "NavigationItem";

const SectionHeader = memo(
  ({
    title,
    isSidebarCollapsed,
  }: {
    title: string;
    isSidebarCollapsed: boolean;
  }) => {
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      if (!headerRef.current) return;

      if (isSidebarCollapsed) {
        gsap.to(headerRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(headerRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: 0.05,
          ease: "power2.out",
        });
      }
    }, [isSidebarCollapsed]);

    return (
      <h3
        ref={headerRef}
        className="px-3 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 will-change-transform"
        style={{ opacity: isSidebarCollapsed ? 0 : 1 }}
      >
        {title}
      </h3>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export const LeftSidebar = memo(() => {
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const { isDesktop } = useResponsive();
  const isActivePath = useActivePath();
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleIconRef = useRef<HTMLDivElement>(null);
  const profileTextRef = useRef<HTMLDivElement>(null);

  const memoizedSections = useMemo(() => navigationSections, []);

  useEffect(() => {
    if (!sidebarRef.current) return;

    gsap.to(sidebarRef.current, {
      width: isSidebarCollapsed ? "4rem" : "16rem",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isSidebarCollapsed]);

  useEffect(() => {
    if (!toggleIconRef.current) return;

    gsap.to(toggleIconRef.current, {
      rotate: isSidebarCollapsed ? 0 : 180,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isSidebarCollapsed]);

  useEffect(() => {
    if (!profileTextRef.current) return;

    if (isSidebarCollapsed) {
      gsap.to(profileTextRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(profileTextRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      });
    }
  }, [isSidebarCollapsed]);

  const handleToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  if (!isDesktop) {
    return null;
  }

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r border-neutral-200/80 bg-white/80 backdrop-blur-xl shadow-lg dark:border-neutral-800/50 dark:bg-neutral-950/90 dark:shadow-neutral-900/20 will-change-auto"
      style={{ width: isSidebarCollapsed ? "4rem" : "16rem" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50/30 dark:to-neutral-900/20 pointer-events-none" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-end p-4 border-b border-neutral-200/50 dark:border-neutral-800/30">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-8 w-8 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
          >
            <div ref={toggleIconRef} className="will-change-transform">
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </div>
          </Button>
        </div>

        <nav className="flex-1 space-y-6 px-3 py-4 overflow-hidden">
          {memoizedSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2 mb-6">
              {section.title && (
                <SectionHeader
                  title={section.title}
                  isSidebarCollapsed={isSidebarCollapsed}
                />
              )}

              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavigationItem
                    key={item.href}
                    item={item}
                    isActive={isActivePath(item.href)}
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200/50 dark:border-neutral-800/30">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 shadow-lg ring-2 ring-primary-100 dark:ring-primary-900/50 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <div
              ref={profileTextRef}
              className="flex-1 min-w-0 will-change-transform"
              style={{ opacity: isSidebarCollapsed ? 0 : 1 }}
            >
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Raveen R V
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                Full-Stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
});

LeftSidebar.displayName = "LeftSidebar";
