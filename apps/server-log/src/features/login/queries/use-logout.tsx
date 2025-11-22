import { useMutation } from "@tanstack/react-query";

import { api, baseURL } from "@/lib/axios";
import { type MutationConfig } from "@/lib/query-client";
import { getRefreshToken, clearTokens } from "../utils/token-helper";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type LogoutResponse = {
  success: boolean;
  status: number;
  message: string;
  errors: boolean;
};

type LogoutRequest = {
  refresh: string;
};

export const logout = async () => {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error("No refresh token found");
  }

  const logoutRequest: LogoutRequest = {
    refresh,
  };

  const response = await api.post<LogoutResponse>(`${baseURL}/logout`, logoutRequest);
  return response.data;
};

type useLogoutParams = {
  mutationConfig?: MutationConfig<typeof logout>;
};

export const useLogout = (params: useLogoutParams = {}) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      clearTokens();
      navigate(0);

      params.mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: () => {
      toast.error("Gagal logout silahkan coba lagi nanti");
    },
  });
};
