import { CreateQuizDto, QuestionType } from "types/index";
import { validateFields } from "./validateFields";

export const quizDataValidation = (
  quizData: CreateQuizDto,
  allQuestions: QuestionType[] | null
) => {
  const { title, description, categoryId, questions } = quizData;
  if (!allQuestions) return "Can't fetch all questions";

  const fieldsCheckMessage = validateFields({
    "Quiz title": title,
    "Quiz description": description,
    Category: categoryId,
  });

  if (fieldsCheckMessage) return fieldsCheckMessage;

  if (!questions || questions.length < 5)
    return "Please select at least 5 questions";

  const questionTypes = allQuestions
    .filter((q) => questions.includes(q.id))
    .map((item) => item.type);

  const types = new Set(questionTypes);
  if (types.size < 3) return "Select at least 3 different question types";

  return null;
};
