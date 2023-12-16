import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import TeacherForm from "../components/teacher/TeacherForm";
import TeacherTable from "../components/teacher/TeacherTable";

const Teacher = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
  });
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [teacherId, setTeacherId] = useState(null);

  const { firstName, lastName, contactNo, email } = formData;

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      contactNo: "",
      email: "",
    });
  };

  const getAllTeachers = () => {
    axios
      .get("/api/teachers/")
      .then((response) => {
        if (response.status === 200) {
          setTeacherDetails(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        toast.error("Something went wrong, reload again!");
      });
  };

  const onGetTeacher = (id) => {
    axios
      .get(`/api/teachers/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const teacherData = response.data;
          setFormData({
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
            contactNo: teacherData.contactNo,
            email: teacherData.email,
          });
          setIsEditing(true);
          setTeacherId(id);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const addTeacher = async (data) => {
    axios
      .post("/api/teachers/", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record added successfully");
          resetForm();
          getAllTeachers();
        }
      })
      .catch((error) => {
        console.error("Error adding teachers:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const updateTeacher = async () => {
    axios
      .put(`/api/teachers/${teacherId}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record Updated");
          resetForm();
          setIsEditing(false);
          setTeacherId(null);
          getAllTeachers();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const onDeleteTeacher = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message:
        "Deleting this teacher will result in the loss of allocate subject and classroom details. Are you sure",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/teachers/${id}`)
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Record Deleted");
                  getAllTeachers();
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  error.response.data.message ||
                    "Something went wrong, try again!"
                );
              });
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
    getAllTeachers();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !contactNo || !email) {
      toast.error("*All fields are required");
    } else {
      const data = { firstName, lastName, contactNo, email };
      if (isEditing) {
        updateTeacher();
      } else {
        addTeacher(data);
      }
    }
  };

  const onClickReset = () => {
    resetForm();
    setIsEditing(false);
    setTeacherId(null);
  };

  return (
    <>
      <TeacherForm
        formData={formData}
        isEditing={isEditing}
        onChange={onChange}
        onSubmit={onSubmit}
        onClickReset={onClickReset}
      />
      <TeacherTable
        teacherDetails={teacherDetails}
        onGetTeacher={onGetTeacher}
        onDeleteTeacher={onDeleteTeacher}
      />
    </>
  );
};

export default Teacher;
