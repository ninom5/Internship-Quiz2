import { TokenContext } from "context/TokenContext";
import { useContext, useEffect, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("jwt")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("jwt"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const context = useContext(TokenContext);

  if (!context) throw new Error("Error with useToken");

  return context;
};
