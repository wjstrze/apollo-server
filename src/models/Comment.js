import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  _id: String,
  content: {
    type: String,
    required: true,
  },
  commentPostId: { type: String, ref: "Blog", required: true },
});

const Comment = model("Comment", CommentSchema);

export { Comment, CommentSchema };
