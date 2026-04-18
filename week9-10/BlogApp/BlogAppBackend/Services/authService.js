import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/userModel.js";
import { config } from "dotenv";

config();


// REGISTER USER
export const register = async (userObj) => {
  // create document (ensures validation runs like source)
  const userDoc = new UserTypeModel(userObj);

  // validate before hashing
  await userDoc.validate();

  // hash password
  userDoc.password = await bcrypt.hash(userDoc.password, 10);

  // save user
  const created = await userDoc.save();

  const userData = created.toObject();
  delete userData.password;

  return userData;
};


// AUTHENTICATE USER
export const authenticate = async ({ email, password }) => {

  // find user only by email (like source)
  const user = await UserTypeModel.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email");
    error.status = 401;
    throw error;
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid password");
    error.status = 401;
    throw error;
  }

  // check if blocked
  if (!user.isActive) {
    const error = new Error("Your account is blocked. Please contact admin");
    error.status = 403;
    throw error;
  }

  // generate token (include email like source)
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const userData = user.toObject();
  delete userData.password;

  return {
    token,
    user: userData   // align with source
  };
};