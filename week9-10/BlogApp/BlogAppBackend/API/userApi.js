import exp from "express";
import { register, authenticate } from "../Services/authService.js";
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const userRoute = exp.Router();

// ================= REGISTER =================
userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    let userObj = req.body;

    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

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
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

// ================= LOGIN =================
userRoute.post("/login", async (req, res, next) => {
  try {
    const { token, user } = await authenticate(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "login success",
      payload: user,
    });

  } catch (err) {
    next(err);
  }
});

// ================= GET ALL ARTICLES =================
userRoute.get("/articles", verifyToken("USER", "AUTHOR"), async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({
      isArticleActive: true,
    })
      .populate("author")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "all articles",
      payload: articles,
    });

  } catch (err) {
    next(err);
  }
});

// ================= GET SINGLE ARTICLE =================
userRoute.get("/article/:id", verifyToken("USER", "AUTHOR"), async (req, res, next) => {
  try {
    const article = await ArticleModel.findOne({
      _id: req.params.id,
      isArticleActive: true,
    })
      .populate("author")
      .populate("comments.user");

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json({
      message: "article fetched",
      payload: article,
    });

  } catch (err) {
    next(err);
  }
});

// ================= ADD COMMENT =================
userRoute.put("/articles", verifyToken("USER", "AUTHOR"), async (req, res, next) => {
  try {
    const { articleId, comment } = req.body;

    const user = req.user.userId;

    const articleWithComment = await ArticleModel.findOneAndUpdate(
      { _id: articleId, isArticleActive: true },
      { $push: { comments: { user, comment } } },
      { new: true, runValidators: true }
    ).populate("comments.user");

    if (!articleWithComment) {
      return res.status(404).json({
        message: "Article not found"
      });
    }

    res.status(200).json({
      message: "comment added successfully",
      payload: articleWithComment
    });

  } catch (err) {
    next(err);
  }
});