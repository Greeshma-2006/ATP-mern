import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  dob: {
    type: String,
    required: [true, "DOB is required"]
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"]
  }
});

const User = mongoose.model("User", userSchema);

export default User;