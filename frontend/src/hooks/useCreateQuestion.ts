import { axiosAPI } from "@constants/axiosAPI";
import { QuestionCreateDto } from "types/questionCreateDto";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCreateQuestion = (question: QuestionCreateDto) => {
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("jwt");
  const createQuestion = async () => {
    try {
      console.log(question);
      const response = await axiosAPI.post("/question", question, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) throw new Error("Error creating question");

      toast.success("Successfully crated new question");
    } catch (error: Error | any) {
      toast.error(`Error creating question: ${error?.response?.data?.message}`);
      console.error(error);
      setError(error);
    }
  };

  return { createQuestion };
};
