import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
export const Header = () => {
  return (
    <nav className="header-navigation">
      <Link to={routes.HOME}>Home</Link>

      <Link to={routes.QUIZZES_PAGE}>Quizzes</Link>

      <Link to={routes.LOGIN}>Login</Link>
    </nav>
  );
};
