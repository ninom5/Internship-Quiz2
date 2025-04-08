import { API_URL } from "./URLS";
import axios from "axios";

const token = sessionStorage.getItem("jwt") || "";

export const axiosAuthAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const axiosNoAuthAPI = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});
