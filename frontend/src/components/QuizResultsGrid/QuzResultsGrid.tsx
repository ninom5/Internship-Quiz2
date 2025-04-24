import { QuizResultType } from "types/index";

export const QuizResultGrid = ({
  groupedResults,
}: {
  groupedResults: Record<
    string,
    { user: QuizResultType["user"]; scores: QuizResultType[]; total: number }
  >;
}) => {
  return (
    <section className="w-full">
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-semibold text-[30px] my-7">All User Results</h2>
        {Object.values(groupedResults).map((entry) => (
          <div
            key={entry.user.id}
            className="mb-7 border p-3 rounded border-white w-1/2 flex flex-col justify-center items-center p-5"
          >
            <p className="font-bold text-[25px] my-5">
              {entry.user.name} {entry.user.surname}
            </p>
            <ul className="ml-4 list-disc">
              {entry.scores.map((score) => (
                <li key={score.id} className="text-[20px] my-2">
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
    </section>
  );
};
