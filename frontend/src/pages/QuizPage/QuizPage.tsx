import { useParams } from "react-router-dom";
import { useFetchQuizById, useFetchAllQuestions } from "@hooks/index";
import { routes } from "@routes/routes";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { QuizQuestionForm } from "@components/QuizQuestionForm/QuizQuestionForm";

export const QuizPage = () => {
  const { quizId } = useParams();
  const { data, error, isLoading } = useFetchQuizById(quizId as string);
  const {
    data: questionData,
    error: questionError,
    isLoading: questionLoading,
  } = useFetchAllQuestions();

  const quizQuestions = useMemo(() => {
    return questionData?.filter((question) => question.quizId === quizId) || [];
  }, [quizId ?? "", questionData]);

  const token = sessionStorage.getItem("jwt");
  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>Please login to access this page.</p>
        <Link to={routes.LOGIN}>Login</Link>
      </div>
    );
  }

  if (isLoading || questionLoading) return <div>Loading...</div>;

  if (error || questionError) return <div>Error fetching quiz by id</div>;

  if (!data) return <div>Quiz data is empty</div>;

  if (quizQuestions.length === 0)
    return <div>There are no questions for this quiz</div>;

  return (
    <section className="flex flex-col w-full h-auto items-center justify-center gap-[50px]">
      <h1>Quiz: {data.title}</h1>
      <img src={data?.imageUrl} alt={data.title} />
      <h2 className="text-4xl">About quiz: {data.description}</h2>

      <QuizQuestionForm quizQuestions={quizQuestions} quizId={data.id} />
    </section>
  );
};
