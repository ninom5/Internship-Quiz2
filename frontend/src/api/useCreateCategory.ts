import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthenticatedAxiosAPI } from "../hooks/useAuthenticatedAxiosAPI";
import { CreateCategoryDto } from "types/categoryType";

export const useCreateCategory = () => {
  const authAPI = useAuthenticatedAxiosAPI();
  const [createError, setCreateError] = useState(null);
  const createCategory = async (categoryData: CreateCategoryDto) => {
    try {
      const response = await authAPI.post(`/category`, categoryData);

      if (response.status !== 201)
        throw new Error("error creating new category");
    } catch (error: Error | any) {
      toast.error(`Error creating category: ${error?.response?.data?.message}`);
      console.error(`Error: ${error}`);
      setCreateError(error);
    }
  };

  return { createCategory, createError };
};
