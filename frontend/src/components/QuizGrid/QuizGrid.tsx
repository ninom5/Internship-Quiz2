import { QuizType } from "types/quizType";
import { useNavigate } from "react-router-dom";

export const QuizGrid = ({ data }: { data: QuizType[] }) => {
  const navigate = useNavigate();

  const handleQuizClick = (id: string) => {
    navigate(`/quiz/${id}`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 quiz-grid">
      {data.map((quiz: QuizType) => (
        <div
          key={quiz.id}
          className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition quiz-grid__card"
          onClick={() => handleQuizClick(quiz.id)}
        >
          <img
            src={quiz.imageUrl}
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
