import { cn } from "../../utils/cn";

export const Skeleton = ({ className = "" }) => {
  return <div className={cn("animate-pulse bg-gray-300 rounded", className)} />;
};
