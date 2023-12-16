import mongoose from "mongoose";

const allocateSubjectSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      trim: true,
      required: true,
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    autoCreate: false,
  }
);

allocateSubjectSchema.index({ teacher: 1, subject: 1 }, { unique: true });

const allocateSubjectModel = mongoose.model(
  "AloSubject",
  allocateSubjectSchema
);
export default allocateSubjectModel;
