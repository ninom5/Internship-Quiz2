import { getUserDataFromToken } from "@constants/extractUserInfo";
import { PropsWithChildren } from "react";
import { TokenContext } from "./tokenContext";
import { FC } from "react";

export const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const state = getUserDataFromToken();

  return (
    <TokenContext.Provider value={state}>{children}</TokenContext.Provider>
  );
};
