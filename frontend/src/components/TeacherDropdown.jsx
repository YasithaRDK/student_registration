import { Label, Input, Col, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const TeacherDropdown = ({ value, onChange }) => {
  const [teacherDetails, setTeacherDetails] = useState([]);
  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const response = await axios.get("/api/teachers/");
    if (response.status === 200) {
      setTeacherDetails(response.data);
    }
  };

  return (
    <>
      <FormGroup row>
        <Label htmlFor="teacher" sm={2}>
          Teacher
        </Label>
        <Col sm={8}>
          <Input
            id="teacher"
            name="teacher"
            value={value}
            onChange={onChange}
            type="select"
          >
            <option value="">Select Teacher</option>
            {teacherDetails.length > 0 &&
              teacherDetails.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {`${teacher.firstName} ${teacher.lastName}`}
                </option>
              ))}
          </Input>
        </Col>
      </FormGroup>
    </>
  );
};

TeacherDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TeacherDropdown;
