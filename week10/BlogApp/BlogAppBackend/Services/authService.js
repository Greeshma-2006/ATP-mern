import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../Models/UserModel.js";

// REGISTER USER
export const register = async (userObj) => {
  userObj.password = await bcrypt.hash(userObj.password, 10);

  const user = await UserTypeModel.create(userObj);

  const userData = user.toObject();
  delete userData.password;

  return userData;
};


// AUTHENTICATE USER
export const authenticate = async ({ email, password, role }) => {

  role = role.toUpperCase();

  const user = await UserTypeModel.findOne({ email, role });

  if (!user) {
    const error = new Error("Invalid email or role");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid password");
    error.status = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("User is blocked");
    error.status = 403;
    throw error;
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const userData = user.toObject();
  delete userData.password;

  return {
    token,
    payload: userData
  };
};