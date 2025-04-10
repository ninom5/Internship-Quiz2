import { useFetchResultsByQuiz } from "@hooks/useFetchResultsByQuiz";
import { useParams } from "react-router-dom";

export const QuizResult = () => {
  const { quizId } = useParams();
  const { data, error, isLoading } = useFetchResultsByQuiz(quizId as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!data) return <div>No data</div>;

  return (
    <section>
      <h2>Quiz Results</h2>
      <ul>
        {data
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <li key={item.id}>{`${index + 1}. ${item.user?.name} ${
              item.user?.surname
            } Score: ${item.score}`}</li>
          ))}
      </ul>
    </section>
  );
};
