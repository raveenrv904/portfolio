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
    gsap.to(cardRef.current, {
      y: -4,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
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
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 shadow-lg backdrop-blur-sm",
          className
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {description}
                </CardDescription>
              )}
            </div>
            {action && <div ref={actionRef}>{action}</div>}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 rounded-full animate-spin border-2 border-primary-200 border-t-primary-600" />
            </div>
          ) : error ? (
            <div
              ref={errorRef}
              className="flex items-center justify-center py-8 text-red-500"
            >
              <p className="text-sm">Error: {error}</p>
            </div>
          ) : (
            <div ref={contentRef}>{children}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseWidget;
