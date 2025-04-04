import { useParams } from "react-router-dom";
import { useFetchQuizById, useFetchAllQuestions } from "@hooks/index";
import { useMemo } from "react";
import { QuizQuestionForm } from "@components/QuizQuestionForm/QuizQuestionForm";
import { useToken } from "@hooks/useToken";
import { Restricted } from "@components/Restricted";

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

  const token = useToken().token;
  if (!token) return <Restricted />;

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
