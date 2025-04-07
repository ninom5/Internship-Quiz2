import {
  CreateCategoryForm,
  CreateQuestionForm,
  CreateQuizForm,
} from "@components/index";

export const AdminPage = () => {
  return (
    <>
      <CreateCategoryForm />
      <CreateQuestionForm />
      <CreateQuizForm />
    </>
  );
};
