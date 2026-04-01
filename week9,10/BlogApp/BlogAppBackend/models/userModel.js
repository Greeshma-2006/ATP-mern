import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    profileImageUrl: {
      type: String
    },
    role: {
      type: String,
      enum: ["AUTHOR", "USER", "ADMIN"],
      required: [true, "Role is required"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    strict: "throw",   // prevent unwanted fields
    versionKey: false  // remove __v
  }
);

// create model
export const UserTypeModel = model("user", userSchema);