import { QuizGrid, Restricted } from "@components/index";
// import { useFetchAllQuizzes, useFetchQuizzesByTitle } from "@hooks/index";
// import { QuizType } from "types/quizType";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

export const QuizzesPage = () => {
  const token = sessionStorage.getItem("jwt");

  if (!token) return <Restricted />;

  // if (isLoading) return <div className="text-center">Loading...</div>;

  // if (error)
  //   return <div className="text-center text-red-500">Error: {error}</div>;

  // if (!data) return <div className="text-center">No quizzes available.</div>;

  return (
    <div className="p-15">
      <h2 className="text-2xl font-bold text-center mb-6">Quizzes</h2>
      <QuizGrid />
    </div>
  );
};
