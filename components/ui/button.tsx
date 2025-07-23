import { cn } from "@/utils/cn";
import React from "react";

// Define button variants with purple as primary
const buttonVariants = {
  variant: {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500",
    ghost:
      "text-gray-600 hover:bg-purple-50 hover:text-purple-700 focus:ring-purple-500",
    link: "text-purple-600 hover:text-purple-800 underline-offset-4 hover:underline px-1 focus:outline-none",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  },
  size: {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 text-sm",
    lg: "h-10 px-6 text-base",
    xl: "h-12 px-8 text-lg",
    icon: "h-9 w-9 p-0",
  },
};

// Base button styles
const baseStyles = [
  "inline-flex items-center justify-center",
  "rounded-md font-medium",
  "transition-colors duration-200",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "select-none cursor-pointer",
].join(" ");

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  asChild?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // If loading, disable the button
    const isDisabled = disabled || loading;

    // Combine all styles
    const buttonClasses = cn(
      baseStyles,
      buttonVariants.variant[variant],
      buttonVariants.size[size],
      className
    );

    if (asChild) {
      // Return a div that can be used with asChild pattern
      return (
        <span className={buttonClasses} {...props}>
          {children}
        </span>
      );
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        {...props}>
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
