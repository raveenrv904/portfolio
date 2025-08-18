"use client";

import { memo, useRef, useCallback } from "react";
import { useGSAPAnimation } from "@/hooks/use-gsap-animation";

export const NavbarLogo = memo(() => {
  const logoRef = useRef<HTMLDivElement>(null);
  const logoIconRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const { animateElement } = useGSAPAnimation();

  const handleLogoHover = useCallback(
    (isHovering: boolean) => {
      animateElement(logoRef.current, {
        scale: isHovering ? 1.02 : 1,
        duration: 0.3,
        ease: "power2.out",
      });

      animateElement(logoIconRef.current, {
        rotation: isHovering ? 180 : 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    },
    [animateElement]
  );

  return (
    <div
      ref={logoRef}
      onMouseEnter={() => handleLogoHover(true)}
      onMouseLeave={() => handleLogoHover(false)}
      className="flex items-center space-x-4 cursor-pointer will-change-transform"
    >
      <div className="flex items-center space-x-3">
        <div
          ref={logoIconRef}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 shadow-lg flex items-center justify-center will-change-transform"
        >
          <span className="text-white font-bold tracking-widest text-sm">
            RV
          </span>
        </div>

        <div className="block">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300">
            Raveen R V
          </h1>
          <div
            ref={underlineRef}
            className="h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full will-change-transform"
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
});

NavbarLogo.displayName = "NavbarLogo";
