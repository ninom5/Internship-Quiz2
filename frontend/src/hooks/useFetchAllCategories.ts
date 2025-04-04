import { axiosAPI } from "@constants/axiosAPI";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  title: string;
}
export const useFetchAllCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axiosAPI.get("/category", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error: Error | any) {
      setError(error?.response?.data);
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { data, error, isLoading, refetch: fetchCategories };
};
