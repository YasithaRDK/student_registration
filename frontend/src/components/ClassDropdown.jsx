import { FormGroup, Label, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const ClassDropdown = ({ value, onChange }) => {
  const [classroomDetails, setClassroomDetails] = useState([]);
  useEffect(() => {
    getClassrooms();
  }, []);

  const getClassrooms = async () => {
    const response = await axios.get("/api/classrooms/");
    if (response.status === 200) {
      setClassroomDetails(response.data);
    }
  };

  return (
    <>
      <FormGroup row>
        <Label htmlFor="classroom" sm={3}>
          Classroom
        </Label>
        <Col sm={8}>
          <Input
            id="classroom"
            name="classroom"
            value={value}
            onChange={onChange}
            type="select"
          >
            <option value="">Select Classroom</option>
            {classroomDetails.length > 0 &&
              classroomDetails.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.classroomName}
                </option>
              ))}
          </Input>
        </Col>
      </FormGroup>
    </>
  );
};

ClassDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ClassDropdown;
