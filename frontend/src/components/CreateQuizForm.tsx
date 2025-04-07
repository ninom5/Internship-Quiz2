import { useFetchAllQuestions } from "@hooks/useFetchAllQuestions";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const CreateQuizForm = () => {
  const { data, error, isLoading } = useFetchAllQuestions();

  const columns: GridColDef[] = [
    {
      field: "text",
      headerName: "Question",
      flex: 3,
      editable: false,
    },
    {
      field: "type",
      headerName: "Question Type",
      flex: 1,
      editable: false,
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
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No questions</div>;

  return (
    <section className="flex flex-col p-4 items-center justify-center bg-lightgray mb-15">
      <div className="flex flex-col items-center justify-center w-2/3 h-auto p-6 border-1 rounded-lg">
        <h3 className="italic text-xl mb-5">Create quiz</h3>
        <Box sx={{ height: "100%", width: "100%", padding: "50px" }}>
          <DataGrid columns={columns} rows={data} />
        </Box>

        {/* <div className="flex flex-col items-center justify-center p-5 w-3/4">
          {isLoading && <div>Loading all questions...</div>}
          {error && <div>Error loading all questions</div>}
          {data && data.length > 0 ? (
            <div>
              <div className="grid grid-cols-[3fr_1fr_1fr_1fr] bg-gray-100 text-gray-800 font-semibold p-4 rounded-t-xl border-b">
                <div>Question</div>
                <div>Type</div>
                <div>Correct Answer</div>
                <div>Choose question</div>
              </div>
              {data.map((dat, index) => (
                <div
                  key={dat.id}
                  className={`grid grid-cols-[3fr_1fr_1fr_1fr] p-4 border-b ${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-500"
                  }`}
                >
                  <div>{dat.text}</div>
                  <div>{dat.type}</div>
                  <div>{dat.answer}</div>

                  <input type="checkbox" />
                </div>
              ))}
            </div>
          ) : (
            <div>No questions found</div>
          )}
        </div> */}
      </div>
    </section>
  );
};
