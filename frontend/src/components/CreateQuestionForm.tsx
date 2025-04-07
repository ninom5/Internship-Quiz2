import { QuestionTypes } from "@constants/questionTypes";
import { useCreateQuestion } from "@hooks/useCreateQuestion";
import { QuestionCreateDto } from "types/questionCreateDto";
import { questionDataValidation } from "@utils/questionDataValidation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const CreateQuestionForm = () => {
  const [formData, setFormData] = useState<QuestionCreateDto>({
    text: "",
    type: "",
    answer: "",
  });
  const [optionInput, setOptionInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const { createQuestion } = useCreateQuestion(formData);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddOption = () => {
    setOptions([...options, optionInput]);
    setOptionInput("");
  };
  const handleRemoveOption = (optionToRemove: string) => {
    setOptions(options.filter((opt) => opt !== optionToRemove));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!questionDataValidation(formData)) {
      toast.error("Invalid provided data");
      return;
    }

    createQuestion();
  };

  return (
    <section className="flex flex-col p-4 items-center justify-center bg-lightgray">
      <div className="flex flex-col items-center justify-center w-2/3 h-auto p-6 border-1 rounded-lg">
        <h3 className="italic text-xl mb-5">Create question</h3>
        <form className="justify-center items-center">
          <input
            type="text"
            placeholder="Enter your question"
            name="text"
            required
            onChange={handleChange}
            className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
          />

          <select
            name="type"
            id="question-type"
            defaultValue=""
            onChange={handleChange}
            className="bg-white text-black border-none rounded-lg py-2 px-4 mr-4"
          >
            <option value="" disabled>
              Select question type
            </option>
            {Object.entries(QuestionTypes).map(([key, value]) => (
              <option key={key} value={value}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
            onChange={handleChange}
            name="answer"
            placeholder="Enter answer"
            required
          />

          <button
            onClick={handleSubmit}
            className="bg-sky-400 border-none rounded-lg py-2 px-4 cursor-pointer ml-4"
          >
            Submit
          </button>

          {["select", "checkbox", "radio"].includes(formData.type) && (
            <div className="flex flex-col">
              <div className="flex py-5">
                <input
                  type="text"
                  name="optionInput"
                  onChange={(e) => setOptionInput(e.target.value)}
                  value={optionInput}
                  required
                  className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
                />
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="bg-white text-black italic w-auto border-none rounded-lg py-2 px-5 cursor-pointer hover:bg-green-400 transition duration-[400ms]"
                >
                  Add option
                </button>
              </div>

              <p>Options: </p>
              {options.map((opt, index) => (
                <div key={opt + index} className="flex py-3 gap-4 items-center">
                  <p>{opt}</p>
                  <button
                    className="bg-red-500 border-none rounded-lg py-2 px-4 cursor-pointer"
                    onClick={() => handleRemoveOption(opt)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {formData.type === "slider" && (
            <div className="flex justify-start items-center p-2 mt-5">
              <input
                type="number"
                placeholder="minimum slider value"
                name="minValue"
                className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
                onChange={(e) => setMinValue(e.target.value)}
                value={minValue}
                required
              />
              <input
                type="number"
                placeholder="maximum slider value"
                name="maxValue"
                className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
                onChange={(e) => setMaxValue(e.target.value)}
                value={maxValue}
                required
              />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
