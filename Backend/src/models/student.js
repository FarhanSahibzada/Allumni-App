import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
    },
    rollNumber: {
      type: Number,
      required: [true, "Roll Number is required"],
      unique: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
