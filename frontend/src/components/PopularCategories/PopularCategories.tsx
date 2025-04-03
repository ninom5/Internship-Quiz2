import { useFetchAllCategories } from "@hooks/useFetchAllCategories";
import { useNavigate } from "react-router-dom";

export const PopularCategories = () => {
  const navigate = useNavigate();
  const handleClick = (category: string) => {
    navigate(`/quizzes?category=${category}`);
  };
  const { data: categories } = useFetchAllCategories();

  return (
    <section className="popular-categories">
      <h2>Popular Categories</h2>
      <ul className="popular-categories-list">
        {categories &&
          categories.map((category) => (
            <li key={category.id} onClick={() => handleClick(category.title)}>
              {category.title}
            </li>
          ))}
      </ul>
    </section>
  );
};
