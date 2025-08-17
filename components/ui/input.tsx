import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950",
        outline:
          "border-neutral-300 dark:border-neutral-600 bg-transparent hover:border-neutral-400 dark:hover:border-neutral-500",
        filled:
          "border-transparent bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750",
        ghost:
          "border-transparent bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-2.5 py-1.5 text-xs",
        lg: "h-12 px-4 py-3 text-base",
        xl: "h-14 px-5 py-4 text-lg",
      },
      state: {
        default: "",
        error:
          "border-red-500 dark:border-red-400 focus-visible:ring-red-500 dark:focus-visible:ring-red-400",
        success:
          "border-green-500 dark:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400",
        warning:
          "border-yellow-500 dark:border-yellow-400 focus-visible:ring-yellow-500 dark:focus-visible:ring-yellow-400",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      state,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      ...props
    },
    ref
  ) => {
    const inputState = error ? "error" : state;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            htmlFor={props.id}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500",
                onLeftIconClick &&
                  "cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-400"
              )}
              onClick={onLeftIconClick}
            >
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, state: inputState, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500",
                onRightIconClick &&
                  "cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-400"
              )}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="text-xs">
            {error ? (
              <p className="text-red-600 dark:text-red-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
