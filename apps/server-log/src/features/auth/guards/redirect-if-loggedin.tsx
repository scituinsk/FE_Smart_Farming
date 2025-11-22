import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/contexts/auth-context";

export const RedirectIfLoggedIn = () => {
  const { user } = useAuth();

  if (user) {
    const destination = "/";
    return (
      <Navigate
        to={destination}
        replace
      />
    );
  }

  //   Redirect to login page
  return <Outlet />;
};
