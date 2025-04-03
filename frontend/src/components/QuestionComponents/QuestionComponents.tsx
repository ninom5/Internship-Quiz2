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
  const handleChange = (option: string, checked: boolean) => {
    // setUserAnswer((prev: string[] = []) =>
    //   checked ? [...prev, option] : prev.filter((p) => p !== option)
    // );
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
  setUserAnswer,
}: {
  question: QuestionType;
  setUserAnswer: (value: string) => void;
}) => {
  return (
    <div>
      {question.minValue && question.maxValue && (
        <input
          type="range"
          min={question.minValue}
          max={question.maxValue}
          defaultValue={(question.maxValue + question.minValue) / 2}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
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
