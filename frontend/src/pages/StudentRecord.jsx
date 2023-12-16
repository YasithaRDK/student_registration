import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import StudentRecordForm from "../components/studentrecord/StudentRecordForm";
import StudentRecordTable from "../components/studentrecord/StudentRecordTable";

const StudentRecord = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    classroom: "",
    contactPerson: "",
    email: "",
    contactNo: "",
    birthDay: "",
  });
  const [teacherAndSubjectDetails, setTeacherAndSubjectDetails] = useState([]);

  const handleStudentChange = async (selectedStudentId) => {
    resetForm();
    try {
      const response = await axios.get(`/api/students/${selectedStudentId}`);
      if (response.status === 200) {
        const studentData = response.data[0];
        const classDetails = studentData.allocatedClassroom
          ? studentData.allocatedClassroom
          : "";
        setFormData({
          classroom: classDetails,
          contactPerson: studentData.contactPerson,
          email: studentData.email,
          contactNo: studentData.contactNo,
          birthDay: format(new Date(studentData.birthDay), "yyyy-MM-dd"),
        });
        setTeacherAndSubjectDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      classroom: "",
      contactPerson: "",
      email: "",
      contactNo: "",
      birthDay: "",
    });
    setTeacherAndSubjectDetails([]);
  };

  return (
    <>
      <StudentRecordForm
        handleStudentChange={handleStudentChange}
        formData={formData}
        setFormData={setFormData}
        resetForm={resetForm}
      />
      <StudentRecordTable teacherAndSubjectDetails={teacherAndSubjectDetails} />
    </>
  );
};

export default StudentRecord;
