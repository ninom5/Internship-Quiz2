import { axiosAPI } from "@constants/axiosAPI";
import { CreateQuizDto } from "types/createQuizDto";
import { toast } from "react-toastify";
import { useState } from "react";

export const useCreateQuiz = () => {
  const [createError, setCreateError] = useState(null);
  const token = sessionStorage.getItem("jwt");

  const createQuiz = async (quizData: CreateQuizDto) => {
    try {
      if (!token) throw new Error("Can't find token");
      console.log(quizData);
      const response = await axiosAPI.post("/quiz", quizData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  return { createQuiz };
};
