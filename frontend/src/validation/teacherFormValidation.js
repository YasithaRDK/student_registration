export const validateTeacherForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (formData.firstName.trim().length < 3) {
    errors.firstName = "Last name must be at least 3 characters";
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
