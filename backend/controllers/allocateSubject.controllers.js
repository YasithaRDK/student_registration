import asyncHandler from "express-async-handler";
import allocateSubjectModel from "../models/allocateSubject.model.js";
import teacherModel from "../models/teacher.models.js";
import subjectModel from "../models/subject.model.js";

//Add new allocate subject
export const addAllocateSubject = asyncHandler(async (req, res) => {
  const { teacher, subject } = req.body;
  try {
    //Check that fields are complete
    if (!teacher || !subject) {
      res.status(400);
      throw new Error("All fields are required");
    }
    //Check if the teacher and subject are available in the database
    const teacherDetails = await teacherModel.findById(teacher);
    const subjectDetails = await subjectModel.findById(subject);
    if (!teacherDetails || !subjectDetails) {
      res.status(400);
      throw new Error("Teacher or Subject details not found");
    }
    //crate record
    const allocateSubject = await allocateSubjectModel.create({
      teacher,
      subject,
    });
    res.json(allocateSubject);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400).json({
        message:
          "Duplicate error: Teacher and Subject combination already exists",
      });
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});
//Get all allocate subject records
export const getAllAllocateSubject = asyncHandler(async (req, res) => {
  const allocateSubjects = await allocateSubjectModel.aggregate([
    {
      $lookup: {
        from: "teachers",
        localField: "teacher",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "subject",
        foreignField: "_id",
        as: "subject",
      },
    },
    {
      $unwind: { path: "$subject", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        teacher: {
          firstName: 1,
          lastName: 1,
        },
        subject: {
          subjectName: 1,
        },
      },
    },
  ]);
  res.json(allocateSubjects);
});

//Get one allocate subject record
export const getAllocateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //Check if the allocate subject available in the database
  const allocateSubject = await allocateSubjectModel
    .findById(id)
    .populate({
      path: "teacher",
      // select: "firstName lastName",
    })
    .populate({ path: "subject" });
  if (!allocateSubject) {
    res.status(400);
    throw new Error("No data available");
  }
  res.json(allocateSubject);
});

//Update allocate subject record
export const updateAllocateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { teacher, subject } = req.body;
  //Check that fields are complete
  if (!teacher || !subject) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //Check if the allocate subject available in the database
  const allocateSubject = await allocateSubjectModel.findById(id);
  if (!allocateSubject) {
    res.status(400);
    throw new Error("No data available");
  }
  //Check if the teacher and subject are available in the database
  const teacherDetails = await teacherModel.findById(teacher);
  const subjectDetails = await subjectModel.findById(subject);
  if (!teacherDetails || !subjectDetails) {
    res.status(400);
    throw new Error("Teacher or Subject details not found");
  }
  //update record
  const updateAllocateSubject = await allocateSubjectModel.findByIdAndUpdate(
    id,
    { teacher, subject },
    { new: true }
  );
  res.json(updateAllocateSubject);
});

//Delete allocate subject record
export const deleteAllocateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //Check if the allocate subject available in the database
  const allocateSubject = await allocateSubjectModel.findById(id);
  if (!allocateSubject) {
    res.status(400);
    throw new Error("No data available");
  }
  await allocateSubjectModel.findByIdAndDelete(id);
  res.json({ id });
});
