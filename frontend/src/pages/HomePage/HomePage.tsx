import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <h1>Welcome to QuizMaster!</h1>
      <p className="home-page-description">
        Test your knowledge with our fun and challenging quizzes on various
        topics!
      </p>

      <section className="popular-categories">
        <h2>Popular Categories</h2>
        <ul className="popular-categories-list">
          <li>General Knowledge</li>
          <li>Science & Technology</li>
          <li>History</li>
          <li>Sports</li>
          <li>Movies & TV</li>
          <li>Music</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-700 text-center">
          Pick a category, start a quiz, and answer questions to see how much
          you know! Track your progress, and challenge your friends to beat your
          score.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Get Started
        </h2>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/quizzes")}
        >
          Start Quiz
        </button>

        <p className="mt-4 text-gray-600">
          Or explore other quizzes by selecting your favorite category above!
        </p>
      </section>

      <footer className="text-center mt-12 text-gray-500">
        <p>&copy; 2025 QuizMaster. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
