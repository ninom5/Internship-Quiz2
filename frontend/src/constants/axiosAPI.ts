import { API_URL } from "./URLS";
import axios from "axios";

// const token = sessionStorage.getItem("jwt") || "";

export const axiosAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
