import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/userModel.js";
import exp from "express";
import { authenticate } from "../Services/authService.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const commonRouter = exp.Router();


// ================= LOGIN =================
commonRouter.post("/login", async (req, res, next) => {
  try {
    const userCredObj = req.body;

    const { token, user } = await authenticate(userCredObj);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      message: "login success",
      payload: user
    });

  } catch (err) {
    next(err);
  }
});


// ================= LOGOUT =================
commonRouter.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({
    message: "Logged out successfully"
  });
});


// ================= CHANGE PASSWORD =================
commonRouter.put(
  "/change-password",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "newPassword must be different from currentPassword"
        });
      }

      const user = await UserTypeModel.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }

      const ok = await bcrypt.compare(currentPassword, user.password);

      if (!ok) {
        return res.status(401).json({
          message: "Current password is incorrect"
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.status(200).json({
        message: "Password changed successfully"
      });

    } catch (err) {
      next(err);
    }
  }
);


// ================= PAGE REFRESH CHECK =================
commonRouter.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res, next) => {
    try {
      const fullUser = await UserTypeModel.findById(req.user.userId).select("-password");

      if (!fullUser) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "authenticated",
        payload: fullUser
      });

    } catch (err) {
      next(err);
    }
  }
);


export default commonRouter;