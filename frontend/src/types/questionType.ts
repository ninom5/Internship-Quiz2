export type QuestionType = {
  id: string;
  text: string;
  type: string;
  quizId: string;
  options?: string[];
  answer: string;
};
