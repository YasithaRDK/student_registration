import { Container, Table } from "reactstrap";
import PropTypes from "prop-types";

const StudentRecordTable = ({ teacherAndSubjectDetails }) => {
  return (
    <>
      <Container className="mt-5">
        <p className="alc-classroom-text">Teacher & Subject Details</p>
        <div className="border rounded p-4">
          <div className="table-responsive">
            <Table className="table-bordered">
              <thead>
                <tr className="table-secondary">
                  <th>Subject</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {teacherAndSubjectDetails.length > 0 ? (
                  teacherAndSubjectDetails.map((details, index) => (
                    <tr key={index}>
                      <td>
                        {details.subject && details.subject.subjectName ? (
                          `${details.subject.subjectName}`
                        ) : (
                          <span style={{ color: "red" }}>
                            No data available
                          </span>
                        )}
                      </td>
                      <td>
                        {details.teacher &&
                        details.teacher.teacherFirstName &&
                        details.teacher.teacherLastName ? (
                          `${details.teacher.teacherFirstName} ${details.teacher.teacherLastName}`
                        ) : (
                          <span style={{ color: "red" }}>
                            No data available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
};

StudentRecordTable.propTypes = {
  teacherAndSubjectDetails: PropTypes.array.isRequired,
};

export default StudentRecordTable;
