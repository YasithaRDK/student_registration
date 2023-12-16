import { Button, Container, Table } from "reactstrap";
import PropTypes from "prop-types";

const SubjectTable = ({ subjectDetails, onGetSubject, onDeleteSubject }) => {
  return (
    <>
      <Container className="mt-5">
        <p className="subject-table-text">Subject Details</p>
        <div className="border rounded p-4">
          <div className="table-responsive">
            <Table className="table-bordered">
              <thead>
                <tr className="table-secondary">
                  <th style={{ width: "85%" }}> Subject Name</th>
                  <th style={{ width: "15%" }}> Action</th>
                </tr>
              </thead>
              <tbody>
                {subjectDetails.map((row) => (
                  <tr key={row._id}>
                    <td style={{ width: "85%" }}>{row.subjectName}</td>
                    <td style={{ width: "15%" }}>
                      <div className="d-flex">
                        <Button
                          color="info"
                          className="me-2"
                          onClick={() => onGetSubject(row._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          className="ml-2"
                          onClick={() => onDeleteSubject(row._id)}
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

SubjectTable.propTypes = {
  subjectDetails: PropTypes.array.isRequired,
  onGetSubject: PropTypes.func.isRequired,
  onDeleteSubject: PropTypes.func.isRequired,
};

export default SubjectTable;
