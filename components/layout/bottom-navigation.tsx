/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { MoreHorizontal, X } from "lucide-react";
import { gsap } from "gsap";
import { useActivePath } from "@/hooks/use-active-path";
import { navigationSections } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BottomNavItem = memo(
  ({
    item,
    isActive,
    onClick,
  }: {
    item: any;
    isActive: boolean;
    onClick?: () => void;
  }) => {
    const itemRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!itemRef.current || !indicatorRef.current) return;

      if (isActive) {
        gsap.to(itemRef.current, {
          scale: 1.1,
          duration: 0.2,
          ease: "back.out(1.2)",
        });
        gsap.to(indicatorRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(itemRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to(indicatorRef.current, {
          scaleX: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }, [isActive]);

    const content = (
      <>
        <div className="relative">
          <item.icon className="h-5 w-5 mb-1" />
        </div>
        <span className="text-xs font-medium truncate max-w-full">
          {item.name}
        </span>
      </>
    );

    const className = cn(
      "flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 will-change-transform",
      "min-w-0 flex-1",
      isActive
        ? "text-primary-600 dark:text-primary-400"
        : "text-neutral-500 dark:text-neutral-400"
    );

    if (item.href) {
      return (
        <Link
          ref={itemRef as any}
          href={item.href}
          className={className}
          onClick={onClick}
        >
          {content}
        </Link>
      );
    }

    return (
      <button ref={itemRef as any} onClick={onClick} className={className}>
        {content}
      </button>
    );
  }
);

BottomNavItem.displayName = "BottomNavItem";

const MoreMenu = memo(
  ({
    isOpen,
    onClose,
    items,
  }: {
    isOpen: boolean;
    onClose: () => void;
    items: any[];
  }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const isActivePath = useActivePath();

    useEffect(() => {
      if (!overlayRef.current || !menuRef.current) return;

      if (isOpen) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "power2.out" }
        );
        gsap.fromTo(
          menuRef.current,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.3, ease: "power3.out" }
        );
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { display: "none" });
            }
          },
        });
        gsap.to(menuRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ display: "none" }}
      >
        <div
          ref={menuRef}
          className="w-full max-w-md mx-4 mb-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200/50 dark:bg-neutral-950/95 dark:border-neutral-800/50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-neutral-200/50 dark:border-neutral-800/30">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              More Options
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  isActivePath(item.href)
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300"
                    : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.badge && (
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full dark:bg-primary-900/50 dark:text-primary-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="h-safe-area-inset-bottom" />
        </div>
      </div>
    );
  }
);

MoreMenu.displayName = "MoreMenu";

export const BottomNavigation = memo(() => {
  const isActivePath = useActivePath();
  const navRef = useRef<HTMLElement>(null);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const allNavItems = navigationSections.flatMap((section) => section.items);

  const mainNavItems = allNavItems.slice(0, 3);
  const moreNavItems = allNavItems.slice(3);

  const moreButton = {
    name: "More",
    icon: MoreHorizontal,
    href: null,
  };

  const displayItems = [...mainNavItems, moreButton];

  const isMoreActive = moreNavItems.some((item) => isActivePath(item.href));

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const handleMoreClick = () => {
    setIsMoreMenuOpen(true);
  };

  const handleMoreMenuClose = () => {
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-neutral-200/80 dark:bg-neutral-950/95 dark:border-neutral-800/50 md:hidden will-change-transform"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {displayItems.map((item, index) => (
            <BottomNavItem
              key={item.href || `more-${index}`}
              item={item}
              isActive={item.href ? isActivePath(item.href) : isMoreActive}
              onClick={item.href ? undefined : handleMoreClick}
            />
          ))}
        </div>

        <div className="h-safe-area-inset-bottom" />
      </nav>

      <MoreMenu
        isOpen={isMoreMenuOpen}
        onClose={handleMoreMenuClose}
        items={moreNavItems}
      />
    </>
  );
});

BottomNavigation.displayName = "BottomNavigation";
