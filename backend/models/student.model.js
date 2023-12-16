import mongoose from "mongoose";

// var validateEmail = (email) => {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const studentSchema = new mongoose.Schema(
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
    contactPerson: {
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
      // validate: [validateEmail, "Please fill a valid email address"],
    },
    birthDay: {
      type: Date,
      required: true,
      trim: true,
    },
    classroom: {
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
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

studentSchema.set("strictPopulate", false);

studentSchema.index({ email: 1 }, { unique: true });

const studentModel = mongoose.model("Student", studentSchema);
export default studentModel;
