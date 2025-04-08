import { TokenDataType } from "types/tokenDataType";
import { createContext } from "react";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface TokenContextType {
  data: TokenDataType;
  loading: boolean;
  error: string | null;
  token: string | null;
  updateToken: () => void;
}
export const TokenContext = createContext<TokenContextType>({
  data: { id: "", email: "", role: "" },
  loading: true,
  error: null,
  token: "",
  updateToken: () => {},
});
