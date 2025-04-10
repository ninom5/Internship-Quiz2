import { fetchUserByEmail } from "@hooks/fetchUserByEmail";

export const useValidateRegisterData = () => {
  const validateRegisterData = async (formData: {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { name, surname, email, password, confirmPassword } = formData;

    const fields = [
      { name: "name", value: name },
      { name: "surname", value: surname },
      { name: "email", value: email },
      { name: "password", value: password },
      { name: "confirmPassword", value: confirmPassword },
    ];

    for (let field of fields) {
      const message = isEmpty(field);

      if (message && message.trim() !== "") return message;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    const user = await fetchUserByEmail(email);
    if (user) return "User with provided email already exist";

    if (password.length < 8)
      return "Password must contain at least 8 characters";

    if (password !== confirmPassword) return "Passwords do not match";

    return "Data is valid";
  };
  return { validateRegisterData };
};

const isEmpty = (field: { name: string; value: string }) => {
  return !field.value || field.value.trim() === ""
    ? `Field ${field.name} can't be empty`
    : "";
};
