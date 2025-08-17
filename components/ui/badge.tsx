import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "destructive";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":
            variant === "default",
          "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200":
            variant === "secondary",
          "border border-neutral-200 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300":
            variant === "outline",
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200":
            variant === "success",
          "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200":
            variant === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200":
            variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
}

export default Badge;
