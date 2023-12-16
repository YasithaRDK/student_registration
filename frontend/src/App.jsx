import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Student from "./pages/Student";
import Classroom from "./pages/Classroom";
import Teacher from "./pages/Teacher";
import Subject from "./pages/Subject";
import AllocateSubject from "./pages/AllocateSubject";
import AllocateClassroom from "./pages/AllocateClassroom";
import Header from "./components/Header";
import StudentRecord from "./pages/StudentRecord";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<StudentRecord />} />
          <Route path="/student" element={<Student />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/allocate-subject" element={<AllocateSubject />} />
          <Route path="/allocate-classroom" element={<AllocateClassroom />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
