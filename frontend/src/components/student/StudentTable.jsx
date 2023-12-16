import { Container, Button, Table } from "reactstrap";

import PropTypes from "prop-types";
import { format } from "date-fns";

const StudentTable = ({ studentDetails, onGetStudent, onDeleteStudent }) => {
  return (
    <>
      <Container className="mt-5">
        <p className="student-table-text">Student Details</p>
        <div className="border rounded p-4">
          <div className="table-responsive">
            <Table className="table-bordered">
              <thead>
                <tr className="table-secondary">
                  <th> Name</th>
                  <th>Contact Person</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Birthday</th>
                  <th>Age</th>
                  <th>Classroom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentDetails.map((row) => (
                  <tr key={row._id}>
                    <td>
                      <div className="d-flex">
                        <div>{row.firstName}</div> &nbsp;
                        <div>{row.lastName}</div>
                      </div>
                    </td>
                    <td>{row.contactPerson}</td>
                    <td>{row.contactNo}</td>
                    <td>{row.email}</td>
                    <td>{format(new Date(row.birthDay), "yyyy-MM-dd")}</td>
                    <td>{row.age}</td>
                    <td>
                      {row.classroom && row.classroomData ? (
                        row.classroomData.classroomName
                      ) : (
                        <span style={{ color: "red" }}>
                          Please add classroom details!
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex">
                        <Button
                          color="info"
                          className="me-2"
                          onClick={() => onGetStudent(row._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          className="ml-2"
                          onClick={() => onDeleteStudent(row._id)}
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

StudentTable.propTypes = {
  studentDetails: PropTypes.array.isRequired,
  onGetStudent: PropTypes.func.isRequired,
  onDeleteStudent: PropTypes.func.isRequired,
};

export default StudentTable;
