import { QuestionTypes } from "@constants/questionTypes";
import { useState } from "react";

export const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    questionType: "",
    answer: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  return (
    <section className="flex flex-col p-4 items-center justify-center bg-lightgray">
      <div className="flex flex-col items-center justify-center w-2/3 h-auto p-6 border-1 rounded-lg">
        <h3 className="italic text-xl mb-5">Create question</h3>
        <form>
          <input
            type="text"
            placeholder="Enter your question"
            name="questionText"
            required
            onChange={handleChange}
          />

          <select
            name="questionType"
            id="question-type"
            defaultValue=""
            onChange={handleChange}
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
        </form>
      </div>
    </section>
  );
};
