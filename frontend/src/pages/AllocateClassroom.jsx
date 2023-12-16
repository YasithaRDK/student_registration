import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import AllocateClassroomForm from "../components/allocateClassroom/AllocateClassroomForm";
import AllocateClassroomTable from "../components/allocateClassroom/AllocateClassroomTable";

const AllocateClassroom = () => {
  const [formData, setFormData] = useState({
    teacher: "",
    classroom: "",
  });
  const [allocateClassroomDetails, setAllocateClassroomDetails] = useState([]);

  const { teacher, classroom } = formData;

  const resetForm = () => {
    setFormData({
      teacher: "",
      classroom: "",
    });
  };

  const getAllAllocateClassroom = () => {
    axios
      .get("/api/allocate-classrooms/")
      .then((response) => {
        if (response.status === 200) {
          setAllocateClassroomDetails(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        toast.error("Something went wrong, reload again!");
      });
  };
  const addAllocateClassroom = async (data) => {
    axios
      .post("/api/allocate-classrooms/", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record added successfully");
          resetForm();
          getAllAllocateClassroom();
        }
      })
      .catch((error) => {
        console.error("Error adding teachers:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const onDeleteALC = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete that record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/allocate-classrooms/${id}`)
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Record Deleted");
                  getAllAllocateClassroom();
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
    getAllAllocateClassroom();
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!teacher || !classroom) {
      toast.error("*All fields are required");
    } else {
      const data = { teacher, classroom };
      addAllocateClassroom(data);
    }
  };

  return (
    <>
      <AllocateClassroomForm
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
      />

      <AllocateClassroomTable
        onDeleteALC={onDeleteALC}
        allocateClassroomDetails={allocateClassroomDetails}
      />
    </>
  );
};

export default AllocateClassroom;
