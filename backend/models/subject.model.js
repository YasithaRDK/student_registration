import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
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

subjectSchema.index({ subjectName: 1 }, { unique: true });

const subjectModel = mongoose.model("Subject", subjectSchema);
export default subjectModel;
