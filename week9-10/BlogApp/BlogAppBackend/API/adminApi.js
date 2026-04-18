import exp from 'express';
import { UserTypeModel } from '../models/userModel.js';

export const adminRouter = exp.Router();

// BLOCK USER
adminRouter.put('/block/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const blockedUser = await UserTypeModel.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true }
        );

        if (!blockedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User blocked successfully",
            user: blockedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Error blocking user",
            error: error.message
        });
    }
});


// UNBLOCK USER
adminRouter.put('/unblock/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const unblockedUser = await UserTypeModel.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true }
        );

        if (!unblockedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User unblocked successfully",
            user: unblockedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Error unblocking user",
            error: error.message
        });
    }
});