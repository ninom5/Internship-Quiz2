import { useFetchAllQuizzes } from "../../hooks/useFetchAllQuizzes";
import { QuizType } from "../../types/quizType";

export const QuizzesPage = () => {
  const quizzes = [
    {
      title: "Science Trivia",
      description: "Test your knowledge of science facts and discoveries!",
      image: "https://source.unsplash.com/200x200/?science",
    },
    {
      title: "History Challenge",
      description: "How well do you know world history? Find out now!",
      image: "https://source.unsplash.com/200x200/?history",
    },
    {
      title: "Math Puzzles",
      description: "Solve these tricky math puzzles and prove your skills!",
      image: "https://source.unsplash.com/200x200/?math",
    },
    {
      title: "Geography Quiz",
      description: "Can you name these countries and landmarks?",
      image: "https://source.unsplash.com/200x200/?geography",
    },
  ];

  const { data, error, isLoading } = useFetchAllQuizzes();

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!data) return <div className="text-center">No quizzes available.</div>;

  return (
    <div className="p-15">
      <h2 className="text-2xl font-bold text-center mb-6">Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((quiz: QuizType, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
          >
            <img
              src={quiz.imageUrl}
              alt={quiz.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <p className="text-sm text-gray-600">{quiz.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
