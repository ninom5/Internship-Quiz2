export type QuizResultType = {
  id: string;
  userId: string;
  score: number;
  quizId: string;
  user: {
    id: string;
    name: string;
    surname: string;
  };
  Quiz: {
    title: string;
    description: string;
  };
};
