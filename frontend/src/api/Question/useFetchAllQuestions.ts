import { useEffect, useState } from "react";
import { QuestionType } from "types/questionType";
import { axiosInstanceAPI } from "../base";

export const useFetchAllQuestions = () => {
  const [data, setData] = useState<QuestionType[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAPI = axiosInstanceAPI();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await authAPI.get("/question");

        if (response.status !== 200)
          throw new Error("Failed to fetch questions");

        setData(response.data);
      } catch (error: Error | any) {
        console.error(`Error fetching all questions: ${error}`);
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { data, error, isLoading };
};
