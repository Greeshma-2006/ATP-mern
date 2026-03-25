import exp from 'express';
import { UserTypeModel } from '../Models/UserModel.js';

export const adminRouter = exp.Router();

//BLOCK USER
adminRouter.put('/block/:userId', async (req, res) => {
    // get user id
    const userId = req.params.userId;

    // block user
    const blockedUser = await UserTypeModel.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
    );

    if (!blockedUser) {
        return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({
        message: "user blocked",
        user: blockedUser
    });
});

//UNBLOCK USER
adminRouter.put('/unblock/:userId', async (req, res) => {
    // get user id
    const userId = req.params.userId;

    // unblock user
    const unblockedUser = await UserTypeModel.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
    );

    if (!unblockedUser) {
        return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({
        message: "user unblocked",
        user: unblockedUser
    });
});
