import { Spinner } from "./spinner";

export const FullPageSpinner = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
};
