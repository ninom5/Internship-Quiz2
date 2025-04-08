import { axiosAuthAPI } from "@constants/axiosAPI";
import { useState } from "react";
import { QuizResultCreateDto } from "types/quizResultCreateDto";

export const useCreateQuizResult = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitResult = async (userResult: QuizResultCreateDto) => {
    try {
      setIsSubmitting(true);
      const response = await axiosAuthAPI.post("quizResult", userResult);

      if (response.status !== 201)
        throw new Error("Error while creating quiz result");
    } catch (error: any) {
      console.error(
        "Error submitting quiz result:",
        error.response.data.message || error
      );
      setSubmitError(
        error.response?.data?.message || "Failed to submit result"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitResult, isSubmitting, submitError };
};
