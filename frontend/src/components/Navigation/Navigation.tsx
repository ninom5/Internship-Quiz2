import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchAllCategories } from "@api/index";

export const Navigation = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleSubmit = () => {
    navigate(`/quizzes?title=${title}&category=${category}`);
  };
  const handleReset = () => {
    navigate(window.location.pathname, { replace: true });
    setTitle("");
  };

  const { data, error, isLoading } = useFetchAllCategories();

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!data) return <div className="text-center">No categories available.</div>;

  return (
    <nav className="flex w-full justify-center items-center py-5 my-[30px] gap-[30px]">
      <input
        type="text"
        className="bg-white rounded-lg py-2.5 px-5 text-black"
        placeholder="Quiz title"
        value={title}
        onChange={handleChange}
        required
      />
      <select
        name="categorySelect"
        id="category-select"
        onChange={handleCategoryChange}
        defaultValue=""
        className="bg-white text-black w-auto px-2 py-3 rounded-lg"
      >
        <option value="">All categories</option>
        {data.map((category) => (
          <option key={category.id}>{category.title}</option>
        ))}
      </select>
      <button
        type="submit"
        onClick={handleSubmit}
        className="cursor-pointer border border-white rounded-lg p-2.5 transition duration-700 hover:bg-sky-400"
      >
        Search
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="cursor-pointer border border-white rounded-lg p-2.5 transition duration-700 hover:bg-sky-400"
      >
        Reset
      </button>
    </nav>
  );
};
