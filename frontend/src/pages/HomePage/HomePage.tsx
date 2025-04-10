import { HomePageDescriptions, PopularCategories } from "@components/index";
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center py-12.5 px-5 h-full bg-[#f0f0f0] gap-[30px]">
      <h1 className="text-[3rem] text-blue-700 mb-6">Welcome to QuizMaster!</h1>
      <p className="text-[1.2rem] text-center max-w-150 mb-[30px] text-black">
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
