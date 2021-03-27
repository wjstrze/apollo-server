import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  content: {
    type: String,
    required: true,
  },
  commentPostId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
});

const Comment = model("Comment", CommentSchema);

export { Comment, CommentSchema };
