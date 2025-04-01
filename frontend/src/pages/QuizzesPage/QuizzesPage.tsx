import { useParams } from "react-router-dom";
import { QuizGrid } from "@components/index";
import { useFetchAllQuizzes, useFetchQuizzesByTitle } from "@hooks/index";
import { routes } from "@routes/routes";
import { Link } from "react-router-dom";

export const QuizzesPage = () => {
  const token = sessionStorage.getItem("jwt");
  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>Please login to access this page.</p>
        <Link to={routes.LOGIN} className="underline">
          Login
        </Link>
      </div>
    );
  }
  const { title } = useParams<{ title?: string }>();

  const { data, error, isLoading } = title
    ? useFetchQuizzesByTitle(title)
    : useFetchAllQuizzes();

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
