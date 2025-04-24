import { jwtDecode } from "jwt-decode";

interface Payload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export const getUserDataFromToken = () => {
  const token = localStorage.getItem("jwt");

  if (!token)
    return {
      token: null,
      data: { id: "", email: "", role: "" },
      loading: false,
      isExpired: null,
      error: "No token found",
    };

  try {
    const decoded: Payload = jwtDecode<Payload>(token);
    const isExpired = isTokenExpired(decoded);

    return {
      token: token,
      isExpired,
      data: { id: decoded.id, email: decoded.email, role: decoded.role },
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return {
      token: token,
      data: { id: "", email: "", role: "" },
      loading: false,
      isExpired: null,
      error: "No token found",
    };
  }
};

const isTokenExpired = (decoded: Payload) => {
  const currentDate = Date.now() / 1000;
  return decoded.exp < currentDate;
};
