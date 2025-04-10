import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  CheckboxTypeComponent,
  RadioTypeComponent,
  SelectTypeComponent,
  SliderTypeComponent,
  TextTypeComponent,
} from "@components/QuestionComponents/QuestionComponents";
import { QuestionType } from "types/index";
import {
  useFetchResultsByQuiz,
  useCreateQuizResult,
  useToken,
} from "@hooks/index";
import { QuizResultCreateDto } from "types/quizResultCreateDto";
import { isCorrectAnswer } from "@utils/isCorrectAnswer";

export const QuizQuestionForm = ({
  quizQuestions,
  quizId,
}: {
  quizQuestions: QuestionType[];
  quizId: string;
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [placement, setPlacement] = useState(0);

  const { data, error, isLoading } = useFetchResultsByQuiz(quizId);
  const { submitResult, isSubmitting, submitError } = useCreateQuizResult();

  const QuestionComponents = {
    input: TextTypeComponent,
    checkbox: CheckboxTypeComponent,
    radio: RadioTypeComponent,
    slider: SliderTypeComponent,
    select: SelectTypeComponent,
  };

  const handleConfirm = () => {
    if (!confirm("Do you really want to lock in your answer?")) return;

    const question = quizQuestions[questionIndex];

    if (isCorrectAnswer(question.type, question, userAnswer))
      setCorrectAnswerCount((prev) => prev + 1);

    if (questionIndex < quizQuestions.length - 1)
      setQuestionIndex((prevIndex) => prevIndex + 1);
    else setQuizFinished(true);
  };

  const userId = useToken()?.data?.id;
  if (!userId) {
    toast.error("Can not get user id to store quiz result");
    return;
  }

  useEffect(() => {
    if (quizFinished && data && !isLoading && !error) {
      const scores = data.map((result) => result.score);
      const sortedScores = [...scores, correctAnswerCount].sort(
        (a, b) => b - a
      );

      const userPlacement = sortedScores.indexOf(correctAnswerCount);
      setPlacement(userPlacement + 1);

      const userResult: QuizResultCreateDto = {
        userId,
        score: correctAnswerCount,
        quizId,
      };

      submitResult(userResult);
      if (submitError) {
        toast.error(`Error submitting quiz result`);
        console.error(`Error: ${submitError}`);
        return;
      }
    }
  }, [quizFinished, data, correctAnswerCount, isLoading, error]);

  const currentQuestion = quizQuestions[questionIndex];
  const QuestionComponent =
    QuestionComponents[
      currentQuestion.type.toLowerCase() as keyof typeof QuestionComponents
    ] || (() => <p>Unknown question type</p>);

  return (
    <div className="w-full flex items-center justify-center">
      {!quizFinished ? (
        <div
          key={currentQuestion.id}
          className="w-1/3 h-auto flex flex-col items-center justify-center gap-[50px] border-2 rounded-lg p-5"
        >
          <h3 className="text-3xl italic">{currentQuestion.text}</h3>
          <QuestionComponent
            question={currentQuestion}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
          />

          <button
            onClick={handleConfirm}
            className="bg-white text-black text-[20px] rounded-lg py-2 px-5 m-3 cursor-pointer transition duration-[700ms] hover:bg-sky-400 hover:text-white"
          >
            Confirm
          </button>
        </div>
      ) : (
        <div>
          <h2>
            Quiz finished. Your score: {correctAnswerCount}/
            {quizQuestions.length}
          </h2>
          <p>Your placement: {placement}</p>
        </div>
      )}
    </div>
  );
};
