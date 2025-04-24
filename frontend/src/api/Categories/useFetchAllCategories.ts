import { useState, useEffect } from "react";
import { axiosInstanceAPI } from "@api/index";

interface Category {
  id: string;
  title: string;
}
export const useFetchAllCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAPI = axiosInstanceAPI();

  const fetchCategories = async () => {
    try {
      const response = await authAPI.get("/category");

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
