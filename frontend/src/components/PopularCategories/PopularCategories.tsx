import { useFetchAllCategories } from "@hooks/useFetchAllCategories";

export const PopularCategories = () => {
  const { data: categories } = useFetchAllCategories();

  return (
    <section className="popular-categories">
      <h2>Popular Categories</h2>
      <ul className="popular-categories-list">
        {categories &&
          categories.map((category) => (
            <li key={category.id}>{category.title}</li>
          ))}
      </ul>
    </section>
  );
};
