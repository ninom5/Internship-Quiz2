import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCategory, useFetchAllCategories } from "@hooks/index";
import { validateFields } from "@utils/validateFields";

export const CreateCategoryForm = () => {
  const { createCategory, createError } = useCreateCategory();
  const { data, refetch } = useFetchAllCategories();

  const [categoryData, setCategoryData] = useState({
    title: "",
    imgUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fieldsValidMessage = validateFields({
      "Category title": categoryData.title,
      "Image url": categoryData.imgUrl,
    });
    if (fieldsValidMessage) {
      toast.error(fieldsValidMessage);
      return;
    }

    if (
      data.find(
        (item) =>
          item.title.toLowerCase()?.trim() ===
          categoryData.title.toLowerCase()?.trim()
      )
    ) {
      toast.error("Category with provided name already exist");
      return;
    }
    await createCategory(categoryData);
    if (createError) {
      toast.error(`Error creating new category`);
      console.error(`Error creating new category: ${createError}`);

      return;
    }

    toast.success("Category successfully created");
    setCategoryData({
      title: "",
      imgUrl: "",
    });

    await refetch();
  };

  return (
    <section className="flex flex-col p-4 items-center justify-center">
      <h1 className="my-7 text-4xl">Admin Page</h1>
      <div className="flex flex-col p-4 items-center justify-center bg-lightgray w-2/3 h-auto p-6 border-1 rounded-lg">
        <h3 className="italic text-xl mb-5">Create category</h3>
        <form>
          <input
            type="text"
            placeholder="Enter name of category"
            onChange={handleChange}
            value={categoryData.title}
            name="title"
            className="bg-white text-black p-2 m-4 border-none rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Enter image url of category"
            onChange={handleChange}
            value={categoryData.imgUrl}
            name="imgUrl"
            className="bg-white text-black p-2 m-4 border-none rounded-lg"
            required
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-sky-400 text-white border-none rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-400"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
