import {
  useFetchResultsByQuiz,
  useFetchQuizzesByTitle,
  useFetchAllResults,
} from "@hooks/index";
import { useEffect, useState } from "react";
import { QuizType, QuizResultType } from "types/index";
import { groupByUser } from "@utils/groupByUser";

export const UserScoresPage = () => {
  const [quizId, setQuizId] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType>();
  const [groupedResults, setGroupedResults] = useState<
    Record<string, { user: QuizResultType["user"]; scores: QuizResultType[] }>
  >({});

  const {
    data: quizzes,
    error: quizzesError,
    isLoading: quizzesIsLoading,
  } = useFetchQuizzesByTitle("", "");
  const {
    data: allResults,
    error: allResultsError,
    isLoading: allResultsIsLoading,
  } = useFetchAllResults();
  const { data, error, isLoading } = useFetchResultsByQuiz(quizId as string);

  useEffect(() => {
    if (allResults) setGroupedResults(groupByUser(allResults));
  }, [allResults]);

  if (allResultsError) return <div>Error fetching all results</div>;
  if (quizzesError) return <div>Error fetching quizzes</div>;
  if (error) return <div>Error fetching results </div>;

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
            <option value="" disabled>
              Pick quiz
            </option>
            {quizzes?.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
          {!quizId && (
            <div>
              <h2 className="font-semibold mb-2">All User Results</h2>
              {Object.values(groupedResults).map((entry) => (
                <div
                  key={entry.user.id}
                  className="mb-4 border p-3 rounded bg-gray-50"
                >
                  <p className="font-bold">
                    {entry.user.name} {entry.user.surname}
                  </p>
                  <ul className="ml-4 list-disc">
                    {entry.scores.map((score) => (
                      <li key={score.id}>
                        {score.Quiz.title}: {score.score} /{" "}
                        {selectedQuiz?.questions.length}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {quizId && (
            <div>
              <h3 className="font-semibold">
                Results by quiz: {selectedQuiz?.title}
              </h3>
              <p className="text-sm italic mb-3">{selectedQuiz?.description}</p>

              {isLoading ? (
                <div>Loading results...</div>
              ) : data && data.length > 0 ? (
                data.map((d) => (
                  <div
                    key={d.id}
                    className="border p-3 my-2 rounded bg-gray-50"
                  >
                    User:{" "}
                    <strong>
                      {d.user.name} {d.user.surname}
                    </strong>{" "}
                    - Score: <strong>{d.score}</strong> /{" "}
                    {selectedQuiz?.questions.length}
                  </div>
                ))
              ) : (
                <div>No results found for this quiz.</div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
