import { CreateCategoryForm } from "@components/CreateCategoryForm";
import { CreateQuestion } from "@components/CreateQuestion";

export const AdminPage = () => {
  return (
    <>
      <CreateCategoryForm />
      <CreateQuestion />
    </>
  );
};
