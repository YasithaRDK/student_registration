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

const ClassroomForm = ({
  isEditing,
  onSubmit,
  value,
  setClassroomName,
  onClickReset,
}) => {
  return (
    <>
      <Container>
        <p className="add-class-text">
          {isEditing ? "Edit classroom" : "Add classroom"}
        </p>
        <form onSubmit={onSubmit} className="border rounded p-4 mt-5">
          <Row>
            <FormGroup row>
              <Label sm={2}>Classroom</Label>
              <Col sm={4}>
                <Input
                  type="text"
                  id="classroomName"
                  name="classroomName"
                  value={value}
                  placeholder="Enter Classroom"
                  onChange={(e) => setClassroomName(e.target.value)}
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

ClassroomForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setClassroomName: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default ClassroomForm;
