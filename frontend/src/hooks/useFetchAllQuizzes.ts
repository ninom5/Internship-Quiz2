import { axiosAPI } from "../constants/axiosAPI";
import { useEffect, useState } from "react";
import { QuizType } from "../types/quizType";

export const useFetchAllQuizzes = () => {
  const [data, setData] = useState<QuizType[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await axiosAPI.get<QuizType[]>("/quiz");
        if (response.status !== 200) throw new Error("Failed to fetch quizzes");

        setData(response.data);
      } catch (error: Error | any) {
        console.error("Error fetching quizzes:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllQuizzes();
  }, []);

  return { data, error, isLoading };
};
