export type QuestionType = {
  id: string;
  text: string;
  type: string;
  quizId: string;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  stepValue?: number;
  answer: string;
};
