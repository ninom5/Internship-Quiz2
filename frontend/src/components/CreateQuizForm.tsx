import { useFetchAllQuestions } from "@hooks/useFetchAllQuestions";
import { Box, Checkbox } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export const CreateQuizForm = () => {
  const { data, error, isLoading } = useFetchAllQuestions();
  const [pickedQuestions, setPickedQuestions] = useState(null);

  const handlePickQuestion = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    console.log(id);
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
      flex: 1,
    },
    {
      field: "answer",
      headerName: "Correct answer",
      flex: 1,
    },
    {
      field: "choose",
      headerName: "Choose question",
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          onChange={(event) => handlePickQuestion(event, params.row.id)}
        />
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No questions</div>;

  return (
    <Box sx={{ height: "100%", width: "100%", padding: "50px" }}>
      <DataGrid
        columns={columns}
        rows={data}
        sx={{ backgroundColor: "lightgray" }}
      />
    </Box>
  );
};
