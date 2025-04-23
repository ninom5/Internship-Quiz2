import { QuizResultType } from "types/quizResultType";

interface GroupedResults {
  [key: string]: {
    user: {
      id: string;
      name: string;
      surname: string;
    };
    scores: QuizResultType[];
  };
}

export const groupByUser = (results: QuizResultType[]) => {
  return results?.reduce<GroupedResults>((acc, result) => {
    const resultId = result.user.id;
    if (!acc[resultId]) {
      acc[resultId] = {
        user: result.user,
        scores: [],
      };
    }
    acc[resultId].scores.push(result);

    return acc;
  }, {} as GroupedResults);
};
