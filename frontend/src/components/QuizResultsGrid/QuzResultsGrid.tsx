import { QuizResultType } from "types/index";

export const QuizResultGrid = ({
  quizId,
  groupedResults,
  //   data,
  //   isLoading,
}: {
  quizId: string;
  groupedResults: Record<
    string,
    { user: QuizResultType["user"]; scores: QuizResultType[]; total: number }
  >;
  //   data: QuizResultType[] | null;
  //   isLoading: boolean;
}) => {
  return (
    <section>
      {!quizId && (
        <div className="flex justify-center items-center flex-col">
          <h2 className="font-semibold mb-2 text-[30px]">All User Results</h2>
          {Object.values(groupedResults).map((entry) => (
            <div
              key={entry.user.id}
              className="mb-4 border p-3 rounded border-white w-1/2 flex flex-col justify-center items-center p-5"
            >
              <p className="font-bold text-[25px]">
                {entry.user.name} {entry.user.surname}
              </p>
              <ul className="ml-4 list-disc">
                {entry.scores.map((score) => (
                  <li key={score.id} className="text-[20px]">
                    {score.Quiz.title}: {score.score} /{" "}
                    {score.Quiz?.questions?.length ?? "?"}
                  </li>
                ))}
                <li className="text-blue-500 text-[25px]">
                  Total: {entry.total}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* {quizId && (
        <div>
          <h3 className="font-semibold">
            Results by quiz: {selectedQuiz?.title}
          </h3>
          <p className="text-sm italic mb-3">{selectedQuiz?.description}</p>

          {false ? (
            <div>Loading results...</div>
          ) : data && data.length > 0 ? (
            data.map((d) => (
              <div key={d.id} className="border p-3 my-2 rounded bg-gray-50">
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
      )} */}
    </section>
  );
};
