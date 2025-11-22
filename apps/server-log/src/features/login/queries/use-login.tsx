import { useMutation } from "@tanstack/react-query";

import { baseURL } from "@/lib/axios";
import { type MutationConfig } from "@/lib/query-client";
import { setAccessToken, setRefreshToken } from "../utils/token-helper";
import axios from "axios";
import { useNavigate } from "react-router";

type LoginResponse = {
  success: boolean;
  status: number;
  message: string;
  errors: boolean;
  data: {
    refresh: string;
    access: string;
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
    };
  };
};

type LoginRequest = {
  username: string;
  password: string;
};

export const login = async (loginRequest: LoginRequest) => {
  const response = await axios.post<LoginResponse>(`${baseURL}/login`, loginRequest);
  return response.data.data;
};

type useLoginParams = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = (params: useLoginParams = {}) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      navigate(0);

      params.mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};
