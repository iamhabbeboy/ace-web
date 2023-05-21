import axios from "axios"
export const Axios = axios.create({
    baseURL: process.env.API_URL || "http://localhost:9200"
})