import { useEffect, useState } from "react";
import { QuizType } from "types/quizType";
import { axiosAPI } from "@constants/index";

export const useFetchQuizById = (quizId: string) => {
  const [data, setData] = useState<QuizType | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await axiosAPI.get<QuizType>(`/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (quiz.status !== 200) throw new Error("Failed to fetch quiz by id");

        setData(quiz.data);
      } catch (error: Error | any) {
        console.error(`Error fetching quiz by id: ${error}`);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  return { data, error, isLoading };
};
