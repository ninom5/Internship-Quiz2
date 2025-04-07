export type QuestionCreateDto = {
  text: string;
  type: string;
  // quizId: string;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  answer: string;
};
