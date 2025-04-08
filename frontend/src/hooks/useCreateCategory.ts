import { axiosAuthAPI } from "@constants/axiosAPI";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const [createError, setCreateError] = useState(null);
  const createCategory = async (categoryTitle: string) => {
    try {
      const response = await axiosAuthAPI.post(`/category`, {
        title: categoryTitle,
      });

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
