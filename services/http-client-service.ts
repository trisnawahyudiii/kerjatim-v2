import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const HttpClientService = axios.create({
  baseURL: BASE_URL,
});

// Request config
HttpClientService.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["Accept"] = "application/json";

  return config;
});

// Response config
HttpClientService.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    return Promise.reject<AxiosError>(err);
  },
);
