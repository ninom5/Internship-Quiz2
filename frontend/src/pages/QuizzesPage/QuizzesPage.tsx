import { QuizGrid, Restricted } from "@components/index";

export const QuizzesPage = () => {
  const token = sessionStorage.getItem("jwt");

  if (!token) return <Restricted />;

  return (
    <div className="p-15">
      <h2 className="text-2xl font-bold text-center mb-6">Quizzes</h2>
      <QuizGrid />
    </div>
  );
};
