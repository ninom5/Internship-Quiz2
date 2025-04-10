import { QuestionType } from "types/index";
import { toast } from "react-toastify";

export const isCorrectAnswer = (
  questionType: string,
  quizQuestion: QuestionType,
  userAnswer: string | string[]
) => {
  const normalizeAnswer = (value: string) => value.trim().toLowerCase();

  if (questionType !== "CHECKBOX") {
    if (
      typeof userAnswer === "string" &&
      normalizeAnswer(userAnswer) === normalizeAnswer(quizQuestion.answer)
    ) {
      toast.success("Correct!");
      return true;
    }

    toast.error(`Incorrect! Correct answer: ${quizQuestion.answer}`);
    return false;
  }

  if (!Array.isArray(userAnswer)) {
    toast.error("Invalid answer format for checkbox question.");
    return false;
  }

  const userAnswers = userAnswer.map(normalizeAnswer).filter(Boolean);

  const correctAnswers = quizQuestion.answer
    .split(",")
    .map(normalizeAnswer)
    .filter(Boolean);

  const isCorrect =
    userAnswer.length === correctAnswers.length &&
    userAnswers.every((ans) => correctAnswers.includes(ans));

  if (isCorrect) {
    toast.success("Correct!");
    return true;
  }

  toast.error(`Incorrect! Correct answer: ${quizQuestion.answer}`);
  return false;
};
