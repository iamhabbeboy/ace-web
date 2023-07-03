import axios from "axios";
import { getToken } from "./common";

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/v1` || "http://localhost:9200/api/v1",
  timeout: 1000,
})

const token = getToken();
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const Axios = request;
