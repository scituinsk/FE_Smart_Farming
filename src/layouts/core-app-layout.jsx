import { Navigate, Outlet, useLocation } from "react-router";

import { CoreAppHeader } from "../features/core-app/components/core-app-header";

export const CoreAppLayout = () => {
  const location = useLocation();

  if (location.pathname.replace(/\/$/, "") === "/app") {
    // Redirect to /app/dashboard
    return (
      <Navigate
        to="/app/dashboard"
        replace
      />
    );
  }
  return (
    <>
      <CoreAppHeader />
      <Outlet />
    </>
  );
};
