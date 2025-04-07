import { QuestionCreateDto } from "types/questionCreateDto";

export const questionDataValidation = (formData: QuestionCreateDto) => {
  const { text, type, answer, options, minValue, maxValue } = formData;
  const multipleTypeQuestions = ["select", "checkbox", "radio"];

  if (!text || text.trim() === "") return "Question field can't be empty";
  if (!type) return "Please pick question type";
  if (!answer || answer.trim()) return "Answer field can't be empty";

  if (multipleTypeQuestions.includes(type)) {
    if (!options || options.length === 0)
      return "You must provide options when question type is multiple choice";

    const invalidOptions = options.filter((opt) => opt.trim() === "");
    if (invalidOptions.length > 0) return "Option field can't be empty";
  }

  if (type === "slider") {
    if (
      minValue === null ||
      minValue === undefined ||
      maxValue === null ||
      maxValue === undefined
    )
      return "Min and max value must be provided";

    if (minValue > maxValue) return "Min value can't be greater than max value";
  }

  return "Data is valid";
};
