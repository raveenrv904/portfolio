"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimation = () => {
  const triggerRef = useRef<HTMLElement>(null);

  const animateOnScroll = (
    selector: string,
    animation: gsap.TweenVars,
    triggerOptions?: ScrollTrigger.Vars
  ) => {
    if (!triggerRef.current) return;

    gsap.fromTo(
      triggerRef.current.querySelectorAll(selector),
      { opacity: 0, y: 30 },
      {
        ...animation,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...triggerOptions,
        },
      }
    );
  };

  const staggerAnimation = (
    selector: string,
    stagger: number = 0.1,
    triggerOptions?: ScrollTrigger.Vars
  ) => {
    if (!triggerRef.current) return;

    gsap.fromTo(
      triggerRef.current.querySelectorAll(selector),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          ...triggerOptions,
        },
      }
    );
  };

  return { triggerRef, animateOnScroll, staggerAnimation };
};
