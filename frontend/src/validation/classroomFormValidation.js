export const validateClassroomForm = (classroomName) => {
  const errors = {};

  if (!classroomName.trim()) {
    errors.classroomName = "First name is required";
  } else if (!isValidClassroom(classroomName)) {
    errors.classroomName =
      "Invalid format. The accepted format should be similar to 'Grade 1A'.";
  }

  return errors;
};

const isValidClassroom = (classroomName) => {
  const ClassroomRegex = /^(Grade\s\d+[A-Za-z])$/;
  return ClassroomRegex.test(classroomName);
};
