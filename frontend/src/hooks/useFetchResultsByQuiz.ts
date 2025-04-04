import { axiosAPI } from "@constants/axiosAPI";
import { useEffect, useState } from "react";
import { QuizResultType } from "types/quizResultType";

export const useFetchResultsByQuiz = (quizId: string) => {
  const [data, setData] = useState<QuizResultType[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosAPI.get(`quizResult/quiz/${quizId}`);

        if (response.status !== 200)
          throw new Error("Error fetching quiz results by quiz");

        setData(response.data);
      } catch (error: Error | any) {
        console.error(`Error fetching quiz result by quiz: ${error}`);
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);
  return { data, error, isLoading };
};
