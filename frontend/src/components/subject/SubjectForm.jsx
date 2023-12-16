import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

const SubjectForm = ({
  isEditing,
  onSubmit,
  value,
  setSubjectName,
  onClickReset,
}) => {
  return (
    <>
      <Container>
        <p className="add-subject-text">
          {isEditing ? "Edit subject" : "Add subject"}
        </p>
        <form onSubmit={onSubmit} className="border rounded p-4 mt-5">
          <Row>
            <FormGroup row>
              <Label sm={2}>Subject</Label>
              <Col sm={4}>
                <Input
                  type="text"
                  id="subjectName"
                  name="subjectName"
                  value={value}
                  placeholder="Enter Subject"
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </Col>
              <Col sm={3}>
                <div>
                  <Button
                    color={`${isEditing ? "success" : "primary"}`}
                    type="submit"
                  >
                    {isEditing ? "Update" : "Save"}
                  </Button>
                  {isEditing && (
                    <Button
                      color="danger"
                      className="ms-2"
                      onClick={onClickReset}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Col>
            </FormGroup>
          </Row>
        </form>
      </Container>
    </>
  );
};

SubjectForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setSubjectName: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default SubjectForm;
