import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const NavigationLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
