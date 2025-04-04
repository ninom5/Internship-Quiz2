import { TokenDataType } from "types/tokenDataType";
import { createContext } from "react";

export interface TokenContextType {
  data: TokenDataType;
  loading: boolean;
  error: string | null;
}
export const TokenContext = createContext<TokenContextType>({
  data: { id: "", email: "", role: "" },
  loading: true,
  error: null,
});
