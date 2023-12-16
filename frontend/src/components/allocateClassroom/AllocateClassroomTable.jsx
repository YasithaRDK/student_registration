import { Button, Container, Table } from "reactstrap";
import PropTypes from "prop-types";

const AllocateClassroomTable = ({
  allocateClassroomDetails,
  // onGetALC,
  onDeleteALC,
}) => {
  return (
    <Container className="mt-5">
      <p className="alc-classroom-text">Allocate Classroom Details</p>
      <div className="border rounded p-4">
        <div className="table-responsive">
          <Table className="table-bordered">
            <thead>
              <tr className="table-secondary">
                <th> Teacher</th>
                <th> Class</th>
                <th style={{ width: "15%" }}> Action</th>
              </tr>
            </thead>
            <tbody>
              {allocateClassroomDetails.map((row) => (
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
                    {row.classroom ? (
                      row.classroom.classroomName
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
                        onClick={() => onDeleteALC(row._id)}
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

AllocateClassroomTable.propTypes = {
  allocateClassroomDetails: PropTypes.array.isRequired,
  //   onGetALS: PropTypes.func.isRequired,
  onDeleteALC: PropTypes.func.isRequired,
};

export default AllocateClassroomTable;
