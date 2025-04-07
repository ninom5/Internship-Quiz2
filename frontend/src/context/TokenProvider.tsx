import { getUserDataFromToken } from "@utils/extractUserInfo";
import { PropsWithChildren, useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";
import { FC } from "react";

export const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(() => getUserDataFromToken());

  const updateToken = () => {
    const newState = getUserDataFromToken();
    setState(newState);
  };

  useEffect(() => {
    const onChange = () => updateToken();

    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return (
    <TokenContext.Provider value={{ ...state, updateToken }}>
      {children}
    </TokenContext.Provider>
  );
};
