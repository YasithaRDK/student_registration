import mongoose from "mongoose";

const allocateClassroomSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      trim: true,
      required: true,
    },
    classroom: {
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    autoCreate: false,
  }
);

allocateClassroomSchema.index({ teacher: 1, classroom: 1 }, { unique: true });

const allocateClassroomModel = mongoose.model(
  "AloClassroom",
  allocateClassroomSchema
);
export default allocateClassroomModel;
