import {
  CheckboxTypeComponent,
  RadioTypeComponent,
  SelectTypeComponent,
  SliderTypeComponent,
  TextTypeComponent,
} from "@components/QuestionComponents/QuestionComponents";
import { QuestionType } from "types/questionType";
import { useState } from "react";
import { toast } from "react-toastify";

export const QuizQuestionForm = ({
  quizQuestions,
}: {
  quizQuestions: QuestionType[];
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const QuestionComponents = {
    input: TextTypeComponent,
    checkbox: CheckboxTypeComponent,
    radio: RadioTypeComponent,
    slider: SliderTypeComponent,
    select: SelectTypeComponent,
  };

  const handleConfirm = () => {
    if (!confirm("Do you really want to lock in your answer?")) return;

    if (
      userAnswer?.trim()?.toLowerCase() ===
      quizQuestions[questionIndex].answer.toLowerCase()
    ) {
      setCorrectAnswerCount((prev) => prev + 1);
      toast.success("Correct!");
    }

    if (questionIndex < quizQuestions.length - 1)
      setQuestionIndex((prevIndex) => prevIndex + 1);
    else setQuizFinished(true);
  };

  const currentQuestion = quizQuestions[questionIndex];
  const QuestionComponent =
    QuestionComponents[
      currentQuestion.type.toLowerCase() as keyof typeof QuestionComponents
    ] || (() => <p>Unknown question type</p>);
  console.log(currentQuestion.type);

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
        </div>
      )}
    </div>
  );
};
