import { useParams, Link } from "react-router-dom";
import { routes } from "@routes/routes";
import { useFetchQuizById } from "@api/index";
import { useToken } from "@hooks/index";
import { QuizQuestionForm, QuizResult } from "@components/index";

export const QuizPage = () => {
  const { quizId } = useParams();
  const { data, error, isLoading } = useFetchQuizById(quizId as string);
  const {
    data: { role },
    token,
    isExpired,
  } = useToken();

  if (!token || isExpired) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>Please login to access this page.</p>
        <Link to={routes.LOGIN}>Login</Link>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching quiz by id</div>;

  if (!data || data.questions.length === 0)
    return (
      <div>Quiz data is empty and there are no questions for this quiz</div>
    );

  const quizQuestions = data.questions.map((q) => q.questions);

  return (
    <section className="flex flex-col w-full h-auto items-center justify-center mb-10 gap-[50px]">
      <h1>Quiz: {data.title}</h1>
      <img src={data.category.imgUrl} alt={data.title} />
      <h2 className="text-4xl">About quiz: {data.description}</h2>

      {role === "admin" ? (
        <QuizResult />
      ) : (
        <QuizQuestionForm quizQuestions={quizQuestions} quizId={data.id} />
      )}
    </section>
  );
};
