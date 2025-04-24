import { AxiosInstance } from "axios";

export const fetchUserByEmail = async (
  email: string,
  axiosInstance: AxiosInstance
) => {
  try {
    const response = await axiosInstance.get(`/user/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
