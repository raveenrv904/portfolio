"use client";

import { memo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { NavbarLogo } from "./navbar-logo";
import { NavbarActions } from "./navbar-actions";

export const TopNavbar = memo(() => {
  const navbarRef = useRef<HTMLElement>(null);
  const bottomBorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navbarRef.current || !bottomBorderRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    ).fromTo(
      bottomBorderRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, delay: 0.3, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 w-full h-16 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl shadow-sm dark:border-neutral-800/50 dark:bg-neutral-950/90 dark:shadow-neutral-900/10 will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-neutral-950/50 pointer-events-none" />

      <div className="relative flex h-full items-center justify-between px-4 md:px-6">
        <NavbarLogo />
        <NavbarActions />
      </div>

      <div
        ref={bottomBorderRef}
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent will-change-transform"
        style={{ transformOrigin: "left" }}
      />
    </header>
  );
});

TopNavbar.displayName = "TopNavbar";
