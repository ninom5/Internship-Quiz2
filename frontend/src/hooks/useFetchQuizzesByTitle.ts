import { useEffect, useState } from "react";
import { QuizType } from "types/quizType";
import { axiosAPI } from "@constants/index";

export const useFetchQuizzesByTitle = (title: string) => {
  const [data, setData] = useState<QuizType[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (title) return;

    const fetchQuizzes = async () => {
      try {
        const response = await axiosAPI.get<QuizType[]>(
          `/quiz/by-title/${title}`
        );
        if (response.status !== 200)
          throw new Error("Failed to fetch quizzes by title");

        setData(response.data);
      } catch (err: any) {
        console.error("Error fetching quizzes by title: ", err);
        setError(err.response?.data?.message || "Failed to fetch quizzes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, [title]);
  return { data, error, isLoading };
};
