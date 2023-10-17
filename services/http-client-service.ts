import axios, { AxiosError } from "axios";
import {
  retrieveAccessToken,
  retrieveRefreshToken,
  storeAccessToken,
  removeRefreshToken,
  removeAccessToken,
  storeRefreshToken,
} from "features/auth/utilities";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const HttpClientService = axios.create({
  baseURL: BASE_URL,
});

// Request config
HttpClientService.interceptors.request.use((config) => {
  const accessToken = retrieveAccessToken();

  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["Accept"] = "application/json";

  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }

  return config;
});

// Response config
HttpClientService.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const refreshToken = retrieveRefreshToken();

    if (refreshToken && err.response?.status === 401) {
      try {
        const getToken = await axios.post(BASE_URL + "/auth/refresh", {
          refreshToken: refreshToken,
        });

        storeAccessToken(getToken.data.accessToken);
        storeRefreshToken(getToken.data.refreshToken);
      } catch (err) {
        removeRefreshToken();
        removeAccessToken();
      }
    }

    if (!refreshToken) {
      removeRefreshToken();
      removeAccessToken();

      return Promise.reject<AxiosError>(err);
    }

    return Promise.reject<AxiosError>(err);
  }
);
