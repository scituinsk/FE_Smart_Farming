import React, { useEffect } from "react";
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal,
  ModalOverlay,
  Heading,
  Button,
} from "react-aria-components";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../utils/cn";

const Dialog = AriaDialogTrigger;

const DialogTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    useEffect(() => {
      // Calculate scrollbar width when modal opens
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Store original values
      const originalStyle = window.getComputedStyle(document.body);
      const originalPaddingRight = originalStyle.paddingRight;

      // Apply scroll lock with compensation for scrollbar
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `calc(${originalPaddingRight} + ${scrollbarWidth}px)`;

      return () => {
        // Restore original styles
        document.body.style.overflow = "";
        document.body.style.paddingRight = originalPaddingRight;
      };
    }, []);

    return (
      <ModalOverlay
        className={cn(
          "fixed inset-0 z-50 bg-black/40  data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
          className,
        )}
        isDismissable
      >
        <Modal
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4  bg-background p-6 shadow-lg duration-200 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[entering]:slide-in-from-left-1/2 data-[entering]:slide-in-from-top-[48%] data-[exiting]:slide-out-to-left-1/2 data-[exiting]:slide-out-to-top-[48%] sm:rounded-lg",
            className,
          )}
          {...props}
        >
          <AriaDialog className="outline-none">{children}</AriaDialog>
        </Modal>
      </ModalOverlay>
    );
  },
);

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Heading
    ref={ref}
    slot="title"
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

const DialogClose = React.forwardRef(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className,
    )}
    {...props}
  >
    <IoMdClose className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </Button>
));

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
