import { useFetchAllCategories } from "@hooks/useFetchAllCategories";
import { useNavigate } from "react-router-dom";

export const PopularCategories = () => {
  const navigate = useNavigate();
  const handleClick = (category: string) => {
    navigate(`/quizzes?category=${category}`);
  };
  const { data: categories } = useFetchAllCategories();

  return (
    <section className="flex flex-col items-center gap-5 w-full mb-[30px]">
      <h2 className="text-[2rem] text-[#333] mb-5">Popular Categories</h2>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6 w-full max-w-[1200px] mx-auto p-10 bg-white rounded-lg shadow-md text-center">
        {categories &&
          categories.map((category) => (
            <li
              key={category.id}
              className="bg-[rgba(211,211,211,0.409)] p-4 rounded-lg shadow cursor-pointer transition-colors duration-300 ease-in-out text-black hover:bg-lightblue"
              onClick={() => handleClick(category.title)}
            >
              {category.title}
            </li>
          ))}
      </ul>
    </section>
  );
};
