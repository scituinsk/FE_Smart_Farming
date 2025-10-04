import { cva } from "class-variance-authority";
import React, { createContext, useContext, useState, useEffect } from "react";

import { cn } from "../../utils/cn";

const avatarVariants = cva("relative flex h-10 w-10 shrink-0 overflow-hidden", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

const AvatarContext = createContext();

const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar components must be used within an <Avatar> provider");
  }
  return context;
};

const Avatar = React.forwardRef(({ className, size, shape, ...props }, ref) => {
  const [imageStatus, setImageStatus] = useState("loading");

  return (
    <AvatarContext.Provider value={{ imageStatus, setImageStatus }}>
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      />
    </AvatarContext.Provider>
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ src, className, ...props }, ref) => {
  const { imageStatus, setImageStatus } = useAvatarContext();

  useEffect(() => {
    if (!src) {
      setImageStatus("error");
    } else {
      setImageStatus("loading");
    }
  }, [src, setImageStatus]);

  if (imageStatus === "error") {
    return null;
  }

  return (
    <img
      ref={ref}
      src={src}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onLoad={() => setImageStatus("loaded")}
      onError={() => setImageStatus("error")}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => {
  const { imageStatus } = useAvatarContext();

  if (imageStatus === "loaded") {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 font-medium select-none", className)}
      {...props}
    >
      {children}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
