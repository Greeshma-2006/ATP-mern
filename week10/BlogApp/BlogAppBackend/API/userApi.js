import exp from "express";
import { register } from "../Services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { UserTypeModel } from "../Models/UserModel.js";
import {upload} from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

const userRoute = exp.Router();

// REGISTER USER
userRoute.post(
        "/users",
        upload.single("profilePic"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
﻿


// READ ALL ARTICLES
userRoute.get("/articles/:userId", async (req, res) => {
    // check user
    const user = await UserTypeModel.findById(req.params.userId);
    if (!user) {
        return res.status(401).json({ message: "invalid user" });
    }

    // fetch articles
    const articles = await ArticleModel.find({ isArticleActive: true });

    res.status(200).json({
        message: "all articles",
        payload: articles
    });
});

// ADD COMMENT
userRoute.put("/articles/:articleId/comments/:userId", async (req, res) => {
    try {

        const { articleId, userId } = req.params;

        // check user
        const user = await UserTypeModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "invalid user" });
        }

        // get comment object from request body
        const commentObj = {
            user: userId,
            comment: req.body.comment
        };

        // find article by id and update include $push
        const article = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $push: { comments: commentObj } },
            { new: true }
        );

        // if article not found
        if (!article) {
            return res.status(404).json({ message: "article not found" });
        }

        res.status(201).json({
            message: "comment added",
            payload: article
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default userRoute;