import { axiosInstance } from "@constants/axiosAPI";

export const fetchUserByEmail = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/user/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
