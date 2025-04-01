import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    navigate(`/quizzes?title=${title}`);
  };

  return (
    <nav className="search-navigation">
      <input
        type="text"
        placeholder="Quiz title"
        value={title}
        onChange={handleChange}
        required
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </nav>
  );
};
