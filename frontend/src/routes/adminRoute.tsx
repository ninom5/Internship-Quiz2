import { Navigate, Outlet, Link } from "react-router-dom";
import { routes } from "./routes";
import { useToken } from "@hooks/index";

export const AdminRoute = () => {
  const userData = useToken();
  const role = userData?.data?.role;

  if (userData.loading) return <div>Loading...</div>;
  if (userData.isExpired)
    return (
      <div>
        Session expired. Please <Link to={routes.LOGIN}> login</Link> again
      </div>
    );

  return role === "admin" ? <Outlet /> : <Navigate to={routes.LOGIN} replace />;
};
