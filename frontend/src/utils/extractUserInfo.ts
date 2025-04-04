import { jwtDecode } from "jwt-decode";

interface Payload {
  id: string;
  email: string;
  role: string;
}

export const getUserDataFromToken = () => {
  const token = sessionStorage.getItem("jwt");

  if (!token)
    return {
      data: { id: "", email: "", role: "" },
      loading: false,
      error: "No token found",
    };

  try {
    const decoded: Payload = jwtDecode<Payload>(token);

    return {
      data: { id: decoded.id, email: decoded.email, role: decoded.role },
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return {
      data: { id: "", email: "", role: "" },
      loading: false,
      error: "No token found",
    };
  }
};
