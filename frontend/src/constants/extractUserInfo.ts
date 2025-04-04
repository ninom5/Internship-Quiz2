import { jwtDecode } from "jwt-decode";

interface Payload {
  id: string;
  email: string;
  role: string;
}

export const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("jwt");
  if (!token) return null;

  try {
    const decoded: Payload = jwtDecode<Payload>(token);
    return decoded.id;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
