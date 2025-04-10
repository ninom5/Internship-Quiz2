export type QuestionCreateDto = {
  text: string;
  type: string;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  stepValue?: number;
  answer: string;
};
