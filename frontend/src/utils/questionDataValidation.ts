import { QuestionCreateDto } from "types/index";

export const questionDataValidation = (formData: QuestionCreateDto) => {
  const { text, type, answer, options, minValue, maxValue } = formData;
  const multipleTypeQuestions = ["SELECT", "CHECKBOX", "RADIO"];

  if (!text || text.trim() === "") return "Question field can't be empty";
  if (!type) return "Please pick question type";
  if (!answer || answer.trim() === "") return "Answer field can't be empty";

  if (multipleTypeQuestions.includes(type)) {
    if (!options || options.length === 0)
      return "You must provide options when question type is multiple choice";

    const invalidOptions = options.filter((opt) => opt.trim() === "");
    if (invalidOptions.length > 0) return "Option field can't be empty";

    if (!options.includes(answer))
      return "You must provide option with with correct answer";
  }

  if (type === "SLIDER") {
    if (
      minValue === null ||
      minValue === undefined ||
      maxValue === null ||
      maxValue === undefined
    )
      return "Min and max value must be provided";

    if (isNaN(minValue) || isNaN(maxValue) || isNaN(Number(answer)))
      return "Min, max values and answer must be numbers for question type slider";

    if (minValue > maxValue) return "Min value can't be greater than max value";

    if (Number(answer) < minValue || Number(answer) > maxValue)
      return "Answer must be in given range";
  }

  return "Data is valid";
};
