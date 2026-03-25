import express from 'express';
import { register } from '../Services/authService.js';
import { ArticleModel } from '../Models/ArticleModel.js';
import { checkAuthor } from '../Middleware/checkAuthor.js';
import { verifyToken } from "../Middleware/verifyToken.js";

const authorRoute = express.Router();

// AUTHOR REGISTER – PUBLIC
authorRoute.post('/users', async (req, res) => {
  const newAuthor = await register({ ...req.body, role: "AUTHOR" });

  res.status(201).json({
    message: "author registered",
    payload: newAuthor
  });
});


// ✅ NEW ROUTE (VERY IMPORTANT FIX)
// GET ALL ARTICLES (for dashboard)
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


// CREATE ARTICLE – PROTECTED
authorRoute.post('/articles/:authorId', checkAuthor, async (req, res) => {
  const article = {
    ...req.body,
    author: req.params.authorId
  };

  const newArticle = await ArticleModel.create(article);

  res.status(201).json({
    message: "article created",
    article: newArticle
  });
});


// READ ALL ARTICLES OF AUTHOR – PUBLIC
authorRoute.get('/articles/:authorId', async (req, res) => {
  const articles = await ArticleModel.find({
    author: req.params.authorId
  });

  res.status(200).json({
    message: "articles found",
    articles
  });
});


// READ ONLY ACTIVE ARTICLES – PUBLIC
authorRoute.get('/articles/active/:authorId', async (req, res) => {
  const articles = await ArticleModel.find({
    author: req.params.authorId,
    isArticleActive: true
  });

  res.status(200).json({
    message: "active articles found",
    articles
  });
});


// EDIT ARTICLE – PROTECTED
authorRoute.put('/articles/:articleId/:authorId', checkAuthor, async (req, res) => {
  const updatedArticle = await ArticleModel.findByIdAndUpdate(
    req.params.articleId,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: "article updated",
    article: updatedArticle
  });
});


// SOFT DELETE / RESTORE ARTICLE (Protected)
authorRoute.patch(
  "/articles/:articleId",
  verifyToken("AUTHOR"),
  async (req, res) => {
    try {
      const article = await ArticleModel.findById(req.params.articleId);

      if (!article)
        return res.status(404).json({ message: "Article not found" });

      if (article.author.toString() !== req.user.userId)
        return res.status(403).json({
          message: "Forbidden. You can only modify your own articles"
        });

      article.isArticleActive = !article.isArticleActive;
      await article.save();

      res.status(200).json({
        message: article.isArticleActive
          ? "Article restored successfully"
          : "Article deleted successfully",
        payload: article,
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default authorRoute;