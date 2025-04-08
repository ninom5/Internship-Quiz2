export const validateFields = (fields: Record<string, string>) => {
  for (const [name, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") return `${name} field can't be empty`;
  }

  return null;
};
