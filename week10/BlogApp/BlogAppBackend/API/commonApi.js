import bcrypt from "bcryptjs";
import { UserTypeModel } from "../Models/UserModel.js";
import exp from "express";
import { authenticate } from "../Services/authService.js";

const commonRouter = exp.Router();


// LOGIN
commonRouter.post("/authenticate", async (req, res, next) => {

  try {

    const userCredObj = req.body;

    const result = await authenticate(userCredObj);

    // store token in cookie
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      message: "login success",
      payload: result.user
    });

  } catch (err) {
    next(err);
  }

});


// LOGOUT
commonRouter.post("/logout", (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({
    message: "logout success"
  });

});


// CHANGE PASSWORD
commonRouter.put("/change-password/:userId", async (req, res, next) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const user = await UserTypeModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const ok = await bcrypt.compare(currentPassword, user.password);

    if (!ok) {
      return res.status(401).json({ message: "wrong current password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      message: "password changed successfully"
    });

  } catch (err) {
    next(err);
  }

});

export default commonRouter;