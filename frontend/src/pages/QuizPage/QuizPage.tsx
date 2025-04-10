import { useParams, Link } from "react-router-dom";
import { routes } from "@routes/routes";
import { useFetchQuizById } from "@hooks/index";
import { QuizQuestionForm } from "@components/index";

export const QuizPage = () => {
  const { quizId } = useParams();
  const { data, error, isLoading } = useFetchQuizById(quizId as string);

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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching quiz by id</div>;

  if (!data) return <div>Quiz data is empty</div>;

  if (data.questions.length === 0)
    return <div>There are no questions for this quiz</div>;

  const quizQuestions = data.questions.map((q) => q.questions);

  return (
    <section className="flex flex-col w-full h-auto items-center justify-center gap-[50px]">
      <h1>Quiz: {data.title}</h1>
      <img src={data.category.imgUrl} alt={data.title} />
      <h2 className="text-4xl">About quiz: {data.description}</h2>

      <QuizQuestionForm quizQuestions={quizQuestions} quizId={data.id} />
    </section>
  );
};
