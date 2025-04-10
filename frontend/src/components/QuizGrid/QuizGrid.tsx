import { QuizType } from "types/quizType";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useFetchQuizzesByTitle } from "@hooks/index";

export const QuizGrid = () => {
  const navigate = useNavigate();

  const handleQuizClick = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const titleParam = queryParams.get("title") || "";
  const categoryParam = queryParams.get("category") || "";

  const { data, error, isLoading } = useFetchQuizzesByTitle(
    titleParam as string,
    categoryParam as string
  );

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!data) return <div className="text-center">No quizzes available.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-[30px]">
      {data.map((quiz: QuizType) => (
        <div
          key={quiz.id}
          className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition text-center cursor-pointer"
          onClick={() => handleQuizClick(quiz.id)}
        >
          <img
            src={quiz.category?.imgUrl}
            alt={quiz.title}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg text-black font-semibold">{quiz.title}</h3>
          <p className="text-sm text-gray-600">{quiz.description}</p>
        </div>
      ))}
    </div>
  );
};
