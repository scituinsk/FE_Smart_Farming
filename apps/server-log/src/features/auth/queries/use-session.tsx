import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type UserResponse = {
  success: boolean;
  status: number;
  message: string;
  errors: boolean;
  data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    description: any;
    image: any;
    modul_count: number;
  };
};

export type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

const fetchSession = async (): Promise<User | null> => {
  try {
    const response = await api.get<UserResponse>("/user/me");
    const data = response.data.data;

    return {
      username: data.username,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
    };
  } catch (error: any) {
    // Jika 401, user tidak authenticated, return null
    if (error.response?.status === 401) {
      return null;
    }
    // Error lainnya (500, network), throw agar ditangani error boundary
    throw error;
  }
};

// Query options yang bisa dipakai di loader dan component
export const sessionQueryOptions = queryOptions({
  queryKey: ["auth-session"],
  queryFn: fetchSession,
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000, // 5 menit
});

// Hook untuk digunakan di component
export const useSession = () => {
  return useQuery(sessionQueryOptions);
};
