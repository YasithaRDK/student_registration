import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
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

teacherSchema.index({ email: 1 }, { unique: true });

const teacherModel = mongoose.model("Teacher", teacherSchema);
export default teacherModel;
