import axios from "axios";
const BASE_URL =  process.env.REACT_APP_API_URI || "http://localhost:9200";
export default axios.create({
  baseURL: `${BASE_URL}/api`
});

export const axiosPrivate = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true
});