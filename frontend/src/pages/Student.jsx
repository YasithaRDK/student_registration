import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { format } from "date-fns";
import StudentForm from "../components/student/StudentForm";
import StudentTable from "../components/student/StudentTable";
import { validateStudentForm } from "../validation/studentFormValidation";

const Student = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDay: "",
    age: "",
    classroom: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDay: "",
    age: "",
    classroom: "",
  });
  const [studentDetails, setStudentDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [studentId, setStudentId] = useState(null);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      contactPerson: "",
      contactNo: "",
      email: "",
      birthDay: "",
      age: "",
      classroom: "",
    });

    setFormErrors({
      firstName: "",
      lastName: "",
      contactPerson: "",
      contactNo: "",
      email: "",
      birthDay: "",
      age: "",
      classroom: "",
    });
  };

  const getAllStudents = useCallback(() => {
    axios
      .get("/api/students/")
      .then((response) => {
        if (response.status === 200) {
          const studentsWithAge = response.data.map((student) => {
            const age = calculateAge(student.birthDay);
            return { ...student, age: age.toString() };
          });

          setStudentDetails(studentsWithAge);
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        toast.error("Something went wrong, reload again!");
      });
  }, [setStudentDetails]);

  const onGetStudent = (id) => {
    resetForm();
    axios
      .get(`/api/students/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const studentData = response.data[0];
          // const classroomId = studentData.classroom
          //   ? studentData.allocatedClassroomID
          //   : "";
          setFormData({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            contactPerson: studentData.contactPerson,
            contactNo: studentData.contactNo,
            email: studentData.email,
            birthDay: format(new Date(studentData.birthDay), "yyyy-MM-dd"),
            age: calculateAge(studentData.birthDay).toString(),
            classroom: studentData.classroom,
          });
          setIsEditing(true);
          setStudentId(id);
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const addStudent = (data) => {
    axios
      .post("/api/students/", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record added successfully");
          resetForm();
          getAllStudents();
        }
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const updateStudent = async () => {
    try {
      const response = await axios.put(`/api/students/${studentId}`, formData);
      if (response.status === 200) {
        toast.success("Record Updated");
        resetForm();
        setIsEditing(false);
        setStudentId(null);
        getAllStudents();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onDeleteStudent = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete that record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.delete(`/api/students/${id}`);
              if (response.status === 200) {
                toast.success("Record Deleted");
                getAllStudents();
              }
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong, try again!");
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if user clicks "No"
          },
        },
      ],
    });
  };

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  // Calculate age when fetch data function
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const onChange = (e) => {
    let value = e.target.value;

    // If the field being updated is 'birthDay', calculate the age
    if (e.target.name === "birthDay") {
      const today = new Date();

      // Check if the selected date is valid
      if (value) {
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: value,
          age: age.toString(),
        }));
      } else {
        // If the selected date is empty or invalid, set age to an empty string
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: value,
          age: "",
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateStudentForm(formData);
    if (Object.keys(errors).length === 0) {
      if (isEditing) {
        updateStudent();
      } else {
        addStudent(formData);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const onClickReset = () => {
    resetForm();
    setIsEditing(false);
    setStudentId(null);
  };

  return (
    <>
      <StudentForm
        formData={formData}
        isEditing={isEditing}
        onChange={onChange}
        onSubmit={onSubmit}
        onClickReset={onClickReset}
        formErrors={formErrors}
      />

      <StudentTable
        studentDetails={studentDetails}
        onGetStudent={onGetStudent}
        onDeleteStudent={onDeleteStudent}
      />
    </>
  );
};

export default Student;
