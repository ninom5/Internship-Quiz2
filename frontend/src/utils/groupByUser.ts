import { QuizResultType } from "types/quizResultType";

interface GroupedResults {
  [key: string]: {
    user: {
      id: string;
      name: string;
      surname: string;
    };
    scores: QuizResultType[];
    total: number;
  };
}

export const groupByUser = (results: QuizResultType[]) => {
  return results?.reduce<GroupedResults>((acc, result) => {
    const resultId = result.userId;
    if (!acc[resultId]) {
      acc[resultId] = {
        user: result.user,
        scores: [],
        total: 0,
      };
    }
    acc[resultId].scores.push(result);
    acc[resultId].total += result.score;

    return acc;
  }, {} as GroupedResults);
};
