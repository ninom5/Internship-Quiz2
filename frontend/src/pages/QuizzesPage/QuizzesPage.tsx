import { QuizGrid, Restricted } from "@components/index";
import { useToken } from "@hooks/useToken";

export const QuizzesPage = () => {
  const token = useToken();
  console.log(token);

  if (!token) return <Restricted />;

  return (
    <div className="p-15">
      <h2 className="text-2xl font-bold text-center mb-6">Quizzes</h2>
      <QuizGrid />
    </div>
  );
};
