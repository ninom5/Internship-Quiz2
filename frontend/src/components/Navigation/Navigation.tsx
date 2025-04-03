import { useFetchAllCategories } from "@hooks/useFetchAllCategories";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  };

  const { data, error, isLoading } = useFetchAllCategories();

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!data) return <div className="text-center">No categories available.</div>;

  return (
    <nav className="search-navigation">
      <input
        type="text"
        placeholder="Quiz title"
        value={title}
        onChange={handleChange}
        required
      />
      <select
        name="categorySelect"
        id="category-select"
        onChange={handleCategoryChange}
      >
        {data.map((category) => (
          <option key={category.id}>{category.title}</option>
        ))}
      </select>
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </nav>
  );
};
