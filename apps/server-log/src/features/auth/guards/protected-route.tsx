import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "@/features/auth/contexts/auth-context";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Jika tidak ada user (belum login), alihkan ke halaman login
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Jika sudah terautentikasi, izinkan akses ke protected routes
  return <Outlet />;
};
