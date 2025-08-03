"use client";

import { memo, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  variant?: "ghost" | "outline" | "default";
  size?: "sm" | "default";
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const AnimatedButton = memo<AnimatedButtonProps>(
  ({
    variant,
    size,
    onClick,
    icon: Icon,
    children,
    className = "",
    isLoading = false,
  }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const spinnerRef = useRef<HTMLDivElement>(null);

    const animateHover = useCallback((isHovering: boolean) => {
      if (!buttonRef.current || !iconRef.current || !backgroundRef.current)
        return;

      const scale = isHovering ? 1.05 : 1;
      const y = isHovering ? -2 : 0;
      const iconRotate = isHovering ? 5 : 0;
      const iconScale = isHovering ? 1.1 : 1;
      const bgOpacity = isHovering ? 1 : 0;

      gsap.to(buttonRef.current, {
        scale,
        y,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(iconRef.current, {
        rotate: iconRotate,
        scale: iconScale,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(backgroundRef.current, {
        opacity: bgOpacity,
        duration: 0.2,
        ease: "power2.out",
      });
    }, []);

    const animatePress = useCallback((isPressed: boolean) => {
      if (!buttonRef.current) return;
      const scale = isPressed ? 0.95 : 1.05;
      gsap.to(buttonRef.current, { scale, duration: 0.1, ease: "power2.out" });
    }, []);

    useEffect(() => {
      if (!spinnerRef.current) return;

      if (isLoading) {
        gsap.set(spinnerRef.current, { opacity: 1, scale: 1 });
        gsap.to(spinnerRef.current.querySelector(".spinner"), {
          rotation: 360,
          duration: 1,
          repeat: -1,
          ease: "none",
        });
      } else {
        gsap.to(spinnerRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }, [isLoading]);

    return (
      <div
        ref={buttonRef}
        onMouseEnter={() => animateHover(true)}
        onMouseLeave={() => animateHover(false)}
        onMouseDown={() => animatePress(true)}
        onMouseUp={() => animatePress(false)}
        className="will-change-transform"
      >
        <Button
          variant={variant}
          size={size}
          onClick={onClick}
          className={cn(
            "cursor-pointer relative overflow-hidden group",
            className
          )}
          disabled={isLoading}
        >
          <div
            ref={backgroundRef}
            className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 will-change-transform"
            style={{ opacity: 0 }}
          />

          <div ref={iconRef} className="relative z-10 will-change-transform">
            <Icon className="h-4 w-4 mr-2" />
          </div>

          <span className="relative z-10">{children}</span>

          <div
            ref={spinnerRef}
            className="absolute inset-0 flex items-center justify-center bg-inherit will-change-transform"
            style={{ opacity: 0 }}
          >
            <div className="spinner w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          </div>
        </Button>
      </div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
