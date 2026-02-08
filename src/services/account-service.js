import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getApiUrl = () => {
  const isLocal = window.location.hostname === "localhost";
  return API_BASE_URL || "/api-proxy";
};

export const loginService = async (username, password) => {
  try {
    const url = `${getApiUrl()}/login`;
    const response = await axios.post(url, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const deleteAccountService = async (token, password) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = `${getApiUrl()}/delete-account`;
    const response = await axios.post(url, { password }, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getTermsService = async () => {
  try {
    const url = `${getApiUrl()}/terms`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
