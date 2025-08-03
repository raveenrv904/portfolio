"use client";

import { useCallback } from "react";
import { gsap } from "gsap";

export const useGSAPAnimation = () => {
  const animateElement = useCallback(
    (
      element: HTMLElement | null,
      animation: gsap.TweenVars,
      options?: { delay?: number }
    ) => {
      if (!element) return;

      gsap.to(element, {
        ...animation,
        delay: options?.delay || 0,
      });
    },
    []
  );

  const animateFromTo = useCallback(
    (element: HTMLElement | null, from: gsap.TweenVars, to: gsap.TweenVars) => {
      if (!element) return;
      gsap.fromTo(element, from, to);
    },
    []
  );

  const createTimeline = useCallback(() => gsap.timeline(), []);

  return { animateElement, animateFromTo, createTimeline };
};
