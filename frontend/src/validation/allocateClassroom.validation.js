export const validateAllocateClassroomForm = (formData) => {
  const errors = {};

  if (!formData.teacher.trim()) {
    errors.teacher = "Teacher is required";
  }

  if (!formData.classroom.trim()) {
    errors.classroom = "Classroom is required";
  }
  return errors;
};
