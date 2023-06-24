import axios from "axios";
import { getToken } from "./common";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URI || "http://localhost:9200/api/v1",
  headers: {
    Authorization: `Bearer ${getToken}`
  }
});

// request.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${getToken()}`;
//   return config;
// });

export const Axios = request;
