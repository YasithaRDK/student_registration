import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import studentRouter from "./routes/student.routes.js";
import classroomRouter from "./routes/classroom.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import allocateClassroomRouter from "./routes//allocateClassroom.routes.js";
import allocateSubjectRouter from "./routes/allocateSubject.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();

connectDB();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/api/students", studentRouter);
app.use("/api/classrooms", classroomRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/allocate-classrooms", allocateClassroomRouter);
app.use("/api/allocate-subjects", allocateSubjectRouter);
// app.all("*", (req, res) => res.send("That route doesn't exist"));

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.send(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
