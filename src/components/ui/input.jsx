import React from "react";
import { TextField as AriaTextField, Label as AriaLabel, Input as AriaInput, Text as AriaText } from "react-aria-components";
import { cn } from "../../utils/cn"; // Sesuaikan path

// --- 1. Container Utama (Otak dari Field) ---
const TextField = React.forwardRef(({ className, ...props }, ref) => (
  <AriaTextField
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
TextField.displayName = "TextField";

// --- 2. Label ---
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <AriaLabel
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

// --- 3. Input ---
const Input = React.forwardRef(({ className, ...props }, ref) => (
  <AriaInput
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm",
      "ring-offset-white placeholder:text-zinc-500",
      // Warna focus ring sudah disesuaikan dengan hex #326765
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#326765] focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-[#326765]",
      "data-[invalid]:border-red-500 dark:data-[invalid]:border-red-700",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

// --- 4. Teks Bantuan & Error Message ---
const Text = React.forwardRef(({ className, ...props }, ref) => (
  <AriaText
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
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
