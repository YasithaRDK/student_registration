export const validateAllocateSubjectForm = (formData) => {
  const errors = {};

  if (!formData.teacher.trim()) {
    errors.teacher = "Teacher is required";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }
  return errors;
};
