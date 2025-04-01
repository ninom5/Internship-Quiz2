import { Outlet } from "react-router-dom";
import { Navigation } from "@components/index";

export const NavigationLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
