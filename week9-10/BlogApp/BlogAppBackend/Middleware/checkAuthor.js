import { UserTypeModel } from "../models/userModel.js";

export const checkAuthor = async (req, res, next) => {
  try {
    // get author id (from body OR params like source)
    const authorId = req.body?.author || req.params?.authorId;

    if (!authorId) {
      return res.status(400).json({
        message: "Author ID is required"
      });
    }

    // verify author
    const author = await UserTypeModel.findById(authorId);

    if (!author) {
      return res.status(401).json({ message: "Invalid Author" });
    }

    // check role
    if (author.role !== "AUTHOR") {
      return res.status(403).json({ message: "User is not an Author" });
    }

    // check if blocked
    if (!author.isActive) {
      return res.status(403).json({ message: "Author account is not active" });
    }

    // forward request
    next();

  } catch (err) {
    next(err);
  }
};