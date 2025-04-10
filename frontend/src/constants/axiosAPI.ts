import { API_URL } from "./URLS";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
