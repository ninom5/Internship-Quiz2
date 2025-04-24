import { TokenDataType } from "types/tokenDataType";
import { createContext } from "react";

export interface TokenContextType {
  data: TokenDataType;
  loading: boolean;
  error: string | null;
  token: string | null;
  isExpired: boolean | null;
  updateToken: () => void;
}
export const TokenContext = createContext<TokenContextType>({
  data: { id: "", email: "", role: "" },
  loading: true,
  error: null,
  token: "",
  isExpired: true,
  updateToken: () => {},
});
