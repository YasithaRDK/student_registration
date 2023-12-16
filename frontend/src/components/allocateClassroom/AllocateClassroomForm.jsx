import { Button, Col, Container, Row } from "reactstrap";
import TeacherDropdown from "../TeacherDropdown";
import ClassDropdown from "../ClassDropdown";
import PropTypes from "prop-types";

const AllocateClassroomForm = ({ onSubmit, onChange, formData }) => {
  const { teacher, classroom } = formData;
  return (
    <Container>
      <p className="alc-class-text">Allocate Classroom</p>
      <form onSubmit={onSubmit} className="border rounded p-4 mt-5">
        <Row>
          <Col md="6">
            <TeacherDropdown value={teacher} onChange={onChange} />
          </Col>
          <Col md="6">
            <ClassDropdown value={classroom} onChange={onChange} />
          </Col>
        </Row>
        <Button color="primary" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

AllocateClassroomForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AllocateClassroomForm;
