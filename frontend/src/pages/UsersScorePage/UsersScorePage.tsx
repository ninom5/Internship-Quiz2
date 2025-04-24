import {
  useFetchResultsByQuiz,
  useFetchQuizzesByTitle,
  useFetchAllResults,
} from "@api/index";
import { useEffect, useState } from "react";
import { QuizType, QuizResultType } from "types/index";
import { groupByUser } from "@utils/groupByUser";
import { QuizResultGrid } from "@components/index";

export const UserScoresPage = () => {
  const [quizId, setQuizId] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType>();
  const [groupedResults, setGroupedResults] = useState<
    Record<
      string,
      { user: QuizResultType["user"]; scores: QuizResultType[]; total: number }
    >
  >({});

  const {
    data: quizzes,
    error: quizzesError,
    isLoading: quizzesIsLoading,
  } = useFetchQuizzesByTitle("", "");
  const { data: allResults, error: allResultsError } = useFetchAllResults();
  // const { data, error, isLoading } = useFetchResultsByQuiz(quizId as string);

  useEffect(() => {
    if (allResults) setGroupedResults(groupByUser(allResults));
  }, [allResults]);

  if (allResultsError) return <div>Error fetching all results</div>;
  if (quizzesError) return <div>Error fetching quizzes</div>;
  // if (error) return <div>Error fetching results </div>;

  return (
    <section>
      <h1>Results by quizzes</h1>
      <div>
        {quizzesIsLoading ? (
          <div>Loading quizzes...</div>
        ) : (
          <select
            name="quiz-select"
            id="quiz-select"
            onChange={(e) => {
              setQuizId(e.target.value);
              setSelectedQuiz(quizzes?.find((q) => q.id === e.target.value));
            }}
            defaultValue=""
          >
            <option value="">All Quizzes</option>
            {quizzes?.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {false ? (
        <div>Loading data...</div>
      ) : (
        <QuizResultGrid
          quizId={quizId}
          groupedResults={groupedResults}
          selectedQuiz={selectedQuiz}
          // data={data}
          // isLoading={isLoading}
        />
      )}
    </section>
  );
};
