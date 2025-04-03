import { QuestionType } from "types/questionType";

export const TextTypeComponent = ({ question }: { question: QuestionType }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      <input
        type="text"
        name="userAnswer"
        id="user-answer"
        placeholder="Your answer..."
      />
    </div>
  );
};

export const CheckboxTypeComponent = ({
  question,
}: {
  question: QuestionType;
}) => {
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
            />
            <label htmlFor={`q-${question.id}-${index}`}>{option}</label>
          </div>
        ))}
    </div>
  );
};

export const RadioTypeComponent = ({
  question,
}: {
  question: QuestionType;
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
            />
            <label htmlFor={`q-${question.id}-${index}`}> {option} </label>
          </div>
        ))}
    </div>
  );
};

export const SliderTypeComponent = ({
  question,
}: {
  question: QuestionType;
}) => {
  return (
    <div>
      {question.minValue && question.maxValue && (
        <input
          type="range"
          min={question.minValue}
          max={question.maxValue}
          defaultValue={(question.maxValue + question.minValue) / 2}
        />
      )}
    </div>
  );
};

export const SelectTypeComponent = ({
  question,
}: {
  question: QuestionType;
}) => {
  return (
    <div>
      <select name={question.id}>
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
