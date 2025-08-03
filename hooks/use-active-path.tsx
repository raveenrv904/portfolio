"use client";

import { usePathname } from "next/navigation";

export function useActivePath() {
  const pathname = usePathname();

  const isActivePath = (path: string): boolean => {
    if (path === "/" && pathname !== path) {
      return false;
    }

    if (path === "/" && pathname === "/") {
      return true;
    }

    return pathname.startsWith(path);
  };

  return isActivePath;
}
