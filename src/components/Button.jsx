import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";
import { forwardRef } from "react";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles that apply to all variants
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary variants
        default: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        primary: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",

        // Destructive variant
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",

        // Outline variants
        outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        "outline-primary": "border border-green-600 bg-transparent text-green-600 hover:bg-green-50 hover:text-green-700",
        "outline-destructive": "border border-red-600 bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700",

        // Ghost variants
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        "ghost-primary": "bg-transparent text-green-600 hover:bg-green-50 hover:text-green-700",
        "ghost-destructive": "bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700",

        // Link variant
        link: "bg-transparent text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-lg",
        xl: "h-12 px-10 text-xl",
        icon: "h-10 w-10",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

// Button component with forwardRef for better ref handling
const Button = forwardRef(({ className, variant, size, rounded, children, disabled, type = "button", onClick, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
