import asyncHandler from "express-async-handler";
import allocateClassroomModel from "../models/allocateClassroom.model.js";
import teacherModel from "../models/teacher.models.js";
import classModel from "../models/class.model.js";

//Add new allocate classroom
export const addAllocateClassroom = asyncHandler(async (req, res) => {
  const { teacher, classroom } = req.body;
  //Check that fields are complete
  try {
    if (!teacher || !classroom) {
      res.status(400);
      throw new Error("All fields are required");
    }
    //Check if the teacher and classroom are available in the database
    const teacherDetails = await teacherModel.findById(teacher);
    const classroomDetails = await classModel.findById(classroom);
    if (!teacherDetails || !classroomDetails) {
      res.status(400);
      throw new Error("Teacher or Classroom details not found");
    }
    //crate record
    const allocateClassroom = await allocateClassroomModel.create({
      teacher,
      classroom,
    });
    res.json(allocateClassroom);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400).json({
        message:
          "Duplicate error: Teacher and Classroom combination already exists",
      });
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});

//Get all allocate classroom records
export const getAllAllocateClassroom = asyncHandler(async (req, res) => {
  const allocateClassroom = await allocateClassroomModel.aggregate([
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
        from: "classrooms",
        localField: "classroom",
        foreignField: "_id",
        as: "classroom",
      },
    },
    {
      $unwind: { path: "$classroom", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        teacher: {
          firstName: 1,
          lastName: 1,
        },
        classroom: {
          classroomName: 1,
        },
      },
    },
    {
      $sort: { teacher: 1 },
    },
  ]);

  res.json(allocateClassroom);
});

//Delete allocate classroom record
export const deleteAllocateClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //Check if the allocate classroom available in the database
  const allocateClassroom = await allocateClassroomModel.findById(id);
  if (!allocateClassroom) {
    res.status(400);
    throw new Error("No data available");
  }
  await allocateClassroomModel.findByIdAndDelete(id);
  res.json({ id });
});
