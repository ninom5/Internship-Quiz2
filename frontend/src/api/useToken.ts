import { TokenContext } from "context/TokenContext";
import { useContext } from "react";

export const useToken = () => {
  const context = useContext(TokenContext);

  if (!context) throw new Error("Error with useToken");

  return context;
};
