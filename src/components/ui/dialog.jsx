import React from "react";
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Heading as AriaHeading,
} from "react-aria-components";
import { cn } from "../../utils/cn";

const Dialog = (props) => <AriaDialogTrigger {...props} />;

const DialogTrigger = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    {...props}
  />
));
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AriaModalOverlay
    {...props}
    className={cn(
      "fixed inset-0 z-50 bg-black/60",
      "data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
      className
    )}
  >
    <AriaModal
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "gap-4 border bg-white p-6 shadow-lg duration-200",
        "dark:border-zinc-800 dark:bg-zinc-950",
        "rounded-lg",
        "data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
        className
      )}
    >
      <AriaDialog
        ref={ref}
        className="relative outline-none"
      >
        {children}
      </AriaDialog>
    </AriaModal>
  </AriaModalOverlay>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AriaHeading
    ref={ref}
    slot="title"
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
);
DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
