import { useNavigate } from "react-router-dom";

export const HomePageDescriptions = () => {
  const navigate = useNavigate();

  return (
    <>
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
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-[300ms]"
          onClick={() => navigate("/quizzes")}
        >
          Start Quiz
        </button>

        <p className="mt-4 text-gray-600">
          Or explore other quizzes by selecting your favorite category above!
        </p>
      </section>
    </>
  );
};
