import { useParams } from "react-router-dom";
import { useFetchQuizById, useFetchAllQuestions } from "@hooks/index";
import { routes } from "@routes/routes";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  CheckboxTypeComponent,
  RadioTypeComponent,
  SelectTypeComponent,
  SliderTypeComponent,
  TextTypeComponent,
} from "@components/QuestionComponents/QuestionComponents";

export const QuizPage = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
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

  const handleConfirm = () => {
    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("Quiz completed!");
    }
  };

  const currentQuestion = quizQuestions[questionIndex];
  const QuestionComponent =
    QuestionComponents[
      currentQuestion.type.toLowerCase() as keyof typeof QuestionComponents
    ] || (() => <p>Unknown question type</p>);

  return (
    <div>
      <h1>Quiz Page</h1>
      <h3>{data.title}</h3>
      <img src={data?.imageUrl} alt={data.title} />
      <h5>{data.description}</h5>
      <div>
        <div key={currentQuestion.id}>
          <h3>{currentQuestion.text}</h3>
          <QuestionComponent question={currentQuestion} />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};
