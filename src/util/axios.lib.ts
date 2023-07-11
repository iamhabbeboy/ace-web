import axios, { RawAxiosRequestHeaders } from "axios";
import { getToken } from "./common";

const request = axios.create({
  baseURL:
    `${process.env.REACT_APP_API_URI}/api/v1` || "http://localhost:9200/api/v1",
  timeout: 1000,
});

const token = getToken();
// if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.interceptors.request.use((cfg) => {
  cfg["headers"] = cfg.headers ?? {};
  (cfg.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
  return cfg;
});

export const Axios = request;
