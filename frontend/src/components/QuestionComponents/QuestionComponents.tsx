import { useEffect, useState } from "react";
import { QuestionType } from "types/questionType";

export const TextTypeComponent = ({
  question,
  setUserAnswer,
}: {
  question: QuestionType;
  setUserAnswer: (value: string) => void;
}) => {
  return (
    <div>
      <h3>{question.text}</h3>
      <input
        type="text"
        name="userAnswer"
        id="user-answer"
        placeholder="Your answer..."
        onChange={(e) => setUserAnswer(e.target.value)}
      />
    </div>
  );
};

export const CheckboxTypeComponent = ({
  question,
  setUserAnswer,
}: {
  question: QuestionType;
  setUserAnswer: (value: string[]) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (option: string, checked: boolean) => {
    let updatedOptions = checked
      ? [...selectedOptions, option]
      : selectedOptions?.filter((opt) => opt !== option);
    setSelectedOptions(updatedOptions);
    setUserAnswer(updatedOptions);
  };

  return (
    <div>
      {question.options &&
        question.options.map((option, index) => (
          <div key={question.id + index}>
            <input
              type="checkbox"
              name={question.id}
              id={`q-${question.id}-${index}`}
              value={option}
              onChange={(e) => handleChange(option, e.target.checked)}
            />
            <label htmlFor={`q-${question.id}-${index}`}>{option}</label>
          </div>
        ))}
    </div>
  );
};

export const RadioTypeComponent = ({
  question,
  setUserAnswer,
}: {
  question: QuestionType;
  setUserAnswer: (value: string) => void;
}) => {
  return (
    <div>
      {question.options &&
        question.options.map((option, index) => (
          <div key={option + index}>
            <input
              type="radio"
              id={`q-${question.id}-${index}`}
              value={option}
              name={question.id}
              onChange={() => setUserAnswer(option)}
            />
            <label htmlFor={`q-${question.id}-${index}`}> {option} </label>
          </div>
        ))}
    </div>
  );
};

export const SliderTypeComponent = ({
  question,
  userAnswer,
  setUserAnswer,
}: {
  question: QuestionType;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
}) => {
  const defaultValue =
    question.minValue && question.maxValue
      ? ((question.minValue + question.maxValue) / 2).toString()
      : "0";

  useEffect(() => {
    setUserAnswer(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      {question.minValue && question.maxValue && (
        <>
          <input
            type="range"
            min={question.minValue}
            max={question.maxValue}
            step={question.stepValue}
            defaultValue={(question.maxValue + question.minValue) / 2}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <span>{userAnswer}</span>
        </>
      )}
    </div>
  );
};

export const SelectTypeComponent = ({
  question,
  setUserAnswer,
}: {
  question: QuestionType;
  setUserAnswer: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col mt-6 mb-6 w-auto">
      <select
        name={question.id}
        className="bg-white rounded-lg p-3 text-black"
        onChange={(e) => setUserAnswer(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Select answer
        </option>
        {question.options &&
          question.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};
