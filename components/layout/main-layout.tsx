"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useUIStore } from "@/store/ui-store";
import { useResponsive } from "@/hooks/use-responsive";
import { TopNavbar } from "./top-navbar";
import { LeftSidebar } from "./left-sidebar";
import { BottomNavigation } from "./bottom-navigation";
import { TransitionProvider } from "@/components/providers/transition-provider";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isSidebarCollapsed } = useUIStore();
  const { isMobile, isDesktop } = useResponsive();
  const mainRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layoutRef.current || !contentRef.current) return;

    const tl = gsap.timeline();

    gsap.set(layoutRef.current, { opacity: 0 });
    gsap.set(contentRef.current, { y: 20, opacity: 0 });

    tl.to(layoutRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }).to(
      contentRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    if (isDesktop) {
      const sidebarWidth = isSidebarCollapsed ? 4 : 16;

      gsap.to(mainRef.current, {
        marginLeft: `${sidebarWidth}rem`,
        width: `calc(100vw - ${sidebarWidth}rem)`,
        duration: 0.4,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(mainRef.current, {
        marginLeft: "0rem",
        width: "100vw",
        duration: 0.4,
        ease: "power2.inOut",
      });
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { x: -10, opacity: 0.8 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
          delay: 0.1,
        }
      );
    }
  }, [isSidebarCollapsed, isMobile, isDesktop]);

  return (
    <div
      ref={layoutRef}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-neutral-50 via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900"
    >
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:20px_20px]" />
      </div>

      <TopNavbar />

      {isDesktop && <LeftSidebar />}

      <main
        ref={mainRef}
        className={cn(
          "will-change-[margin-left,width] relative z-10 overflow-x-hidden",
          "pt-16",
          isMobile && "pb-20"
        )}
        style={{
          marginLeft: isDesktop
            ? isSidebarCollapsed
              ? "4rem"
              : "16rem"
            : "0rem",
          width: isDesktop
            ? `calc(100vw - ${isSidebarCollapsed ? 4 : 16}rem)`
            : "100vw",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <TransitionProvider>
          <div
            ref={contentRef}
            className="min-h-full will-change-transform w-full"
          >
            <div className="relative w-full">
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl animate-pulse pointer-events-none hidden md:block" />
              <div
                className="absolute bottom-16 left-16 w-24 h-24 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-full blur-lg animate-pulse pointer-events-none hidden md:block"
                style={{ animationDelay: "2s" }}
              />

              <div
                className={cn(
                  "w-full max-w-full",
                  isMobile ? "px-4 py-6" : "px-6 py-6"
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </TransitionProvider>
      </main>

      {isMobile && <BottomNavigation />}
    </div>
  );
}
