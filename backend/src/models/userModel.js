import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    cnic:{
      type:Number,
      required:[true,"CNIC is required"],
      unique:true,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);

export default User;
