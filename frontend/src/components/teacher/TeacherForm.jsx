import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";

const TeacherForm = ({
  isEditing,
  onSubmit,
  onChange,
  formData,
  onClickReset,
  formErrors,
}) => {
  const { firstName, lastName, contactNo, email } = formData;
  return (
    <>
      <Container>
        <p className="add-student-text">
          {isEditing ? "Edit Teacher" : "Add Teacher"}
        </p>
        <form onSubmit={onSubmit} className="border rounded p-4 mt-5">
          <Row>
            <Col md="6">
              <FormGroup row>
                <Label sm={3}>First Name</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    placeholder="Enter First Name"
                  />
                  <div className="text-danger mt-1">{formErrors.firstName}</div>
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label sm={3}>Last Name</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    placeholder="Enter Last Name"
                  />
                  <div className="text-danger mt-1">{formErrors.lastName}</div>
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label htmlFor="contactNo" sm={3}>
                  Contact Number
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="contactNo"
                    name="contactNo"
                    value={contactNo}
                    onChange={onChange}
                    placeholder="Enter Contact Number"
                  />
                  <div className="text-danger mt-1">{formErrors.contactNo}</div>
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label htmlFor="email" sm={3}>
                  Email
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Enter Email"
                  />
                  <div className="text-danger mt-1">{formErrors.email}</div>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Button color={isEditing ? "success" : "primary"} type="submit">
            {isEditing ? "Update" : "Save"}
          </Button>
          {isEditing && (
            <Button color="danger ms-2" onClick={onClickReset}>
              Cancel
            </Button>
          )}
        </form>
      </Container>
    </>
  );
};

TeacherForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default TeacherForm;
