import { Button, Container, Table } from "reactstrap";
import PropTypes from "prop-types";

const TeacherTable = ({ teacherDetails, onGetTeacher, onDeleteTeacher }) => {
  return (
    <>
      <Container className="mt-5">
        <p className="student-table-text">Teacher Details</p>
        <div className="border rounded p-4">
          <div className="table-responsive">
            <Table className="table-bordered">
              <thead>
                <tr className="table-secondary">
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th style={{ width: "15%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {teacherDetails.map((row) => (
                  <tr key={row._id}>
                    <td>
                      <div className="d-flex">
                        <div>{row.firstName}</div> &nbsp;
                        <div>{row.lastName}</div>
                      </div>
                    </td>
                    <td>{row.contactNo}</td>
                    <td>{row.email}</td>
                    <td style={{ width: "15%" }}>
                      <div className="d-flex">
                        <Button
                          color="info"
                          className="me-2"
                          onClick={() => onGetTeacher(row._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          className="ml-2"
                          onClick={() => onDeleteTeacher(row._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
};

TeacherTable.propTypes = {
  teacherDetails: PropTypes.array.isRequired,
  onGetTeacher: PropTypes.func.isRequired,
  onDeleteTeacher: PropTypes.func.isRequired,
};

export default TeacherTable;
