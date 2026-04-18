import express from 'express';
import { register } from '../Services/authService.js';
import { ArticleModel } from '../models/articleModel.js';
import { verifyToken } from "../Middleware/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

const authorRoute = express.Router();


// ================= AUTHOR REGISTER =================
authorRoute.post(
  "/users",
  upload.single("profileImageUrl"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      const newAuthor = await register({
        ...req.body,
        role: "AUTHOR",
        profileImageUrl: cloudinaryResult?.secure_url,
      });

      res.status(201).json({
        message: "author registered",
        payload: newAuthor
      });

    } catch (err) {
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err);
    }
  }
);


// ================= GET ALL ARTICLES =================
authorRoute.get('/articles', async (req, res) => {
  try {
    const articles = await ArticleModel.find();

    res.status(200).json({
      message: "all articles fetched",
      payload: articles
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= CREATE ARTICLE =================
authorRoute.post('/articles/:authorId', verifyToken("AUTHOR"), async (req, res) => {
  try {
    const article = {
      ...req.body,
      author: req.user.userId
    };

    const newArticle = await ArticleModel.create(article);

    res.status(201).json({
      message: "article created",
      payload: newArticle
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= GET AUTHOR ARTICLES =================
authorRoute.get('/articles/:authorId', verifyToken("AUTHOR"), async (req, res) => {
  try {
    const articles = await ArticleModel.find({
      author: req.params.authorId
    }).populate("author", "firstName email");

    res.status(200).json({
      message: "articles found",
      payload: articles
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= GET ACTIVE ARTICLES =================
authorRoute.get('/articles/active/:authorId', async (req, res) => {
  try {
    const articles = await ArticleModel.find({
      author: req.params.authorId,
      isArticleActive: true
    });

    res.status(200).json({
      message: "active articles found",
      payload: articles
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= EDIT ARTICLE =================
authorRoute.put('/articles/:articleId/:authorId', verifyToken("AUTHOR"), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only edit your own article"
      });
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.articleId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "article updated",
      payload: updatedArticle
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= DELETE / RESTORE =================
authorRoute.patch("/articles/:articleId", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only modify your own articles"
      });
    }

    article.isArticleActive = !article.isArticleActive;
    await article.save();

    res.status(200).json({
      message: article.isArticleActive
        ? "Article restored successfully"
        : "Article deleted successfully",
      payload: article
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default authorRoute;