import { CreateQuizDto } from "types/createQuizDto";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuthenticatedAxiosAPI } from "./useAuthenticatedAxiosAPI";

export const useCreateQuiz = () => {
  const [createError, setCreateError] = useState(null);
  const authAPI = useAuthenticatedAxiosAPI();

  const createQuiz = async (quizData: CreateQuizDto) => {
    try {
      const response = await authAPI.post("/quiz", quizData);

      if (response.status !== 201) throw new Error();

      toast.success("Successfully created new quiz");
    } catch (error: Error | any) {
      toast.error(
        `Error creating new quiz: ${error?.response?.data?.message || error} `
      );
      console.error(error);
      setCreateError(error);
    }
  };

  return { createQuiz, createError };
};
