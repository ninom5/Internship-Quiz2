import { Link } from "react-router-dom";
import { routes } from "@routes/routes";
import { useToken } from "@hooks/useToken";
export const Header = () => {
  const {
    data: { role },
  } = useToken();

  return (
    <nav className="flex items-center w-full h-auto p-[20px] justify-around text-[25px]">
      <Link to={routes.HOME}>Home</Link>

      <Link to={routes.QUIZZES_PAGE}>Quizzes</Link>

      {role === "admin" && <Link to={routes.ADMIN}>Admin page</Link>}

      <Link to={routes.LOGIN}>Login</Link>

      <Link to={routes.REGISTER}>Register</Link>
    </nav>
  );
};
