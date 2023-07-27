import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URI}/api` || "http://localhost:9200/api";
export default axios.create({
  baseURL: BASE_URL
});
export const Axios = axios.create({
  baseURL: `${BASE_URL}/v1`
});
