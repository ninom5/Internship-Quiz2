import { useFetchAllResults } from "@api/index";
import { useEffect, useState } from "react";
import { QuizResultType } from "types/index";
import { groupByUser } from "@utils/groupByUser";
import { QuizResultGrid } from "@components/index";

export const UserScoresPage = () => {
  const [groupedResults, setGroupedResults] = useState<
    Record<
      string,
      { user: QuizResultType["user"]; scores: QuizResultType[]; total: number }
    >
  >({});

  const { data: allResults, error: allResultsError } = useFetchAllResults();

  useEffect(() => {
    if (allResults) setGroupedResults(groupByUser(allResults));
  }, [allResults]);

  if (allResultsError) return <div>Error fetching all results</div>;

  return (
    <section className="flex flex-col justify-center items-center p-7 w-full">
      <h1 className="text-[40px]">Results by users</h1>

      {false ? (
        <div>Loading data...</div>
      ) : (
        <QuizResultGrid groupedResults={groupedResults} />
      )}
    </section>
  );
};
