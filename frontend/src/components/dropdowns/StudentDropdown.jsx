import { FormGroup, Label, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentDropdown = ({ resetForm, handleStudentChange, value }) => {
  const [studentDetails, setStudentDetails] = useState([]);

  const getStudents = async () => {
    const response = await axios.get("/api/students/");
    if (response.status === 200) {
      setStudentDetails(response.data);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <FormGroup row>
        <Label htmlFor="student" sm={3}>
          Student
        </Label>
        <Col sm={8}>
          <Input
            id="studentName"
            name="studentName"
            type="select"
            value={value}
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue !== "") {
                handleStudentChange(selectedValue);
              }
              resetForm();
            }}
          >
            <option value="">Select student</option>
            {studentDetails.length > 0 &&
              studentDetails.map((student) => (
                <option key={student._id} value={student._id}>
                  {`${student.firstName} ${student.lastName}`}
                </option>
              ))}
          </Input>
        </Col>
      </FormGroup>
    </>
  );
};

StudentDropdown.propTypes = {
  value: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  handleStudentChange: PropTypes.func.isRequired,
};

export default StudentDropdown;
