import asyncHandler from "express-async-handler";
import studentModel from "../models/student.model.js";
import classModel from "../models/class.model.js";
import mongoose from "mongoose";

//Add new student record
export const addStudent = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    classroom,
  } = req.body;
  //Check that fields are complete
  if (
    !firstName ||
    !lastName ||
    !contactPerson ||
    !contactNo ||
    !email ||
    !birthDay ||
    !classroom
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }
  //check email exist on database
  const existEmail = await studentModel.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }
  // Check if the classroom are available in the database
  const classroomDetails = await classModel.findById(classroom);
  if (!classroomDetails) {
    res.status(400);
    throw new Error("Classroom details not found");
  }
  //create record
  const newStudent = await studentModel.create({
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    classroom,
  });
  res.json(newStudent);
});

//Get all student records
export const getAllStudent = asyncHandler(async (req, res) => {
  const students = await studentModel.aggregate([
    {
      $match: { status: "98" },
    },
    {
      $lookup: {
        from: "classrooms",
        localField: "classroom",
        foreignField: "_id",
        as: "classroomData",
      },
    },
    {
      $unwind: { path: "$classroomData", preserveNullAndEmptyArrays: true },
    },
    {
      $sort: { _id: -1 },
    },
  ]);

  res.json(students);
});

//Get single user record
// export const getSingleStudent = asyncHandler(async (req, res) => {
//const { id } = req.params;
//check record available on database
// const student = await studentModel
//   .findById(id)
//   .populate({ path: "classroom" });
//   const _id = req.params.id;
//   const student = await studentModel.aggregate([
//     {
//       $match: { _id: new mongoose.Types.ObjectId(_id) },
//     },
//     {
//       $lookup: {
//         from: "classrooms",
//         localField: "classroom",
//         foreignField: "_id",
//         as: "classroomData",
//       },
//     },
//     {
//       $unwind: { path: "$classroomData", preserveNullAndEmptyArrays: true },
//     },
//     {
//       $sort: { _id: -1 },
//     },
//   ]);
//   if (!student) {
//     res.status(400);
//     throw new Error("Student not found");
//   }
//   res.json(student);
// });

export const getSingleStudent = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const student = await studentModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(_id) },
    },
    {
      $lookup: {
        from: "classrooms",
        localField: "classroom",
        foreignField: "_id",
        as: "classroomData",
      },
    },
    {
      $unwind: { path: "$classroomData", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "aloclassrooms",
        localField: "classroom",
        foreignField: "classroom",
        as: "allocatedClassrooms",
      },
    },
    {
      $unwind: {
        path: "$allocatedClassrooms",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "teachers",
        localField: "allocatedClassrooms.teacher",
        foreignField: "_id",
        as: "teacherData",
      },
    },
    {
      $unwind: { path: "$teacherData", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "alosubjects",
        localField: "allocatedClassrooms.teacher",
        foreignField: "teacher",
        as: "allocatedSubjects",
      },
    },
    {
      $unwind: { path: "$allocatedSubjects", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "allocatedSubjects.subject",
        foreignField: "_id",
        as: "subjectDetails",
      },
    },
    {
      $unwind: { path: "$subjectDetails", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        contactPerson: 1,
        contactNo: 1,
        email: 1,
        birthDay: 1,
        classroom: 1,
        // Excluding arrays of teacher and subject records
        allocatedClassroomID: "$classroomData._id",
        allocatedClassroom: "$classroomData.classroomName",
        teacher: {
          teacherFirstName: "$teacherData.firstName",
          teacherLastName: "$teacherData.lastName",
        },
        subject: {
          subjectName: "$subjectDetails.subjectName",
        },
      },
    },
  ]);
  res.json(student);
});

//Update student record
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    classroom,
  } = req.body;
  //check record available on database
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  //Check that fields are complete
  if (
    !firstName ||
    !lastName ||
    !contactPerson ||
    !contactNo ||
    !email ||
    !birthDay ||
    !classroom
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }
  //Check if the classroom are available in the database
  const classroomDetails = await classModel.findById(classroom);
  if (!classroomDetails) {
    res.status(400);
    throw new Error("Classroom details not found");
  }
  //update record
  const updateStudent = await studentModel.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      contactPerson,
      contactNo,
      email,
      birthDay,
      classroom,
    },
    {
      new: true,
    }
  );
  res.json(updateStudent);
});

//Disable student record
export const disableStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  await studentModel.findByIdAndUpdate(id, { status: "99" }, { new: true });
  res.json({ id });
});

//Enable student record
export const enableStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  await studentModel.findByIdAndUpdate(id, { status: "98" }, { new: true });
  res.json({ id });
});

//Delete Student record
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  await studentModel.findByIdAndDelete(id);
  res.json({ id });
});
