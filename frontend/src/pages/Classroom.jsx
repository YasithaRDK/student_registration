import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import ClassroomForm from "../components/classroom/ClassroomForm";
import ClassroomTable from "../components/classroom/ClassroomTable";

const Classroom = () => {
  const [classroomName, setClassroomName] = useState("");
  const [classroomDetails, setClassroomDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [classroomId, setClassroomId] = useState(null);

  const getAllClassroom = () => {
    axios
      .get("/api/classrooms/")
      .then((response) => {
        if (response.status === 200) {
          setClassroomDetails(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  };

  const onGetClassroom = async (id) => {
    axios
      .get(`/api/classrooms/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const classroomData = response.data;
          setClassroomName(classroomData.classroomName);
          setIsEditing(true);
          setClassroomId(id);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const addClassroom = async (data) => {
    axios
      .post("/api/classrooms/", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record added successfully");
          setClassroomName("");
          getAllClassroom();
        }
      })
      .catch((error) => {
        console.error("Error adding classroom:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const updateClassroom = async (data) => {
    axios
      .put(`/api/classrooms/${classroomId}`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record Updated");
          setClassroomName("");
          setIsEditing(false);
          setClassroomId(null);
          getAllClassroom();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const onDeleteClassroom = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message:
        "Deleting this teacher will result in the loss of students and allocate subject details. Are you sure",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/classrooms/${id}`)
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Record Deleted");
                  getAllClassroom();
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
    getAllClassroom();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!classroomName) {
      toast.error("*All fields are required");
    } else {
      const data = { classroomName };
      if (isEditing) {
        updateClassroom(data);
      } else {
        addClassroom(data);
      }
    }
  };

  const onClickReset = () => {
    setClassroomName("");
    setClassroomId(null);
    setIsEditing(false);
  };

  return (
    <>
      <ClassroomForm
        isEditing={isEditing}
        onSubmit={onSubmit}
        value={classroomName}
        setClassroomName={setClassroomName}
        onClickReset={onClickReset}
      />

      <ClassroomTable
        classroomDetails={classroomDetails}
        onGetClassroom={onGetClassroom}
        onDeleteClassroom={onDeleteClassroom}
      />
    </>
  );
};

export default Classroom;
