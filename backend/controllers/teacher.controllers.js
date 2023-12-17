import asyncHandler from "express-async-handler";
import teacherModel from "../models/teacher.models.js";

//Add new Teacher record
export const addTeacher = asyncHandler(async (req, res) => {
  const { firstName, lastName, contactNo, email } = req.body;
  //Check that fields are complete
  if (!firstName || !lastName || !contactNo || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //Email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }
  //check email exist on database
  const existEmail = await teacherModel.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }
  //crate record
  const teacher = await teacherModel.create({
    firstName,
    lastName,
    contactNo,
    email,
  });
  res.json(teacher);
});

//Get all teacher records
export const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await teacherModel.find({ status: "98" }).sort({ _id: -1 });
  res.json(teachers);
});

//Get one teacher record
export const getTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check teacher available on database
  const teacher = await teacherModel.findById(id);
  if (!teacher) {
    res.status(400);
    throw new Error("No data available");
  }
  res.json(teacher);
});

//Update teacher record
export const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, contactNo, email } = req.body;
  //check teacher available on database
  const teacher = await teacherModel.findById(id);
  if (!teacher) {
    res.status(400);
    throw new Error("No data available");
  }
  //Check that fields are complete
  if (!firstName || !lastName || !contactNo || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //Email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }
  //update record
  const updateTeacher = await teacherModel.findByIdAndUpdate(
    id,
    { firstName, lastName, contactNo, email },
    { new: true }
  );
  res.json(updateTeacher);
});

//Disable teacher record
export const disableTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check teacher available on database
  const teacher = await teacherModel.findById(id);
  if (!teacher) {
    res.status(400);
    throw new Error("No data available");
  }
  await teacherModel.findByIdAndUpdate(id, { status: "99" }, { new: true });
  res.json({ id });
});

//Enable teacher record
export const enableTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check teacher available on database
  const teacher = await teacherModel.findById(id);
  if (!teacher) {
    res.status(400);
    throw new Error("No data available");
  }
  await teacherModel.findByIdAndUpdate(id, { status: "98" }, { new: true });
  res.json({ id });
});

//Delete teacher record
export const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check teacher available on database
  const teacher = await teacherModel.findById(id);
  if (!teacher) {
    res.status(400);
    throw new Error("No data available");
  }
  await teacherModel.findByIdAndDelete(id);
  res.json({ id });
});
