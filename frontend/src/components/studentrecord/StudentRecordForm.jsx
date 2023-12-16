import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import PropTypes from "prop-types";
import StudentDropdown from "../StudentDropdown";

const StudentRecordForm = ({
  handleStudentChange,
  formData,
  setFormData,
  resetForm,
}) => {
  const { studentName, classroom, contactPerson, email, contactNo, birthDay } =
    formData;
  return (
    <>
      <Container>
        <p className="alc-sub-text">Student Record</p>
        <form className="border rounded p-4 mt-5">
          <Row>
            <Col md="6">
              <StudentDropdown
                value={studentName}
                handleStudentChange={handleStudentChange}
                resetForm={resetForm}
              />
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label sm={3}>Classroom</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="classroom"
                    name="classroom"
                    value={classroom}
                    onChange={(e) => setFormData(e.target.value)}
                    placeholder="Classroom"
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
                    placeholder="Contact Person"
                    onChange={(e) => setFormData(e.target.value)}
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
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setFormData(e.target.value)}
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
                    placeholder="Contact Number"
                    onChange={(e) => setFormData(e.target.value)}
                    required
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Label htmlFor="contactNo" sm={3}>
                  Date of Birth
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="birthDay"
                    name="birthDay"
                    value={birthDay}
                    placeholder="Contact Number"
                    onChange={(e) => setFormData(e.target.value)}
                    required
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

StudentRecordForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleStudentChange: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default StudentRecordForm;
