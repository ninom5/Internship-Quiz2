import { useCreateCategory } from "@hooks/useCreateCategory";
import { useFetchAllCategories } from "@hooks/useFetchAllCategories";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateCategoryForm = () => {
  const { createCategory, createError } = useCreateCategory();
  const { data, refetch } = useFetchAllCategories();

  const [category, setCategory] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (category.trim() === "") {
      toast.error("category name can't be empty");
      return;
    }

    if (
      data.find(
        (item) =>
          item.title.toLowerCase()?.trim() === category.toLowerCase()?.trim()
      )
    ) {
      toast.error("Category with provided name already exist");
      return;
    }
    await createCategory(category);
    if (createError) {
      toast.error(`Error creating new category`);
      console.error(`Error creating new category: ${createError}`);

      return;
    }

    toast.success("Category successfully created");
    setCategory("");
    await refetch();
  };

  return (
    <section className="flex flex-col p-4 items-center justify-center bg-lightgray">
      <h1 className="my-7 text-4xl">Admin Page</h1>
      <div className="flex flex-col items-center justify-center w-2/3 h-auto p-6 border-1 rounded-lg">
        <h3 className="italic text-xl mb-5">Create category</h3>
        <form>
          <input
            type="text"
            placeholder="Enter name of category"
            onChange={handleChange}
            value={category}
            required
            className="bg-white text-black p-2 m-4 border-none rounded-lg"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-white text-black border-none rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-400"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
