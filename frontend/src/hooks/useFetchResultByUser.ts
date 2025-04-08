import { QuizResultType } from "types/quizResultType";
import { useEffect, useState } from "react";
import { axiosNoAuthAPI } from "@constants/axiosAPI";

export const useFetchResultByUser = (id: string) => {
  const [data, setData] = useState<QuizResultType | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosNoAuthAPI.get(`/quizResult/user/${id}`);
        if (response.status !== 200)
          throw new Error("Error fetching quiz results by user");

        setData(response.data);
      } catch (error: Error | any) {
        console.error(`Error fetching quiz result by user: ${error}`);
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }

      return { data, error, isLoading };
    };

    fetchResults();
  }, []);
};
