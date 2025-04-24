import { QuestionCreateDto } from "types/questionCreateDto";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstanceAPI } from "@api/index";

export const useCreateQuestion = (question: QuestionCreateDto) => {
  const [error, setError] = useState(null);
  const authAPI = axiosInstanceAPI();

  const createQuestion = async () => {
    try {
      const response = await authAPI.post("/question", question);

      if (response.status !== 201) throw new Error("Error creating question");

      toast.success("Successfully crated new question");
    } catch (error: Error | any) {
      toast.error(`Error creating question: ${error?.response?.data?.message}`);
      console.error(error);
      setError(error);
    }
  };

  return { createQuestion, error };
};
