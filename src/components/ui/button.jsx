import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Button as AriaButton } from "react-aria-components";
import { forwardRef, cloneElement, isValidElement } from "react";

import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-invers hover:bg-secondary",

        primary: "bg-primary text-text-invers hover:bg-secondary",
        secondary: "bg-secondary text-text-invers hover:bg-primary",
        teal: "bg-primary text-text-invers hover:bg-[#274F4D] active:bg-[#274F4D]",
        ternary:
          "bg-ternary text-text-invers hover:bg-primary active:bg-secondary",

        destructive:
          "bg-error text-text-invers hover:opacity-90 active:opacity-80",

        outline:
          "bg-transparent border border-primary text-primary hover:bg-primary hover:text-text-invers",

        "outline-primary":
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-text-invers",

        "outline-destructive":
          "border border-error bg-transparent text-error hover:bg-error hover:text-text-invers",

        ghost:
          "bg-transparent text-text hover:bg-surface/70 active:bg-surface/90",
        "ghost-primary":
          "bg-transparent text-primary hover:bg-surface/70 active:bg-surface/90",
        "ghost-destructive":
          "bg-transparent text-error hover:bg-surface/70 active:bg-surface/90",

        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-lg",
        xl: "h-14 px-10 text-xl",
        icon: "h-10 w-10",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-[15px]",
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
  },
);

const Button = forwardRef(
  (
    { className, variant, size, rounded, asChild = false, children, ...props },
    ref,
  ) => {
    const buttonClasses = cn(
      buttonVariants({ variant, size, rounded, className }),
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ref,
        className: cn(buttonClasses, children.props.className),
        ...props,
        ...children.props,
      });
    }

    return (
      <AriaButton ref={ref} className={buttonClasses} {...props}>
        {children}
      </AriaButton>
    );
  },
);

Button.displayName = "Button";

export { Button };
