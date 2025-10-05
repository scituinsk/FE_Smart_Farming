import React from "react";
import {
  TextField as AriaTextField,
  Label as AriaLabel,
  Input as AriaInput,
  Text as AriaText,
} from "react-aria-components";

import { cn } from "../../utils/cn";

const TextField = React.forwardRef(({ className, ...props }, ref) => (
  <AriaTextField
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
TextField.displayName = "TextField";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <AriaLabel
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <AriaInput
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm",
      "ring-offset-white placeholder:text-zinc-500",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[invalid]:border-red-500 ",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

const Text = React.forwardRef(({ className, ...props }, ref) => (
  <AriaText ref={ref} className={cn("text-sm", className)} {...props} />
));
Text.displayName = "Text";

const InputDescription = React.forwardRef(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    slot="description"
    className={cn("text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
InputDescription.displayName = "InputDescription";

const InputErrorMessage = React.forwardRef(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    slot="errorMessage"
    className={cn("font-medium text-red-500 dark:text-red-700", className)}
    {...props}
  />
));
InputErrorMessage.displayName = "InputErrorMessage";

export { TextField, Label, Input, InputDescription, InputErrorMessage };
