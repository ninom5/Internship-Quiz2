import { routes } from "@routes/routes";
import { Link } from "react-router-dom";

export const Restricted = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p>Please login to access this page.</p>
      <Link to={routes.LOGIN} className="underline">
        Login
      </Link>
    </div>
  );
};
