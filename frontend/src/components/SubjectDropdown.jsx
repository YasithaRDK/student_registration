import { Label, Input, Col, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const SubjectDropdown = ({ value, onChange }) => {
  const [subjectDetails, setSubjectDetails] = useState([]);
  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const response = await axios.get("/api/subjects/");
    if (response.status === 200) {
      setSubjectDetails(response.data);
    }
  };

  return (
    <>
      <FormGroup row>
        <Label htmlFor="subject" sm={2}>
          Subject
        </Label>
        <Col sm={8}>
          <Input
            id="subject"
            name="subject"
            value={value}
            onChange={onChange}
            type="select"
          >
            <option value="">Select Subject</option>
            {subjectDetails.length > 0 &&
              subjectDetails.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subjectName}
                </option>
              ))}
          </Input>
        </Col>
      </FormGroup>
    </>
  );
};

SubjectDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SubjectDropdown;
