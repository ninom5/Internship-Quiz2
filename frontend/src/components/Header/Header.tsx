import { Link } from "react-router-dom";
import { routes } from "@routes/routes";
import { useToken } from "@hooks/useToken";
export const Header = () => {
  const {
    data: { role },
  } = useToken();

  return (
    <nav className="header-navigation">
      <Link to={routes.HOME}>Home</Link>

      <Link to={routes.QUIZZES_PAGE}>Quizzes</Link>

      {role === "admin" && <Link to={routes.ADMIN}>Admin page</Link>}

      <Link to={routes.LOGIN}>Login</Link>

      <Link to={routes.REGISTER}>Register</Link>
    </nav>
  );
};
