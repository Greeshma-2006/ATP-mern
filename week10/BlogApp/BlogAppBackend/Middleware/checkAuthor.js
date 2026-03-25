import { UserTypeModel } from "../Models/UserModel.js";

export const checkAuthor = async (req, res, next) => {
    //get author id
    const authorId = req.params.authorId;

    //verify author
    const author = await UserTypeModel.findById(authorId);
    if (!author) {
        return res.status(401).json({ message: "author not found" });
    }

    //if role is different
    if (author.role !== "AUTHOR") {
        return res.status(403).json({ message: "not an author" });
    }

    //if author is blocked
    if (!author.isActive) {
        return res.status(403).json({ message: "author is blocked" });
    }

    //forward req to next
    next();
};
