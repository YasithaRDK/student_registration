import { Button, Col, Container, Row } from "reactstrap";
import TeacherDropdown from "../dropdowns/TeacherDropdown";
import ClassDropdown from "../dropdowns/ClassDropdown";
import PropTypes from "prop-types";

const AllocateClassroomForm = ({
  onSubmit,
  onChange,
  formData,
  formErrors,
}) => {
  const { teacher, classroom } = formData;
  return (
    <Container>
      <p className="alc-class-text">Allocate Classroom</p>
      <form onSubmit={onSubmit} className="border rounded p-4 mt-5">
        <Row>
          <Col md="6">
            <TeacherDropdown
              value={teacher}
              onChange={onChange}
              formErrors={formErrors}
            />
          </Col>
          <Col md="6">
            <ClassDropdown
              value={classroom}
              onChange={onChange}
              formErrors={formErrors}
            />
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
  formErrors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AllocateClassroomForm;
