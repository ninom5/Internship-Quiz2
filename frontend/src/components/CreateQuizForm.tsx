import { useFetchAllQuestions } from "@hooks/useFetchAllQuestions";
import { Box, Button, Checkbox } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CreateQuizDto } from "types/index";
import { useState } from "react";
import { useFetchAllCategories } from "@hooks/useFetchAllCategories";
import { useCreateQuiz } from "@hooks/useCreateQuiz";

export const CreateQuizForm = () => {
  const { data, error, isLoading } = useFetchAllQuestions();
  const {
    data: categories,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useFetchAllCategories();
  const { createQuiz } = useCreateQuiz();

  const [pickedQuestions, setPickedQuestions] = useState<string[]>([]);
  const [quizData, setQuizData] = useState<CreateQuizDto>({
    title: "",
    description: "",
    categoryId: "",
    questions: [],
  });

  const handleChange = (e: any) => {
    setQuizData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mergedData = { ...quizData, questions: pickedQuestions };
    createQuiz(mergedData);

    setQuizData({
      title: "",
      description: "",
      categoryId: "",
      questions: [],
    });
    setPickedQuestions([]);
  };

  const columns: GridColDef[] = [
    {
      field: "text",
      headerName: "Question",
      flex: 3,
    },
    {
      field: "type",
      headerName: "Question Type",
      flex: 1.5,
    },
    {
      field: "answer",
      headerName: "Correct answer",
      flex: 2,
    },
    {
      field: "choose",
      headerName: "Choose question",
      flex: 1.2,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <Checkbox
          checked={pickedQuestions.includes(params.row.id)}
          onChange={(event) => {
            const isChecked = event.target.checked;
            const id = params.row.id;

            setPickedQuestions((prev) =>
              isChecked ? [...prev, id] : prev.filter((qId) => qId !== id)
            );
          }}
        />
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No questions</div>;

  return (
    <section className="flex flex-col p-4 items-center justify-center">
      <div className="flex flex-col items-center justify-center w-2/3 h-auto p-6 border-1 rounded-lg">
        <h3 className="italic text-xl mb-5">Create quiz</h3>
        <form onSubmit={handleSubmit} className="w-[90%]">
          <input
            type="text"
            className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
            placeholder="Quiz Title"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="bg-white text-black border-none rounded-lg py-2 px-4 mr-5"
            name="description"
            placeholder="Quiz Description"
            value={quizData.description}
            onChange={handleChange}
            required
          />
          <select
            className="bg-white text-black border-none rounded-lg py-2 px-4 mr-4"
            defaultValue=""
            onChange={handleChange}
            name="categoryId"
          >
            <option value="">Pick quiz category</option>
            {!categoryError &&
              categories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
          </select>

          <h4 className="mt-5">Pick questions to add to your quiz</h4>
          <Box sx={{ height: "100%", width: "100%", padding: "20px 0" }}>
            <DataGrid
              columns={columns}
              rows={data}
              sx={{ backgroundColor: "lightgray" }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15, 25, 50, 100]}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ marginTop: "20px", backgroundColor: "white" }}
            >
              Submit
            </Button>
          </Box>
        </form>

        <h4>Added questions</h4>
        <ul className="mt-2 text-white list-disc">
          {data
            .filter((q) => pickedQuestions.includes(q.id))
            .map((item) => (
              <li key={item.id} className="text-sm text-white mb-1">
                {item.text}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
