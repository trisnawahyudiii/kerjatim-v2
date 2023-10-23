import axios from "axios";

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
