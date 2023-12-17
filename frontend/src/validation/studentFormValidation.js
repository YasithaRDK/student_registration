export const validateStudentForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (formData.lastName.trim().length < 3) {
    errors.lastName = "Last name must be at least 3 characters";
  }

  if (!formData.contactPerson.trim()) {
    errors.contactPerson = "Contact Person name is required";
  } else if (formData.contactPerson.trim().length < 3) {
    errors.contactPerson = "Name must be at least 3 characters";
  }

  if (!formData.contactNo.trim()) {
    errors.contactNo = "Contact number is required";
  } else if (!isValidContactNumber(formData.contactNo)) {
    errors.contactNo = "Invalid contact number";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.birthDay.trim()) {
    errors.birthDay = "Date of Birth is required";
  }

  if (!formData.age.trim()) {
    errors.age = "Age is required";
  }

  if (!formData.classroom.trim()) {
    errors.classroom = "Classroom is required";
  }
  return errors;
};

const isValidContactNumber = (contactNo) => {
  const ContactNoRegex = /^\+94\d{9}$/;

  return ContactNoRegex.test(contactNo);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
