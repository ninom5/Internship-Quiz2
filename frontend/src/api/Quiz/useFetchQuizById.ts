import { useEffect, useState } from "react";
import { QuizType } from "types/quizType";
import { axiosInstanceAPI } from "../base";

export const useFetchQuizById = (quizId: string) => {
  const [data, setData] = useState<QuizType | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAPI = axiosInstanceAPI();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await authAPI.get<QuizType>(`/quiz/${quizId}`);
        if (quiz.status !== 200) throw new Error("Failed to fetch quiz by id");

        setData(quiz.data);
      } catch (error: Error | any) {
        console.error(`Error fetching quiz by id: ${error}`);
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  return { data, error, isLoading };
};
