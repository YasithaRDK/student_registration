import asyncHandler from "express-async-handler";
import classModel from "../models/class.model.js";

//Add new classroom
export const addClassroom = asyncHandler(async (req, res) => {
  const { classroomName } = req.body;
  //Check that fields are complete
  if (!classroomName) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //check record available on database
  const existClassName = await classModel.findOne({ classroomName });
  if (existClassName) {
    res.status(400);
    throw new Error("Classroom already exists");
  }
  //create record
  const classroom = await classModel.create({
    classroomName,
  });
  res.json(classroom);
});

//Get all classroom records
export const getAllClassroom = asyncHandler(async (req, res) => {
  const classrooms = await classModel.find({ status: "98" });

  classrooms.sort((a, b) => {
    const gradeA = extractGradeParts(a.classroomName);
    const gradeB = extractGradeParts(b.classroomName);

    // First, compare the numeric part
    if (gradeA.number !== gradeB.number) {
      return gradeA.number - gradeB.number;
    }

    // If the numeric part is the same, compare the alphanumeric part
    return gradeA.alpha.localeCompare(gradeB.alpha);
  });

  res.json(classrooms);
});

// Function to extract numeric and alphanumeric parts of the grade
function extractGradeParts(grade) {
  const match = grade.match(/(\d+)([A-Za-z]+)/);
  if (match) {
    const [, number, alpha] = match;
    return { number: parseInt(number, 10), alpha };
  }
  // Default values if the grade doesn't match the expected pattern
  return { number: 0, alpha: grade };
}

//Get one classroom record
export const getClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const classroom = await classModel.findById(id);
  if (!classroom) {
    res.status(400);
    throw new Error("No data available");
  }
  res.json(classroom);
});

//Update classroom record
export const updateClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { classroomName } = req.body;
  //check record available on database
  const classroom = await classModel.findById(id);
  if (!classroom) {
    res.status(400);
    throw new Error("No data available");
  }
  //Check that fields are complete
  if (!classroomName) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //update record
  const updateClassroom = await classModel.findByIdAndUpdate(
    id,
    { classroomName },
    { new: true }
  );
  res.json(updateClassroom);
});

//Disable classroom record
export const disableClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const classroom = await classModel.findById(id);
  if (!classroom) {
    res.status(400);
    throw new Error("No data available");
  }
  await classModel.findByIdAndUpdate(id, { status: "99" }, { new: true });
  res.json({ id });
});

//Enable classroom record
export const enableClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const classroom = await classModel.findById(id);
  if (!classroom) {
    res.status(400);
    throw new Error("No data available");
  }
  await classModel.findByIdAndUpdate(id, { status: "98" }, { new: true });
  res.json({ id });
});

//Delete classroom record
export const deleteClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const classroom = await classModel.findById(id);
  if (!classroom) {
    res.status(400);
    throw new Error("No data available");
  }
  await classModel.findByIdAndDelete(id);
  res.json({ id });
});
