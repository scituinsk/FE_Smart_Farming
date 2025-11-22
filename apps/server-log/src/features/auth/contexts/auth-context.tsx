import { createContext, useContext, useMemo } from "react";
import { useSession } from "../queries/use-session";

interface AuthContextType {
  user: { username: string; email: string; firstName: string; lastName: string } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // useSession sudah menangani semua logic fetching
  // Data initial sudah di-prefetch oleh loader
  const { data: user, isLoading } = useSession();

  // Gunakan useMemo untuk mencegah re-render yang tidak perlu pada komponen consumer
  const value = useMemo(
    () => ({
      user: user || null,
      isLoading,
      isAuthenticated: !!user,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};
