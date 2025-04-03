import { HomePageDescriptions } from "@components/index";
import { PopularCategories } from "@components/index";
export const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to QuizMaster!</h1>
      <p className="home-page-description">
        Test your knowledge with our fun and challenging quizzes on various
        topics!
      </p>

      <PopularCategories />

      <HomePageDescriptions />

      <footer className="text-center mt-12 text-gray-500">
        <p>&copy; 2025 QuizMaster. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
