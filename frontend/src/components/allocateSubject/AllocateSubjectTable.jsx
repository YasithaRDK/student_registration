import { Button, Container, Table } from "reactstrap";
import PropTypes from "prop-types";

const AllocateSubjectTable = ({
  allocateSubject,
  // onGetALS,
  onDeleteALS,
}) => {
  return (
    <Container className="mt-5">
      <p className="alc-subject-text">Allocate Subject Details</p>
      <div className="border rounded p-4">
        <div className="table-responsive">
          <Table className="table-bordered">
            <thead>
              <tr className="table-secondary">
                <th> Teacher</th>
                <th> Subject</th>
                <th style={{ width: "15%" }}> Action</th>
              </tr>
            </thead>
            <tbody>
              {allocateSubject.map((row) => (
                <tr key={row._id}>
                  <td>
                    {row.teacher ? (
                      `${row.teacher.firstName} ${row.teacher.lastName}`
                    ) : (
                      <span style={{ color: "red" }}>
                        Please add this record again!
                      </span>
                    )}
                  </td>
                  <td>
                    {row.subject ? (
                      row.subject.subjectName
                    ) : (
                      <span style={{ color: "red" }}>
                        Please add this record again!
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex">
                      {/* <Button
                        color="info"
                        className="me-2"
                        onClick={() => onGetALS(row._id)}
                      >
                        Edit
                      </Button> */}
                      <Button
                        color="danger"
                        className="ml-2"
                        onClick={() => onDeleteALS(row._id)}
                      >
                        Deallocate
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
  );
};

AllocateSubjectTable.propTypes = {
  allocateSubject: PropTypes.array.isRequired,
  //   onGetALS: PropTypes.func.isRequired,
  onDeleteALS: PropTypes.func.isRequired,
};

export default AllocateSubjectTable;
