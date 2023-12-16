import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import SubjectForm from "../components/subject/SubjectForm";
import SubjectTable from "../components/subject/SubjectTable";

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [subjectId, setSubjectId] = useState(null);

  const getAllSubject = () => {
    axios
      .get("/api/subjects/")
      .then((response) => {
        if (response.status === 200) {
          setSubjectDetails(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  };

  const onGetSubject = async (id) => {
    axios
      .get(`/api/subjects/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const subjectData = response.data;
          setSubjectName(subjectData.subjectName);
          setIsEditing(true);
          setSubjectId(id);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const addSubject = async (data) => {
    axios
      .post("/api/subjects/", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record added successfully");
          setSubjectName("");
          getAllSubject();
        }
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const updateSubject = async (data) => {
    axios
      .put(`/api/subjects/${subjectId}`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Record Updated");
          setSubjectName("");
          setIsEditing(false);
          setSubjectId(null);
          getAllSubject();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const onDeleteSubject = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message:
        "Deleting this teacher will result in the loss of students and allocate subject details. Are you sure",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/subjects/${id}`)
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Record Deleted");
                  getAllSubject();
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
    getAllSubject();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!subjectName) {
      toast.error("*All fields are required");
    } else {
      const data = { subjectName };
      if (isEditing) {
        updateSubject(data);
      } else {
        addSubject(data);
      }
    }
  };

  const onClickReset = () => {
    setSubjectName("");
    setSubjectId(null);
    setIsEditing(false);
  };

  return (
    <>
      <SubjectForm
        isEditing={isEditing}
        onSubmit={onSubmit}
        value={subjectName}
        setSubjectName={setSubjectName}
        onClickReset={onClickReset}
      />
      <SubjectTable
        subjectDetails={subjectDetails}
        onGetSubject={onGetSubject}
        onDeleteSubject={onDeleteSubject}
      />
    </>
  );
};

export default Subject;
