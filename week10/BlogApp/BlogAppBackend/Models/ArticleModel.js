import { Schema, model } from "mongoose";

// comment schema
const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: String
});

// article schema
const articleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    isArticleActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const ArticleModel = model("Article", articleSchema);
