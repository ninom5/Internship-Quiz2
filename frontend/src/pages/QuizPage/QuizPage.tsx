import { useParams } from "react-router-dom";
import { useFetchQuizById } from "../../hooks/useFetchQuizById";
import { useFetchAllQuestions } from "../../hooks/useFetchAllQuestions";

export const QuizPage = () => {
  const { quizId } = useParams();
  const { data, error, isLoading } = useFetchQuizById(quizId as string);
  const {
    data: questionData,
    error: questionError,
    isLoading: questionLoading,
  } = useFetchAllQuestions();
  if (isLoading || questionLoading) return <div>Loading...</div>;

  if (error || questionError) return <div>Error fetching quiz by id</div>;

  if (!data) return <div>Quiz data is empty</div>;

  const quizQuestions = questionData?.filter(
    (question) => question.quizId === quizId
  );
  if (!quizQuestions) return <div>There is no questions for this quiz</div>;

  return (
    <div>
      <h1>Quiz Page</h1>
      <h3>{data.title}</h3>
      <img src={data?.imageUrl} alt={data.title} />
      <h5>{data.description}</h5>
      <div>
        {quizQuestions.map((q) => (
          <>
            <div key={q.quizId}>
              <p>{q.text}</p>
              <h4>{q.answer}</h4>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
