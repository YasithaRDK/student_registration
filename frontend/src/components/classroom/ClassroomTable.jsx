import { Button, Container, Table } from "reactstrap";
import PropTypes from "prop-types";

const ClassroomTable = ({
  classroomDetails,
  onGetClassroom,
  onDeleteClassroom,
}) => {
  return (
    <>
      <Container className="mt-5">
        <p className="classroom-table-text">Classroom Details</p>
        <div className="border rounded p-4">
          <div className="table-responsive">
            <Table className="table-bordered">
              <thead>
                <tr className="table-secondary">
                  <th style={{ width: "85%" }}> Classroom Name</th>
                  <th style={{ width: "15%" }}> Action</th>
                </tr>
              </thead>
              <tbody>
                {classroomDetails.map((row) => (
                  <tr key={row._id}>
                    <td style={{ width: "85%" }}>{row.classroomName}</td>
                    <td style={{ width: "15%" }}>
                      <div className="d-flex">
                        <Button
                          color="info"
                          className="me-2"
                          onClick={() => onGetClassroom(row._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          className="ml-2"
                          onClick={() => onDeleteClassroom(row._id)}
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

ClassroomTable.propTypes = {
  classroomDetails: PropTypes.array.isRequired,
  onGetClassroom: PropTypes.func.isRequired,
  onDeleteClassroom: PropTypes.func.isRequired,
};

export default ClassroomTable;
