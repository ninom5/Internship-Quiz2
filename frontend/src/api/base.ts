import { useToken } from "@hooks/useToken";
import { useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from "@constants/URLS";

export const axiosInstanceAPI = () => {
  const { token, isExpired } = useToken();

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: API_URL,
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token || !isExpired)
          config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.request.eject(requestInterceptor);
  }, [axiosInstance, token]);

  return axiosInstance;
};
