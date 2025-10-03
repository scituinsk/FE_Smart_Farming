import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Button as AriaButton } from "react-aria-components";

import { cn } from "../../utils/cn";

const buttonVariants = cva(
  // Base styles (sedikit disesuaikan untuk state dari React Aria)
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 pressed:bg-blue-800",
        primary: "bg-green-600 text-white hover:bg-green-700 pressed:bg-green-800",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 pressed:bg-gray-800",
        destructive: "bg-red-600 text-white hover:bg-red-700 pressed:bg-red-800",

        outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
        "outline-primary": "border border-green-600 bg-transparent text-green-600 hover:bg-green-50",
        "outline-destructive": "border border-red-600 bg-transparent text-red-600 hover:bg-red-50",

        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        "ghost-primary": "bg-transparent text-green-600 hover:bg-green-50",
        "ghost-destructive": "bg-transparent text-red-600 hover:bg-red-50",

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
        default: " rounded-[15px]",
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

const Button = forwardRef(({ className, variant, size, rounded, children, ...props }, ref) => {
  return (
    <AriaButton
      ref={ref}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {children}
    </AriaButton>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
