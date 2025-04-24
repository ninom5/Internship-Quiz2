// import { axiosInstance } from "@constants/axiosAPI";
// import { useToken } from "./useToken";
// import { useMemo } from "react";

// export const useAuthenticatedAxiosAPI = () => {
//   const { token } = useToken();

//   const api = useMemo(() => {
//     const instance = axiosInstance;
//     instance.interceptors.request.use((config) => {
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     });

//     return instance;
//   }, [token]);

//   return api;
// };
