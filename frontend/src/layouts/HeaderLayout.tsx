import { Outlet } from "react-router-dom";
import { Header } from "@components/index";

export const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
