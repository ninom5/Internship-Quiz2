import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./routes";
import { useToken } from "@hooks/useToken";

export const AdminRoute = () => {
  const userData = useToken();
  const role = userData?.data?.role;

  if (userData.loading) return <div>Loading...</div>;

  return role === "admin" ? <Outlet /> : <Navigate to={routes.HOME} replace />;
};
