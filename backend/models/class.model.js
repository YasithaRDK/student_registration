import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    classroomName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "98",
    },
  },
  {
    timestamps: true,
    autoCreate: false,
  }
);

classSchema.index({ classroomName: 1 }, { unique: true });

const classModel = mongoose.model("Classroom", classSchema);
export default classModel;
