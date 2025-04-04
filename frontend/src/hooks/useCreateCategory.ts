import { axiosAPI } from "@constants/axiosAPI";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const [createError, setCreateError] = useState(null);
  const createCategory = async (categoryTitle: string) => {
    try {
      const response = await axiosAPI.post(`/category`, categoryTitle, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
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
