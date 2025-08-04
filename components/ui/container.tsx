import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6",
          {
            "max-w-screen-sm": size === "sm",
            "max-w-screen-md": size === "md",
            "max-w-screen-lg": size === "lg",
            "max-w-screen-xl": size === "xl",
            "max-w-screen-2xl": size === "2xl",
            "max-w-screen-7xl": size === "7xl",
            "max-w-none": size === "full",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
