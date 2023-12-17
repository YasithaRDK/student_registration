export const validateSubjectForm = (subjectName) => {
  const errors = {};

  if (!subjectName.trim()) {
    errors.subjectName = "Subject name is required";
  }
  return errors;
};
