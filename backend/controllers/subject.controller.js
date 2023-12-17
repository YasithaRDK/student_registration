import asyncHandler from "express-async-handler";
import subjectModel from "../models/subject.model.js";

//Add new subject
export const addSubject = asyncHandler(async (req, res) => {
  const { subjectName } = req.body;
  //Check that fields are complete
  if (!subjectName) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //check subject name exist in database
  const existSubjectName = await subjectModel.findOne({ subjectName });
  if (existSubjectName) {
    res.status(400);
    throw new Error("Subject Name exists");
  }
  //create record
  const subject = await subjectModel.create({
    subjectName,
  });
  res.json(subject);
});

//Get all subject records
export const getAllSubject = asyncHandler(async (req, res) => {
  const subject = await subjectModel.find({ status: "98" }).sort({ _id: -1 });
  res.json(subject);
});

//Get one subject record
export const getSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const subject = await subjectModel.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("No data available");
  }
  res.json(subject);
});

//Update subject record
export const updateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subjectName } = req.body;
  //check record available on database
  const subject = await subjectModel.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("No data available");
  }
  if (!subjectName) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //update record
  const updateSubject = await subjectModel.findByIdAndUpdate(
    id,
    { subjectName },
    { new: true }
  );
  res.json(updateSubject);
});

//Disable subject record
export const disableSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const subject = await subjectModel.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("No data available");
  }
  await subjectModel.findByIdAndUpdate(id, { status: "99" }, { new: true });
  res.json({ id });
});

//Enable subject record
export const enableSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const subject = await subjectModel.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("No data available");
  }
  await subjectModel.findByIdAndUpdate(id, { status: "98" }, { new: true });
  res.json({ id });
});

//Delete subject record
export const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const subject = await subjectModel.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("No data available");
  }
  await subjectModel.findByIdAndDelete(id);
  res.json({ id });
});
