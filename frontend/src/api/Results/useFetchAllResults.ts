import { useEffect, useState } from "react";
import { QuizResultType } from "types/quizResultType";
import { axiosInstanceAPI } from "@api/index";

export const useFetchAllResults = () => {
  const [data, setData] = useState<QuizResultType[]>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAPI = axiosInstanceAPI();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await authAPI.get<QuizResultType[]>(`quizResult`);
        if (response.status !== 200) throw new Error();

        setData(response.data);
      } catch (error: Error | any) {
        console.error(`Error fetching all results: ${error}`);
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);

  return { data, error, isLoading };
};
