import { Button, Col, Container, Row } from "reactstrap";
import TeacherDropdown from "../TeacherDropdown";
import SubjectDropdown from "../SubjectDropdown";
import PropTypes from "prop-types";

const AllocateSubjectForm = ({ onSubmit, onChange, formData }) => {
  const { teacher, subject } = formData;
  return (
    <Container>
      <p className="alc-sub-text">Allocate Subject</p>
      <form onSubmit={onSubmit} className="border rounded p-4 mt-5">
        <Row>
          <Col md="6">
            <TeacherDropdown value={teacher} onChange={onChange} />
          </Col>
          <Col md="6">
            <SubjectDropdown value={subject} onChange={onChange} />
          </Col>
        </Row>
        <Button color="primary" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

AllocateSubjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AllocateSubjectForm;
