import { TokenDataType } from "types/tokenDataType";
import { createContext } from "react";

export interface TokenContextType {
  token: string | null;
  data: TokenDataType;
  loading: boolean;
  error: string | null;
}
export const TokenContext = createContext<TokenContextType>({
  token: null,
  data: { id: "", email: "", role: "" },
  loading: true,
  error: null,
});
