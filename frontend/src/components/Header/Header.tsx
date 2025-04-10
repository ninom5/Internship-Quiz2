import { Link } from "react-router-dom";
import { routes } from "@routes/routes";
import { useToken } from "@hooks/index";

export const Header = () => {
  const {
    data: { role },
    token,
    updateToken,
  } = useToken();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    updateToken();
  };

  return (
    <nav className="flex items-center w-full h-auto p-[20px] justify-around text-[25px]">
      <Link to={routes.HOME}>Home</Link>

      <Link to={routes.QUIZZES_PAGE}>Quizzes</Link>

      {role === "admin" && <Link to={routes.ADMIN}>Admin page</Link>}

      {token ? (
        <Link to={routes.LOGIN} onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <>
          <Link to={routes.LOGIN}>Login</Link>
          <Link to={routes.REGISTER}>Register</Link>
        </>
      )}
    </nav>
  );
};
