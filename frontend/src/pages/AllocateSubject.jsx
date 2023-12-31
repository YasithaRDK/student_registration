import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import AllocateSubjectForm from "../components/allocateSubject/AllocateSubjectForm";
import AllocateSubjectTable from "../components/allocateSubject/AllocateSubjectTable";
import { validateAllocateSubjectForm } from "../validation/allocateSubjectFormValidation";

const AllocateSubject = () => {
  const [formData, setFormData] = useState({
    teacher: "",
    subject: "",
  });
  const [formErrors, SetFormErrors] = useState({
    teacher: "",
    subject: "",
  });
  const [allocateSubject, setAllocateSubject] = useState([]);

  const getAllAllocateSubjects = () => {
    axios
      .get("/api/allocate-subjects/")
      .then((response) => {
        if (response.status === 200) {
          setAllocateSubject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        toast.error("Something went wrong, reload again!");
      });
  };

  const addAllocateSubject = async (data) => {
    axios
      .post("/api/allocate-subjects/", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record added successfully");
          resetForm();
          getAllAllocateSubjects();
        }
      })
      .catch((error) => {
        console.error("Error adding teachers:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const onDeleteALS = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete that record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/allocate-subjects/${id}`)
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Record Deleted");
                  getAllAllocateSubjects();
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
    getAllAllocateSubjects();
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateAllocateSubjectForm(formData);
    if (Object.keys(errors).length === 0) {
      addAllocateSubject(formData);
    } else {
      SetFormErrors(errors);
    }
  };

  const resetForm = () => {
    setFormData({
      teacher: "",
      subject: "",
    });
    SetFormErrors({
      teacher: "",
      subject: "",
    });
  };

  return (
    <>
      <AllocateSubjectForm
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formErrors={formErrors}
      />

      <AllocateSubjectTable
        allocateSubject={allocateSubject}
        onDeleteALS={onDeleteALS}
      />
    </>
  );
};

export default AllocateSubject;
