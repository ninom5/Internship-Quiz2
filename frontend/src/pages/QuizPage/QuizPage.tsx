import { useParams } from "react-router-dom";
import { useFetchQuizById } from "../../hooks/useFetchQuizById";

export const QuizPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchQuizById(id as string);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching quiz by id</div>;

  if (!data) return <div>Quiz data is empty</div>;

  return (
    <div>
      <h1>Quiz Page</h1>
      <h3>{data.title}</h3>
      <img src={data?.imageUrl} alt={data.title} />
      <h5>{data.description}</h5>
    </div>
  );
};
