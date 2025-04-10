export type QuizResultType = {
  id: string;
  userId: string;
  score: number;
  quizId: string;
  user: {
    name: string;
    surname: string;
  };
};
