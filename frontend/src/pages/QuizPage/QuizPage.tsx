import { useParams } from "react-router-dom";
import { useFetchQuizById, useFetchAllQuestions } from "@hooks/index";
import { routes } from "@routes/routes";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  CheckboxTypeComponent,
  RadioTypeComponent,
  SelectTypeComponent,
  SliderTypeComponent,
  TextTypeComponent,
} from "@components/QuestionComponents/QuestionComponents";
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

  const QuestionComponents = {
    text: TextTypeComponent,
    checkbox: CheckboxTypeComponent,
    radio: RadioTypeComponent,
    slider: SliderTypeComponent,
    select: SelectTypeComponent,
  };

  return (
    <div>
      <h1>Quiz Page</h1>
      <h3>{data.title}</h3>
      <img src={data?.imageUrl} alt={data.title} />
      <h5>{data.description}</h5>
      <div>
        {quizQuestions.map((q) => {
          const QuestionComponent =
            QuestionComponents[
              q.type.toLowerCase() as keyof typeof QuestionComponents
            ] || (() => <p>Unknown question type</p>);

          return (
            <div key={q.id}>
              <QuestionComponent question={q} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
