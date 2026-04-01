import { Schema, model } from "mongoose";

// comment schema
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",   // align with source
  },
  comment: {
    type: String,
  }
});

// article schema
const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",   // align with source
      required: [true, "Author ID required"]
    },
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"]
    },
    content: {
      type: String,
      required: [true, "Content is required"]
    },
    comments: [commentSchema],
    isArticleActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    strict: "throw",   // prevent unwanted fields
    versionKey: false  // remove __v
  }
);

export const ArticleModel = model("article", articleSchema);