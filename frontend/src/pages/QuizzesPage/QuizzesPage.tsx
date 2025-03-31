import { QuizGrid } from "../../components/QuizGrid/QuizGrid";
import { useFetchAllQuizzes } from "../../hooks/useFetchAllQuizzes";

export const QuizzesPage = () => {
  const { data, error, isLoading } = useFetchAllQuizzes();

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!data) return <div className="text-center">No quizzes available.</div>;

  return (
    <div className="p-15">
      <h2 className="text-2xl font-bold text-center mb-6">Quizzes</h2>
      <QuizGrid data={data} />
    </div>
  );
};
