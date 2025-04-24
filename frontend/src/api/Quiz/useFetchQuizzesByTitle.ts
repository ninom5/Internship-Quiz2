import { useEffect, useState } from "react";
import { QuizType } from "types/quizType";
import { axiosInstanceAPI } from "@api/index";

export const useFetchQuizzesByTitle = (title: string, category: string) => {
  const [data, setData] = useState<QuizType[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAPI = axiosInstanceAPI();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (title) queryParams.append("title", title);
        if (category) queryParams.append("category", category);

        const response = await authAPI.get<QuizType[]>(
          `/quiz?${queryParams.toString()}`
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
  }, [title, category]);
  return { data, error, isLoading };
};
