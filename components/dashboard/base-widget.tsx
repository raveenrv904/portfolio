"use client";

import gsap from "gsap";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

interface BaseWidgetProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
  action?: ReactNode;
}

const BaseWidget = ({
  title,
  description,
  children,
  className,
  loading,
  error,
  action,
}: BaseWidgetProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (action && actionRef.current) {
      gsap.fromTo(
        actionRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, delay: 0.2, duration: 0.4, ease: "power2.out" }
      );
    }

    if (!loading && !error && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, delay: 0.1, duration: 0.4 }
      );
    }

    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 }
      );
    }
  }, [loading, error, action]);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      gsap.to(cardRef.current, {
        y: -4,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseDown = () => {
    gsap.to(cardRef.current, {
      scale: 0.98,
      duration: 0.1,
    });
  };

  const handleMouseUp = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.1,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className="w-full"
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 shadow-lg backdrop-blur-sm w-full min-h-fit",
          "md:hover:shadow-2xl",
          className
        )}
      >
        <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
          <div className="flex flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent break-words">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className=" text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 break-words">
                  {description}
                </CardDescription>
              )}
            </div>
            {action && (
              <div
                ref={actionRef}
                className="flex-shrink-0 self-start sm:self-center"
              >
                {action}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          {loading ? (
            <div className="flex items-center justify-center py-4 sm:py-6 md:py-8">
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full animate-spin border-2 border-primary-200 border-t-primary-600" />
            </div>
          ) : error ? (
            <div
              ref={errorRef}
              className="flex items-center justify-center py-4 sm:py-6 md:py-8 text-red-500 px-2"
            >
              <p className="text-xs sm:text-sm md:text-base text-center break-words">
                Error: {error}
              </p>
            </div>
          ) : (
            <div ref={contentRef} className="w-full">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseWidget;
