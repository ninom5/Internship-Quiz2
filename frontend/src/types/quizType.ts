import { CategoryType } from "./categoryType";
import { QuestionType } from "./questionType";
export type QuizType = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  questions: { questions: QuestionType }[];
  category: CategoryType;
};
