import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import ClassDropdown from "../ClassDropdown";
import PropTypes from "prop-types";

const StudentForm = ({
  isEditing,
  formData,
  onChange,
  onSubmit,
  onClickReset,
}) => {
  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    age,
    classroom,
  } = formData;

  return (
    <>
      <Container>
        <p className="add-student-text">
          {isEditing ? "Edit Student" : "Add Student"}
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
                    required
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label sm={3}>Contact Person</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={contactPerson}
                    onChange={onChange}
                    placeholder="Enter Contact Person"
                    required
                  />
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
                    required
                  />
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
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Enter Email"
                    required
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label htmlFor="birthDay" sm={3}>
                  Date of Birth
                </Label>
                <Col sm={8}>
                  <Input
                    type="date"
                    className="form-control"
                    id="birthDay"
                    name="birthDay"
                    value={birthDay}
                    onChange={onChange}
                    placeholder="Enter Date of Birth"
                    required
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label htmlFor="age" sm={3}>
                  Age
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="age"
                    name="age"
                    value={age}
                    onChange={onChange}
                    placeholder="Age"
                    required
                    disabled
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <ClassDropdown value={classroom} onChange={onChange} />
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

StudentForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default StudentForm;
